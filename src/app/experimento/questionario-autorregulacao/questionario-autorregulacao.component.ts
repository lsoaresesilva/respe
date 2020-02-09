import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from 'src/app/login-module/login.service';
import QuestionarioAutorregulacao from 'src/app/model/experimento/questionarioAutorregulacao';
import Query from 'src/app/model/firestore/query';

@Component({
  selector: 'app-questionario-autorregulacao',
  templateUrl: './questionario-autorregulacao.component.html',
  styleUrls: ['./questionario-autorregulacao.component.css']
})
export class QuestionarioAutorregulacaoComponent implements OnInit {

  visibilidadeQuestionario;
  respostasQuestionarioAutorregulacao:QuestionarioAutorregulacao;

  constructor(public login:LoginService) { 
    this.respostasQuestionarioAutorregulacao = new QuestionarioAutorregulacao(null, this.login.getUsuarioLogado());
    this.visibilidadeQuestionario = false;
  }

  ngOnInit() {
    this.apresentarPretestRegulacao();
  }

  apresentarPretestRegulacao(){
    let usuario = this.login.getUsuarioLogado();
    if(usuario != null && typeof usuario.pk === "function"){
      QuestionarioAutorregulacao.getByQuery(new Query("usuarioId", "==", usuario.pk())).subscribe(resultado=>{
        this.visibilidadeQuestionario = false;
      }, err=>{
        this.visibilidadeQuestionario = true;
      })
    }
    
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
