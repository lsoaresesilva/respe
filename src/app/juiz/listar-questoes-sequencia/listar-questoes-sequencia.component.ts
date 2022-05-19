import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Assunto } from '../../model/questoes/assunto';
import QuestaoFechada from '../../model/questoes/questaoFechada';
import QuestaoParsonProblem from '../../model/questoes/questaoParsonProblem';
import QuestaoProgramacaoCorrecao from '../../model/questoes/questaoProgramacaoCorrecao';
import {QuestaoProgramacaoRegex} from '../../model/questoes/questaoProgramacaoRegex';
import {LoginService} from '../../login-module/login.service';
import {Groups} from '../../model/experimento/groups';


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
  estudante;
  events;

  constructor(private router: Router, private login: LoginService) {
    this.valor = 2;
    this.estudante = this.login.getUsuarioLogado()
  }

  ngOnChanges(): void {

    if(this.assunto != null && this.assunto.pk() != null){
      this.assunto.getMateriaisOrdenados(this.login.getUsuarioLogado()).subscribe(questoes=>{
        this.questoes = questoes;
        this.construirTimelineQuestoes();
      });
    }
  }

  abrirQuestao(questao) {
    if (questao instanceof QuestaoFechada) {
      this.router.navigate([
        'geral/main',
        { outlets: { principal: ['juiz', 'visualizar-questao-fechada', this.assunto.pk(), questao.id] } },
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
    if(this.estudante.grupoExperimento != Groups.control){
      if (questao.respondida === true) {
        return 'color: rgb(103, 202, 103); cursor:pointer';
      } else if (questao.respondida === false) {
        return 'color: rgb(220,20,60); cursor:pointer';
      }
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
