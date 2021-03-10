import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { Assunto } from 'src/app/model/assunto';
import AtividadeGrupo from 'src/app/model/cscl/atividadeGrupo';
import Query from 'src/app/model/firestore/query';
import Turma from 'src/app/model/turma';
import Usuario from 'src/app/model/usuario';
import { Util } from 'src/app/model/util';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-criacao-grupo',
  templateUrl: './criacao-grupo.component.html',
  styleUrls: ['./criacao-grupo.component.css'],
})
export class CriacaoGrupoComponent implements OnInit {
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
  questaoSelecionada;

  constructor(private chatService: ChatService, private messageService: MessageService) {
    this.estudantesSelecionados = [];

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
        this.pesquisaEstudantes = this.estudantesTurma.filter(function pesquisaEstudantes(estudante) {
          if (estudante.nome.toLowerCase().includes(event.query.toLowerCase())) {
            return true;
          }

          return false;
        });
        let x = 0;
      }else{
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
    let atividade = new AtividadeGrupo(null, this.questaoSelecionada.questao.nomeCurto, this.assuntoSelecionado, this.questaoSelecionada, this.dataExpiracao, this.estudantesSelecionados, this.turmaSelecionada);
    if(atividade.validar()){
      let grupos = AtividadeGrupo.criarGrupos(this.estudantesSelecionados, this.dataExpiracao, this.assuntoSelecionado, this.questaoSelecionada, this.turmaSelecionada);
      let salvar = []
      grupos.forEach(grupo=>{
        salvar.push(grupo.save());
      })
  
      forkJoin(salvar).subscribe(r=>{
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Atividade criada com sucesso.',
        });
      })
    }else{
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

  selecionarAssunto(event) {
    if (this.assuntoSelecionado != null) {
      this.questoes = this.assuntoSelecionado.questoesColaborativas;
    }else{
      if(event.value != null){
        this.assuntoSelecionado = event.value;
        this.questoes = this.assuntoSelecionado.questoesColaborativas;
      }
    }
  }

  selecionarQuestao(questao) {
    this.questaoSelecionada = questao;
  }

  removerQuestao(){
    this.questaoSelecionada = null;
  }
}
