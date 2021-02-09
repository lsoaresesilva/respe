import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
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
  styleUrls: ['./criacao-grupo.component.css']
})
export class CriacaoGrupoComponent implements OnInit {

  estudanteSelecionado;
  pesquisaEstudantes; // Estudantes filtrados pela consulta
  estudantesTurma;
  estudantesSelecionados; // Estudantes selecionados para o grupo

  assuntos;
  assuntoSelecionado:Assunto;

  turmaSelecionada:Turma;
  pesquisaTurmas;

  questoes;
  questaoSelecionada;


  constructor(private chatService:ChatService, private messageService: MessageService) { 
    this.estudantesSelecionados = []; 
    Assunto.getAll().subscribe(assuntos => {
      this.assuntos = assuntos;
    })
  }

  ngOnInit(): void {
  }

  pesquisar(event) {

    
    /* Usuario.pesquisar(new Query("nome", "==", event.query)).subscribe(alunos => {
        this.pesquisaAlunos = alunos;
    }); */
    if(event.query.length >= 3 ){
      let queryLowerCase = event.query.toLowerCase();

      let consulta = new RegExp(".*"+queryLowerCase+".*"); 
       
      let estudantesFiltrados = [];
      if(Array.isArray(this.estudantesTurma)){
        this.estudantesTurma.forEach(estudante=>{
          let matchesRegex = consulta.test(estudante.nome.toLowerCase());
          if (matchesRegex) {
              estudantesFiltrados.push(estudante);
          }
        })
  
        this.pesquisaEstudantes = estudantesFiltrados;
      }
    }
    


  }

  pesquisarTurma(event) {

    Turma.search(new Query("nome", "==", event.query)).subscribe(turmas => {
        this.pesquisaTurmas = turmas;
        
    });

  }

  selecionarTurma(event){
    if(this.turmaSelecionada != null){
      Usuario.getAllEstudantesByTurma(this.turmaSelecionada.codigo).subscribe(estudantes=>{
        
        this.estudantesTurma = estudantes;
        this.pesquisaEstudantes = estudantes;
      })
    }
  }

  selecionarAluno(event){
    this.estudantesSelecionados.push(this.estudanteSelecionado);
    this.estudanteSelecionado = null; 
  }

  excluir(aluno){
    let index = 0;
    for(let i = 0; i < this.estudantesSelecionados.length; i++){
      if(this.estudantesSelecionados[i].nome == aluno.nome){
        break;
      }

      index += 1;
    }

    this.estudantesSelecionados.splice(index, 1);
    
  }

  criarSala(){
    let uuid = Util.uuidv4();
    
    let atividade = new AtividadeGrupo(null, this.questaoSelecionada.nomeCurto, "", this.estudantesSelecionados)
    /* Quando entrar no link ativar o socket no cliente do aluno */
    atividade.salvar(this.assuntoSelecionado, this.questaoSelecionada).subscribe(()=>{
      this.messageService.add({severity:'success', summary:'Sucesso', detail:'Atividade criada com sucesso.'});
    });

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