import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import AtividadeGrupo from 'src/app/model/cscl/atividadeGrupo';
import Frequencia from 'src/app/model/cscl/frequencia';
import QuestaoColaborativa from 'src/app/model/cscl/questaoColaborativa';
import Query from 'src/app/model/firestore/query';
import { Assunto } from 'src/app/model/aprendizagem/questoes/assunto';
import Turma from 'src/app/model/turma';
import Usuario from 'src/app/model/usuario';
import { Util } from 'src/app/model/util';

@Component({
  selector: 'app-criacao-grupo',
  templateUrl: './criar-atividade-grupo.component.html',
  styleUrls: ['./criar-atividade-grupo.component.css'],
})
export class CriarAtividadeGrupoComponent implements OnInit {
  dataExpiracao;

  estudanteSelecionado;
  pesquisaEstudantes;
  estudantesSelecionados;
  estudantesTurma;

  turmaSelecionada;
  pesquisaTurmas;

  assuntos;
  assuntoSelecionado: Assunto;

  questoes;
  questoesSelecionadas;

  tamanhoGrupo:number;

  constructor(private messageService: MessageService) {
    this.estudantesSelecionados = [];
    this.questoesSelecionadas = [];
    this.tamanhoGrupo = 2;

    Turma.getAll().subscribe((turmas) => {
      this.pesquisaTurmas = turmas;
    });

    Assunto.getAll().subscribe((assuntos) => {
      this.assuntos = assuntos;
    });
  }

  ngOnInit(): void {}

  pesquisar(event) {
    if (Array.isArray(this.estudantesTurma)) {
      if (event.query != '' && event.query.length > 2) {
        this.pesquisaEstudantes = this.estudantesTurma.filter(function pesquisaEstudantes(
          estudante
        ) {
          if (estudante.nome.toLowerCase().includes(event.query.toLowerCase())) {
            return true;
          }

          return false;
        });
        let x = 0;
      } else {
        this.pesquisaEstudantes = this.estudantesTurma;
      }
    }
  }

  pesquisarTurma(event) {
    Turma.pesquisar(new Query('codigo', '==', event.query)).subscribe((turmas) => {
      this.pesquisaTurmas = turmas;
    });
  }

  selecionarTurma(event) {
    this.estudantesSelecionados = [];
    Turma.getAllEstudantes(this.turmaSelecionada.codigo).subscribe((estudantes) => {
      this.estudantesTurma = estudantes;
      this.pesquisaEstudantes = estudantes;
    });
  }

  selecionarAluno(event) {
    this.estudantesSelecionados.push(this.estudanteSelecionado);
    this.estudanteSelecionado = null;
  }

  excluir(aluno) {
    let index = 0;
    for (let i = 0; i < this.estudantesSelecionados.length; i++) {
      if (this.estudantesSelecionados[i].nome == aluno.nome) {
        break;
      }

      index += 1;
    }

    this.estudantesSelecionados.splice(index, 1);
  }

  criarSala() {
    //let grupos = AtividadeGrupo.criarGrupos(this.estudantesSelecionados, this.tamanhoGrupo);

    let salvamentosAtividades = [];

    if (
      AtividadeGrupo.validar(
        this.dataExpiracao,
        /* grupos, */
        this.questoesSelecionadas[0],
        this.assuntoSelecionado
      )
    ) {
      this.questoesSelecionadas.forEach((questao) => {
        let atividade = AtividadeGrupo.criarAtividade(
          this.dataExpiracao,
          this.assuntoSelecionado,
          questao,
          this.turmaSelecionada,
          this.tamanhoGrupo
        );

        atividade.grupos = []//grupos;
        salvamentosAtividades.push(atividade.save());
      });

      forkJoin(salvamentosAtividades).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Atividade criada com sucesso.',
        });
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'É preciso preencher todos os dados!',
      });
    }
    //
    /* let atividadeGrupo = new AtividadeGrupo(
      null,
      this.questaoSelecionada.nomeCurto,
      '',
      this.dataExpiracao,
      this.estudantesSelecionados
    );
    // Quando entrar no link ativar o socket no cliente do aluno
    atividadeGrupo.salvar(this.assuntoSelecionado, this.questaoSelecionada).subscribe(() => {

    }); */
  }

  importarFrequencia(){
    if(this.turmaSelecionada == null){
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'É preciso escolher uma turma!',
      });
    }else{
      let data = new Date();
    Frequencia.getByQuery([new Query("codigoTurma", "==", this.turmaSelecionada.codigo),new Query("data", "==", data.getDate()+"/"+data.getMonth())]).subscribe(frequencia=>{
      frequencia.getEstudantes().subscribe(estudantes=>{
        this.estudantesSelecionados = estudantes;
      })
    })
    }

  }

  selecionarAssunto(event) {
    if (this.assuntoSelecionado != null) {
      this.questoes = this.assuntoSelecionado.questoesColaborativas;
    } else {
      if (event.value != null) {
        this.assuntoSelecionado = event.value;
        this.questoes = this.assuntoSelecionado.questoesColaborativas;
      }
    }
  }

  selecionarQuestao(questao) {
    this.questoesSelecionadas.push(questao);
  }

  removerQuestao(questao:QuestaoColaborativa) {
    let index = -1;
    for(let i = 0; i < this.questoesSelecionadas.length; i++){
      if(this.questoesSelecionadas[i].id == questao.id){
        index = i;
        break
      }
    }

    if(index != -1){
      this.questoesSelecionadas.splice(index, 1);
    }
  }
}
