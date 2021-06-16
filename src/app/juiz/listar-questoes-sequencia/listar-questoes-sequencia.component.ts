import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login-module/login.service';
import { Assunto } from 'src/app/model/assunto';
import { Groups } from 'src/app/model/experimento/groups';
import { QuestaoProgramacao } from 'src/app/model/questoes/questaoProgramacao';
import { forkJoin, Observable } from 'rxjs';
import QuestaoFechada from 'src/app/model/questoes/questaoFechada';
import QuestaoParsonProblem from 'src/app/model/questoes/parsonProblem';
import QuestaoProgramacaoCorrecao from 'src/app/model/questoes/questaoProgramacaoCorrecao';
import { QuestaoProgramacaoRegex } from 'src/app/model/questoes/questaoProgramacaoRegex';

@Component({
  selector: 'app-listar-questoes-sequencia',
  templateUrl: './listar-questoes-sequencia.component.html',
  styleUrls: ['./listar-questoes-sequencia.component.css'],
})
export class ListarQuestoesSequenciaComponent implements OnChanges {
  @Input()
  assunto?: Assunto;
  valor;
  questoes;

  events;

  constructor(private router: Router, private login: LoginService) {
    this.valor = 2;
    
  }

  ngOnChanges(): void {
    
    if(this.assunto != null && this.assunto.pk() != null){
      this.assunto.getQuestoesComStatusConclusao(this.login.getUsuarioLogado()).subscribe(questoes=>{
        this.questoes = questoes;
        this.construirTimelineQuestoes();
      });
    }
    
  }

  abrirQuestao(questao) {
    if (questao instanceof QuestaoFechada) {
      this.router.navigate([
        'geral/main',
        { outlets: { principal: ['juiz', 'visualizacao-questao-fechada', this.assunto.pk(), questao.id] } },
      ]);
    } else if (questao instanceof QuestaoParsonProblem) {
      this.router.navigate([
        'geral/main',
        { outlets: { principal: ['juiz', 'visualizar-questao-parson', this.assunto.pk(), questao.id] } },
      ]);
    }  else if (questao instanceof QuestaoProgramacaoCorrecao) {
      this.router.navigate([
        'geral/main',
        { outlets: { principal: ['juiz', 'responder-questao-correcao', this.assunto.pk(), questao.id] } },
      ]);
    } else if (questao instanceof QuestaoProgramacaoRegex) {
      this.router.navigate([
        'geral/main',
        { outlets: { principal: ['juiz', 'editor-regex', this.assunto.pk(), questao.id] } },
      ]);
    } 
    else {
      if (this.login.getUsuarioLogado().grupoExperimento === Groups.control) {
        this.router.navigate([
          'geral/main',
          { outlets: { principal: ['juiz', 'editor', this.assunto.pk(), questao.id] } },
        ]);
        return;
      }

      this.router.navigate([
        'geral/main',
        { outlets: { principal: ['srl', 'self-instruction', this.assunto.pk(), questao.id] } },
      ]);
    }
  }

  getCorQuestao(questao) {
    if (questao.respondida === true) {
      return 'color: rgb(103, 202, 103); cursor:pointer';
    } else if (questao.respondida === false) {
      return 'color: rgb(220,20,60); cursor:pointer';
    }

    return 'color: black; cursor:pointer';
  }

  construirTimelineQuestoes(){
    let questoes = []
    this.questoes.forEach(questao => {
      questoes.push(questao)
    });

    this.events = new Observable<any[]>(observer=>{
      observer.next(questoes);
      observer.complete();
    })
  }
}
