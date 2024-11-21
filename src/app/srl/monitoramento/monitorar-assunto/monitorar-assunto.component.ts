import { Input, OnChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../login-module/login.service';
import Analytics from '../../../model/analytics/analytics';
import { Assunto } from '../../../model/aprendizagem/questoes/assunto';

@Component({
  selector: 'app-monitorar-assunto',
  templateUrl: './monitorar-assunto.component.html',
  styleUrls: ['./monitorar-assunto.component.css'],
})
export class MonitorarAssuntoComponent implements OnChanges {
  constructor(private loginService: LoginService) {}

  @Input()
  assunto: Assunto;
  progressos = [
    {
      "nome": "Fechadas",
      "progresso": 0
    },
    {
      "nome": "Blocos",
      "progresso": 0
    },
    {
      "nome": "Sintaxe",
      "progresso": 0
    },
    {
      "nome": "Resolução de problemas",
      "progresso": 0
    }
  ]

  async ngOnChanges(): Promise<void> {
    if(this.assunto != null){
      const progresso = await this.assunto.calcularProgressoPorQuestao();
      this.assunto.progressoQuestoes = progresso.progressoQuestoes;
      this.assunto.percentualConclusao = progresso.progresso;
      this.progressos.forEach(tipo => {
        if(tipo.nome == "Fechadas"){
          tipo.progresso = progresso.progressoQuestoes.questoesFechadas;
        }else if(tipo.nome == "Blocos"){
          tipo.progresso = progresso.progressoQuestoes.questoesParson;
        }else if(tipo.nome == "Sintaxe"){
          tipo.progresso = progresso.progressoQuestoes.questoesRegex;
        }else if(tipo.nome == "Resolução de problemas"){
          tipo.progresso = progresso.progressoQuestoes.questoesProgramacao;
        }
      });
    }
    
  }
}
