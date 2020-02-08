import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from 'src/app/login-module/login.service';
import QuestionarioAutorregulacao from 'src/app/model/experimento/questionarioAutorregulacao';

@Component({
  selector: 'app-questionario-autorregulacao',
  templateUrl: './questionario-autorregulacao.component.html',
  styleUrls: ['./questionario-autorregulacao.component.css']
})
export class QuestionarioAutorregulacaoComponent implements OnInit {

  @Input()
  visibilidadeQuestionario;
  respostasQuestionarioAutorregulacao:QuestionarioAutorregulacao;

  constructor(public login:LoginService) { 
    this.respostasQuestionarioAutorregulacao = new QuestionarioAutorregulacao(null, this.login.getUsuarioLogado());
  }

  ngOnInit() {
    // Verificar se o usuário deve responder ao questionário
    
  }

  salvar(){
    if(this.respostasQuestionarioAutorregulacao.validar()){
      this.respostasQuestionarioAutorregulacao.save().subscribe(resultado=>{
        this.visibilidadeQuestionario = false;
        alert("Obrigado por responder ao questionário.");
      }, err=>{
        alert("Falha ao salvar suas respostas. Tente novamente em alguns minutos.")
      })
    }else{
      alert("Antes de continuar é preciso responder às perguntas. É muito importante para a melhoria da plataforma.")
    }
  }

}
