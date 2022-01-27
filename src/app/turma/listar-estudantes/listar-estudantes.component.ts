import { Component, OnInit } from '@angular/core';

import { MenuItem, MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import Usuario from 'src/app/model/usuario';
import Query from 'src/app/model/firestore/query';
import { PerfilUsuario } from 'src/app/model/enums/perfilUsuario';
import Turma from 'src/app/model/turma';
import Analytics from 'src/app/model/analytics/analytics';
import Submissao from 'src/app/model/submissao';
import { Assunto } from 'src/app/model/assunto';
import PageTrackRecord from 'src/app/model/analytics/pageTrack';
import { Util } from 'src/app/model/util';

@Component({
  selector: 'app-listar-estudantes',
  templateUrl: './listar-estudantes.component.html',
  styleUrls: ['./listar-estudantes.component.css'],
})
export class ListarEstudantesComponent implements OnInit {
  estudantes$;
  selectedEstudante: Usuario;
  estudante: Usuario;
  turma;
  pageTracks;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {
    this.turma = new Turma(null, null, null, null);
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['codigoTurma'] != null) {
        this.turma.codigo = params['codigoTurma'];
        /* this.buscarEstudante(params['codigoTurma']); */

        Turma.getAllEstudantes(params['codigoTurma']).subscribe((estudantes) => {
          this.estudantes$ = estudantes;

          /*  */
        });
      }
    });
  }

  exibirProgresso(){
    Assunto.getAll().subscribe((assuntos) => {
      this.estudantes$.forEach((estudante) => {
        Assunto.consultarRespostasEstudante(estudante).subscribe((respostas) => {
          let respostasFiltradas:any = {};

                let dataLimite = null;

                // Data no prazo

                /* if(estudante.codigoTurma == "curso2021b"){ // controle
                  dataLimite = new Date(2021, 5, 30, 23, 59, 59);
                }else if(estudante.codigoTurma == "2021a"){ // srl (controle positivo)
                  dataLimite = new Date(2021, 3, 26, 23, 59, 59);
                }else if(estudante.codigoTurma == "curso2021j"){ // ssrl
                  dataLimite = new Date(2021, 6, 30, 23, 59, 59);
                }else if(estudante.codigoTurma == "turmasetembro"){ // controle 2
                  dataLimite = new Date(2021, 10, 16, 23, 59, 59);
                }else if(estudante.codigoTurma == "cursoset"){ // controle 2
                  dataLimite = new Date(2021, 10, 11, 23, 59, 59);
                }else if(estudante.codigoTurma == "turma1"){ // srl (controle positivo)
                  dataLimite = new Date(2021, 0, 29, 23, 59, 59);
                } */

                if(estudante.codigoTurma == "curso2021b"){ // controle
                  dataLimite = new Date(2021, 6, 7, 23, 59, 59);
                }else if(estudante.codigoTurma == "2021a"){ // srl (controle positivo)
                  dataLimite = new Date(2021, 4, 3, 23, 59, 59);
                }else if(estudante.codigoTurma == "curso2021j"){ // ssrl
                  dataLimite = new Date(2021, 7, 6, 23, 59, 59);
                }else if(estudante.codigoTurma == "turmasetembro"){ // controle 2
                  dataLimite = new Date(2021, 10, 23, 23, 59, 59);
                }else if(estudante.codigoTurma == "cursoset"){ // controle 2
                  dataLimite = new Date(2021, 10, 18, 23, 59, 59);
                }else if(estudante.codigoTurma == "turma1"){ // srl (controle positivo)
                  dataLimite = new Date(2021, 1, 5, 23, 59, 59);
                }


                respostasFiltradas.respostaQuestaoParson = [];
                respostasFiltradas.respostaQuestaoCorrecao = [];
                respostasFiltradas.respostaQuestaoFechada = [];
                respostasFiltradas.submissoes = [];
                respostasFiltradas.visualizacoesRespostasProgramacao = respostas.visualizacoesRespostasProgramacao;

                /* respostas.respostaQuestaoParson.forEach(respostaParson=>{
                  let dataParson = Util.firestoreDateToDate(respostaParson.data);
                  if(dataParson <= dataLimite){
                    respostasFiltradas.respostaQuestaoParson.push(respostaParson)
                  }
                })

                respostas.respostaQuestaoCorrecao.forEach(resposta=>{
                  let data = Util.firestoreDateToDate(resposta.data);
                  if(data <= dataLimite){
                    respostasFiltradas.respostaQuestaoCorrecao.push(resposta)
                  }
                }) */

                respostas.respostaQuestaoFechada.forEach(resposta=>{
                  let data = Util.firestoreDateToDate(resposta.data);
                  if(data <= dataLimite){
                    respostasFiltradas.respostaQuestaoFechada.push(resposta)
                  }
                });

                respostas.submissoes.forEach(resposta=>{
                  let data = Util.firestoreDateToDate(resposta.data);
                  if(data <= dataLimite){
                    respostasFiltradas.submissoes.push(resposta)
                  }
                })


                let progresso = Assunto.calcularProgressoGeral(assuntos, respostasFiltradas);
                estudante.progressoGeral = progresso;
          /* let progresso = Assunto.calcularProgressoGeral(assuntos, respostas);
          estudante.progressoGeral = progresso; */
        });
      });
    });


    /* Analytics.calcularNumeroAtividadesTrabalhadasPorSemana(turma).subscribe((estudantes) => {
      this.estudantes$ = estudantes;
      this.estudantes$.forEach((estudante) => {
        Submissao.getAll(new Query('estudanteId', '==', estudante.id)).subscribe(
          (submissoes) => {
            estudante.totalRespostasProgramacao = submissoes.length;
          }
        );
      });
    });*/
  }

  abrirMslq(){
    this.router.navigate([
      'geral/main',
      { outlets: { principal: ['admin', 'visualizar-mslq', this.turma.codigo] } },
    ]);
  }

  /* buscarEstudante(codigoTurma) {
    Usuario.getAllEstudantesByTurma(codigoTurma).subscribe((estudantes) => {
      this.estudantes = estudantes;
    });
  } */

  /* deleteEstudante(estudante: Usuario) {
    Usuario.delete(estudante.pk()).subscribe((resultado) => {
      Usuario.getAll().subscribe((estudantes) => {
        this.estudantes = estudantes;
      });
      this.messageService.add({
        severity: 'info',
        summary: 'Estudante deletado',
        detail: estudante.nome,
      });
    });
  } */

  abrirPerfilEstudante(estudante) {
    this.router.navigate([
      'geral/main',
      { outlets: { principal: ['turma', 'visualizacao-estudante', estudante.pk()] } },
    ]);
  }

  cadastrarEstudante() {
    if (this.turma != null && this.turma.codigo != null) {
      this.router.navigate([
        'geral/main',
        { outlets: { principal: ['cadastro-estudante', this.turma.codigo] } },
      ]);
    }
  }

  visualizarEstatisticas() {
    if (this.turma != null && this.turma.codigo != null) {
      this.router.navigate([
        'geral/main',
        { outlets: { principal: ['analytics-turma', this.turma.codigo] } },
      ]);
    }
  }

  exportarAnalytics() {
    if (this.turma != null && this.turma.codigo != null) {
      this.router.navigate([
        'geral/main',
        { outlets: { principal: ['exportar-dados', this.turma.codigo] } },
      ]);
    }
  }
}
