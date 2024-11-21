import { Input, OnChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/login-module/login.service';
import { Groups } from 'src/app/model/experimento/groups';
import { Assunto } from 'src/app/model/aprendizagem/questoes/assunto';
import QuestaoFechada from 'src/app/model/aprendizagem/questoes/questaoFechada';
import QuestaoParsonProblem from 'src/app/model/aprendizagem/questoes/questaoParsonProblem';
import { QuestaoProgramacao } from 'src/app/model/aprendizagem/questoes/questaoProgramacao';
import QuestaoProgramacaoCorrecao from 'src/app/model/aprendizagem/questoes/questaoProgramacaoCorrecao';
import { QuestaoProgramacaoRegex } from 'src/app/model/aprendizagem/questoes/questaoProgramacaoRegex';
import { MaterialAprendizagem } from 'src/app/model/aprendizagem/materialAprendizagem';
import VideoProgramacao from 'src/app/model/aprendizagem/videoProgramacao';
import Texto from 'src/app/model/aprendizagem/texto';
import { BreadcrumbService } from 'src/app/geral-module/breadcrumb.service';


@Component({
  selector: 'app-listar-materiais-sequencia',
  templateUrl: './listar-materiais-sequencia.component.html',
  styleUrls: ['./listar-materiais-sequencia.component.css']
})
export class ListarMateriaisSequenciaComponent implements OnChanges {

  @Input()
  assunto?: Assunto;
  materiaisAprendizagem:(QuestaoFechada | QuestaoParsonProblem | QuestaoProgramacao | QuestaoProgramacaoRegex)[] = [];
  events;

  constructor(private login:LoginService, private router: Router, private breadcrumbService:BreadcrumbService) { }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    if(this.assunto != null && this.assunto.pk != null){
      this.construirTimeline();
    }


  }



  getMaterial(material){
    if (material instanceof QuestaoFechada || material instanceof QuestaoProgramacao || material instanceof QuestaoParsonProblem || material instanceof QuestaoProgramacaoCorrecao ||  material instanceof QuestaoProgramacaoRegex) {
      return "questoes"
    }else if(material instanceof VideoProgramacao){
      return "video";
    }else if(material instanceof Texto){
      return "texto";
    }
  }


  async abrirMaterial(material) {
    if (material instanceof QuestaoFechada) {
      this.router.navigate([
        'geral/main',
        { outlets: { principal: ['juiz', 'visualizar-questao-fechada', this.assunto.pk, material.pk] } },
      ]);
    } else if (material instanceof QuestaoParsonProblem) {
      this.router.navigate([
        'geral/main',
        { outlets: { principal: ['juiz', 'visualizar-questao-parson', this.assunto.pk, material.pk] } },
      ]);
    }  else if (material instanceof QuestaoProgramacaoCorrecao) {
      this.router.navigate([
        'geral/main',
        { outlets: { principal: ['juiz', 'responder-questao-correcao', this.assunto.pk, material.pk] } },
      ]);
    } else if (material instanceof QuestaoProgramacaoRegex) {
      this.router.navigate([
        'geral/main',
        { outlets: { principal: ['juiz', 'editor-regex', this.assunto.pk, material.pk] } },
      ]);
    } else if (material instanceof VideoProgramacao) {
      this.router.navigate([
        'geral/main',
        { outlets: { principal: ['aprendizado', 'visualizacao-video', material.pk()] } },
      ]);
    }else if (material instanceof Texto) {
      this.router.navigate([
        'geral/main',
        { outlets: { principal: ['aprendizado', 'visualizacao-texto', this.assunto.pk, material.pk()] } },
      ]);
    }
    else {
      let usuario = this.login.getUsuarioLogado();
      if (usuario.grupoExperimento === Groups.control) {
        this.router.navigate([
          'geral/main',
          { outlets: { principal: ['juiz', 'editor', this.assunto.pk, material.pk] } },
        ]);
        return;
      }

      this.router.navigate([
        'geral/main',
        { outlets: { principal: ['srl', 'self-instruction', this.assunto.pk, material.pk] } },
      ]);
    }
  }

  construirTimeline(){
     this.materiaisAprendizagem = [
      ...this.assunto.questoesFechadas,
      ...this.assunto.questoesParson,
      ...this.assunto.questoesProgramacao,
      ...this.assunto.questoesRegex
    ];


    this.materiaisAprendizagem.sort((a, b) => a.sequencia - b.sequencia);
  }

}
