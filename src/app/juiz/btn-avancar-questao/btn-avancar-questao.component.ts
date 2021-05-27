import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login-module/login.service';
import { Assunto } from 'src/app/model/assunto';
import { Groups } from 'src/app/model/experimento/groups';
import QuestaoParsonProblem from 'src/app/model/questoes/parsonProblem';
import QuestaoFechada from 'src/app/model/questoes/questaoFechada';

@Component({
  selector: 'app-btn-avancar-questao',
  templateUrl: './btn-avancar-questao.component.html',
  styleUrls: ['./btn-avancar-questao.component.css']
})
export class BtnAvancarQuestaoComponent implements OnInit {

  @Input()
  assunto:Assunto;

  @Input()
  questao;

  constructor(private router: Router, private login: LoginService) { }

  ngOnInit(): void {

  }

  avancarQuestao(){
    // verificar o tipo da próxima questão
    let questao = this.assunto.proximaQuestao(this.questao) as any;
    if(questao != null){
      if (questao instanceof QuestaoFechada) {
        this.router.navigate([
          'geral/main',
          { outlets: { principal: ['juiz', 'visualizacao-questao-fechada', this.assunto.pk(), questao.id] } },
        ]);
      } else if (questao instanceof QuestaoParsonProblem) {
        this.router.navigate([
          'geral/main',
          { outlets: { principal: ['juiz', 'visualizacao-questao-parson', this.assunto.pk(), questao.id] } },
        ]);
      } else {
        if (this.login.getUsuarioLogado().grupoExperimento === Groups.control) {
          this.router.navigate([
            'geral/main',
            { outlets: { principal: ['juiz', 'editor', this.assunto.pk(), questao.id] } },
          ]);
          return;
        }
  
        this.router.navigate([
          'geral/main',
          { outlets: { principal: ['self-instruction', this.assunto.pk(), questao.id] } },
        ]);
      }
    }

    //redirecionar adequadamente (verificar se'e grupo controle ou não em relação ao self-instruction)
  }



}
