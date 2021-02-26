import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login-module/login.service';
import { Assunto } from 'src/app/model/assunto';
import { Groups } from 'src/app/model/experimento/groups';
import { QuestaoProgramacao } from 'src/app/model/questoes/questaoProgramacao';
import { forkJoin, Observable } from 'rxjs';
import QuestaoFechada from 'src/app/model/questoes/questaoFechada';
import QuestaoParsonProblem from 'src/app/model/questoes/parsonProblem';

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
    let consultas = {};
    if (
      this.assunto != null &&
      Array.isArray(this.assunto.questoesFechadas) &&
      this.assunto.questoesFechadas.length > 0
    ) {
      consultas['questoesFechadas'] = QuestaoFechada.verificarQuestoesRespondidas(
        this.login.getUsuarioLogado(),
        this.assunto.questoesFechadas
      );
    }

    if (
      this.assunto != null &&
      Array.isArray(this.assunto.questoesProgramacao) &&
      this.assunto.questoesProgramacao.length > 0
    ) {
      consultas['questoesProgramacao'] = QuestaoProgramacao.verificarQuestoesRespondidas(
        this.login.getUsuarioLogado(),
        this.assunto.questoesProgramacao
      );
    }

    if (
      this.assunto != null &&
      Array.isArray(this.assunto.questoesParson) &&
      this.assunto.questoesParson.length > 0
    ) {
      consultas['questoesParson'] = QuestaoParsonProblem.verificarQuestoesRespondidas(
        this.login.getUsuarioLogado(),
        this.assunto.questoesParson
      );
    }

    forkJoin(consultas).subscribe((respostas) => {
      if (respostas['questoesFechadas'] != null) {
        this.assunto.questoesFechadas = respostas['questoesFechadas'];
      }

      if (respostas['questoesProgramacao'] != null) {
        this.assunto.questoesProgramacao = respostas['questoesProgramacao'];
      }

      if (respostas['questoesParson'] != null) {
        this.assunto.questoesParson = respostas['questoesParson'];
      }

      this.questoes = this.assunto.ordenarQuestoes();

      this.construirTimelineQuestoes();

    });
  }

  abrirQuestao(questao) {
    if (questao instanceof QuestaoFechada) {
      this.router.navigate([
        'main',
        { outlets: { principal: ['visualizacao-questao-fechada', this.assunto.pk(), questao.id] } },
      ]);
    } else if (questao instanceof QuestaoParsonProblem) {
      this.router.navigate([
        'main',
        { outlets: { principal: ['visualizar-questao-parson', this.assunto.pk(), questao.id] } },
      ]);
    } else {
      if (this.login.getUsuarioLogado().grupoExperimento === Groups.control) {
        this.router.navigate([
          'main',
          { outlets: { principal: ['editor', this.assunto.pk(), questao.id] } },
        ]);
        return;
      }

      this.router.navigate([
        'main',
        { outlets: { principal: ['self-instruction', this.assunto.pk(), questao.id] } },
      ]);
    }
  }

  getCorQuestao(questao) {
    if (questao.respondida === true) {
      return 'color: rgb(103, 202, 103)';
    } else if (questao.respondida === false) {
      return 'color: rgb(220,20,60)';
    }

    return 'color: black';
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
