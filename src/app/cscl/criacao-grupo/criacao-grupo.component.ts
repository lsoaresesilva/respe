import { Component, OnInit } from '@angular/core';
import { Assunto } from 'src/app/model/assunto';
import Query from 'src/app/model/firestore/query';
import Usuario from 'src/app/model/usuario';
import { Util } from 'src/app/model/util';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-criacao-grupo',
  templateUrl: './criacao-grupo.component.html',
  styleUrls: ['./criacao-grupo.component.css']
})
export class CriacaoGrupoComponent implements OnInit {

  alunoSelecionado;
  pesquisaAlunos;
  alunosSelecionados;

  assuntos;
  assuntoSelecionado:Assunto;

  questoes;
  questaoSelecionada;

  constructor(private chatService:ChatService) { 
    this.alunosSelecionados = [];
    Assunto.getAll().subscribe(assuntos => {
      this.assuntos = assuntos;
    })
  }

  ngOnInit(): void {
  }

  pesquisar(event) {

    Usuario.pesquisar(new Query("nome", "==", event.query)).subscribe(alunos => {
        this.pesquisaAlunos = alunos;
    });

  }

  selecionarAluno(event){
    this.alunosSelecionados.push(this.alunoSelecionado);
    this.alunoSelecionado = null; 
  }

  excluir(aluno){
    let index = 0;
    for(let i = 0; i < this.alunosSelecionados.length; i++){
      if(this.alunosSelecionados[i].nome == aluno.nome){
        break;
      }

      index += 1;
    }

    this.alunosSelecionados.splice(index, 1);
    
  }

  criarSala(){
    let uuid = Util.uuidv4();
    let link = "http://localhost:4200/main/(principal:entrar-grupo/)";

    /* Quando entrar no link ativar o socket no cliente do aluno */

  }

  selecionarAssunto(){
    if(this.assuntoSelecionado != null){
      this.questoes = this.assuntoSelecionado.questoesProgramacao;
    }
  }

  selecionarQuestao(questao){
    this.questaoSelecionada = questao;
  }



}