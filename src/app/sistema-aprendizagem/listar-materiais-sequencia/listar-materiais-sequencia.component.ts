import { Input, OnChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/login-module/login.service';
import { Assunto } from 'src/app/model/assunto';
import { Groups } from 'src/app/model/experimento/groups';
import QuestaoParsonProblem from 'src/app/model/questoes/parsonProblem';
import QuestaoFechada from 'src/app/model/questoes/questaoFechada';
import { QuestaoProgramacao } from 'src/app/model/questoes/questaoProgramacao';
import QuestaoProgramacaoCorrecao from 'src/app/model/questoes/questaoProgramacaoCorrecao';
import { QuestaoProgramacaoRegex } from 'src/app/model/questoes/questaoProgramacaoRegex';
import { MaterialAprendizagem } from 'src/app/model/sistema-aprendizagem/materialAprendizagem';
import VideoProgramacao from 'src/app/model/sistema-aprendizagem/videoProgramacao';

@Component({
  selector: 'app-listar-materiais-sequencia',
  templateUrl: './listar-materiais-sequencia.component.html',
  styleUrls: ['./listar-materiais-sequencia.component.css']
})
export class ListarMateriaisSequenciaComponent implements OnChanges {

  @Input()
  assunto?: Assunto;
  materiaisAprendizagem:MaterialAprendizagem[];
  events;

  constructor(private login:LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    
    if(this.assunto != null && this.assunto.pk() != null){
      this.assunto.getMateriaisOrdenados(this.login.getUsuarioLogado()).subscribe(materiais=>{
        this.materiaisAprendizagem = materiais;
        this.construirTimeline();
      });
    }
    
  }

  getMaterial(material){
    if (material instanceof QuestaoFechada || material instanceof QuestaoProgramacao || material instanceof QuestaoParsonProblem || material instanceof QuestaoProgramacaoCorrecao ||  material instanceof QuestaoProgramacaoRegex) {
      return "questoes"
    }else if(material instanceof VideoProgramacao){
      return "video";
    }
  }

  getCorMaterial(material) {
    if (material.respondida === true) {
      return 'color: rgb(103, 202, 103); cursor:pointer';
    } else if (material.respondida === false) {
      return 'color: rgb(220,20,60); cursor:pointer';
    }

    return 'color: black; cursor:pointer';
  }

  abrirMaterial(questao) {
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

  construirTimeline(){
    let materiais = []
    this.materiaisAprendizagem.forEach(materialAprendizagem => {
      materiais.push(materialAprendizagem)
    });

    this.events = new Observable<any[]>(observer=>{
      observer.next(materiais);
      observer.complete();
    })
  }

}
