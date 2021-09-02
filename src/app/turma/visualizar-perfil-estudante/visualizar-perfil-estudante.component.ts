import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Usuario from 'src/app/model/usuario';
import { QuestaoProgramacao } from 'src/app/model/sistema-aprendizagem/questoes/questaoProgramacao';
import { LoginService } from '../../login-module/login.service';
import Submissao from 'src/app/model/submissao';
import Query from 'src/app/model/firestore/query';
import PageTrackRecord from 'src/app/model/analytics/pageTrack';
import { AutoInstrucao } from 'src/app/model/srl/autoInstrucao';
import CadeiaMarkov from 'src/app/model/experimento/cadeia_markov';
import { Assunto } from 'src/app/model/sistema-aprendizagem/assunto';

@Component({
  selector: 'app-visualizar-perfil-estudante',
  templateUrl: './visualizar-perfil-estudante.component.html',
  styleUrls: ['./visualizar-perfil-estudante.component.css'],
})
export class VisualizarPerfilEstudanteComponent implements OnInit {
  @Input('assunto') assunto?;
  estudante;
  questoes: QuestaoProgramacao[] = [];
  submissoes: any[];
  respostaUsuario;
  pageTracks;

  progressoGeral;

  constructor(private route: ActivatedRoute, private login: LoginService) {
    this.estudante = new Usuario(null, null, null, null, null, null);
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {

      Usuario.get(params['id']).subscribe((estudante) => {
        this.estudante = estudante;

        /* PageTrackRecord.getAll(new Query("estudanteId", "==", this.estudante.pk())).subscribe(pageTracks=>{
          this.pageTracks = pageTracks;
        }) */

        Assunto.consultarRespostasEstudante(this.estudante).subscribe(respostas=>{
        
          Assunto.getAll().subscribe(assuntos=>{
            if(this.estudante.codigoTurma == "2021a" || this.estudante.codigoTurma == "turma1"){
              this.progressoGeral = Assunto.calcularProgressoGeral_controle_positivo_temp(assuntos, respostas);
            }else{
              this.progressoGeral = Assunto.calcularProgressoGeral(assuntos, respostas);
            }
            
          })
  
  
          
          
        });
      });

     

      

      /* CadeiaMarkov.construirMatrizTransicaoLowPerforming().subscribe(pageTracks=>{
        this.pageTracks = pageTracks;
      }) */

      

      /*
       Submissao.getAll(new Query('estudanteId', '==', params['id'])).subscribe((resultado) => {
        this.submissoes = resultado;
        this.buscarQuestoes(resultado);
      });

      
 */
      /* */

    });
  }

  porcetagemEstudante(questoes) {
    questoes.forEach((questao) => {
      QuestaoProgramacao.isFinalizada(questao, this.login.getUsuarioLogado()).subscribe(
        (porcentagem) => {
          //questao.respostaUsuario = porcentagem;
        }
      );
    });
  }

  buscarQuestoes(submissoes = []) {
    submissoes.forEach((submissao) => {
      Assunto.getAll().subscribe((assuntos) => {
        assuntos.forEach((assunto) => {
          assunto.questoesProgramacao.forEach((questao) => {
            if (questao.id == submissao.questaoId) {
              this.questoes.push(questao);
              this.porcetagemEstudante(this.questoes);
            }
          });
        });
      });
    });
  }
}
