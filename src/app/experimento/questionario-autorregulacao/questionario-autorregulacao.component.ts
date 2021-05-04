import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/login-module/login.service';
import QuestionarioAutorregulacao from 'src/app/model/experimento/questionarioAutorregulacao';
import Query from 'src/app/model/firestore/query';

@Component({
  selector: 'app-questionario-autorregulacao',
  templateUrl: './questionario-autorregulacao.component.html',
  styleUrls: ['./questionario-autorregulacao.component.scss']
})
export class QuestionarioAutorregulacaoComponent implements OnInit {

  @Input()
  visibilidadeQuestionario;
  respostasQuestionarioAutorregulacao:QuestionarioAutorregulacao;

  @Output()
  onQuestionarioRespondido;

  constructor(public login:LoginService) { 
    this.respostasQuestionarioAutorregulacao = new QuestionarioAutorregulacao(null, this.login.getUsuarioLogado());
    this.onQuestionarioRespondido = new EventEmitter();
  }

  ngOnInit() {
    
  }

  

  salvar(){
    if(this.respostasQuestionarioAutorregulacao.validar()){
      this.respostasQuestionarioAutorregulacao.save().subscribe(resultado=>{
        this.visibilidadeQuestionario = false;
        this.onQuestionarioRespondido.emit(true);
        alert("Obrigado por responder ao questionário.");
      }, err=>{
        alert("Falha ao salvar suas respostas. Tente novamente em alguns minutos.")
      })
    }else{
      alert("Antes de continuar é preciso responder às perguntas. É muito importante para a melhoria da plataforma.")
    }
  }

}
