import { Component, OnInit, Input, Output } from '@angular/core';
import { Questao } from 'src/app/model/questao';
import { RespostaQuestaoExperimento } from 'src/app/model/experimento/respostaQuestaoExperimento';
import { LoginService } from 'src/app/login-module/login.service';

@Component({
  selector: 'app-questao',
  templateUrl: './questao.component.html',
  styleUrls: ['./questao.component.css']
})
export class QuestaoComponent implements OnInit {

  @Input("questao") questao;
  @Input("respostaQuestao") respostaQuestao:RespostaQuestaoExperimento;

  constructor(private loginService:LoginService) { }

  ngOnInit() {

  }

  selecionarAlternativa(alternativa){
    this.respostaQuestao.alternativa = alternativa;
    this.respostaQuestao.questao = this.questao;
    this.respostaQuestao.estudante = this.loginService.getUsuarioLogado();
  }

  

}
