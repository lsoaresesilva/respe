import { Component, OnInit, Input, Output } from '@angular/core';
import {LoginService} from '../../login-module/login.service';
import { RespostaQuestaoExperimento} from '../../model/experimento/old_check_to_delete/respostaQuestaoExperimento';

@Component({
  selector: 'app-questao',
  templateUrl: './questao.component.html',
  styleUrls: ['./questao.component.css'],
})
export class QuestaoComponent implements OnInit {
  @Input('questao') questao;
  @Input('respostaQuestao') respostaQuestao: RespostaQuestaoExperimento;

  constructor(private loginService: LoginService) {}

  ngOnInit() {}

  selecionarAlternativa(alternativa) {
    this.respostaQuestao.alternativa = alternativa;
    this.respostaQuestao.questao = this.questao;
    this.respostaQuestao.estudante = this.loginService.getUsuarioLogado();
  }
}
