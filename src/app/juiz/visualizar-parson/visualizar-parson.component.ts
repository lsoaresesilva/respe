import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GamificationFacade } from 'src/app/gamification/gamification.service';
import { ApresentacaoService } from 'src/app/geral-module/apresentacao.service';
import { LoginService } from 'src/app/login-module/login.service';
import PontuacaoQuestaoParson from 'src/app/model/gamification/pontuacaoQuestaoParson';
import { RespostaQuestaoParson } from 'src/app/model/aprendizagem/questoes/respostaQuestaoParson';
import { Assunto } from 'src/app/model/aprendizagem/questoes/assunto';
import QuestaoParsonProblem from 'src/app/model/aprendizagem/questoes/questaoParsonProblem';
import Query from 'src/app/model/database/query';
import SegmentoRespostaParson from 'src/app/model/aprendizagem/questoes/segmentoRespostaParson';
import SegmentoParson from 'src/app/model/aprendizagem/questoes/segmentoParson';

@Component({
  selector: 'app-visualizar-parson',
  templateUrl: './visualizar-parson.component.html',
  styleUrls: ['./visualizar-parson.component.css'],
})
export class VisualizarParsonComponent implements OnInit, AfterViewChecked {
  questao?: QuestaoParsonProblem;
  usuario;
  respostaQuestao?: RespostaQuestaoParson;
  assunto: Assunto;
  segmentoSelecionado;

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private login: LoginService,
    private messageService: MessageService,
    private gamification: GamificationFacade,
    private apresentacao:ApresentacaoService
  ) {
    this.usuario = this.login.getUsuarioLogado();
    this.respostaQuestao = new RespostaQuestaoParson(null, this.usuario, [], this.questao);
  }


  ngAfterViewChecked() {
    if(this.questao != null)
      this.apresentacao.apresentarEditorParson(this.login.getUsuarioLogado());
  }

  formatarHtml(questao) {
    return this.sanitizer.bypassSecurityTrustHtml(questao.enunciado);
  }

  gerarHtmlTextoComCodigo(questao: QuestaoParsonProblem) {
    if (questao.possuiCodigoNoEnunciado()) {
      const texto = questao.enunciado
        .replace(
          new RegExp("'''python", 'g'),
          "<pre><code class='language-python' style='display: block; white-space: pre-wrap;' pCode>"
        )
        .replace(new RegExp("'''", 'g'), '</code></pre>');
      return this.sanitizer.bypassSecurityTrustHtml(texto);
    }
  }

  

  ngOnInit(): void {
    if (this.questao == null) {
      this.route.params.subscribe((params) => {
        QuestaoParsonProblem.get(params['questaoId']).subscribe((questao) => {
          this.questao = questao as QuestaoParsonProblem;
          this.respostaQuestao = new RespostaQuestaoParson(null, this.usuario, [], this.questao);
          RespostaQuestaoParson.getByQuery([
            new Query('questao_id', '==', questao.pk),
          ]).subscribe(
            (respostaUsuario: RespostaQuestaoParson) => {
              if (respostaUsuario != null) {
                this.respostaQuestao = respostaUsuario;
                this.respostaQuestao.prepararSegmentos(this.questao)
              }
            }
          );
        });
      });
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  responder() {
    this.respostaQuestao.isRespostaCorreta = this.questao.isRespostaCorreta(this.respostaQuestao);
    this.respostaQuestao.save().subscribe((resposta) => {
      this.respostaQuestao = resposta as RespostaQuestaoParson;
      this.respostaQuestao.questao = this.questao;
      this.respostaQuestao.prepararSegmentos(this.questao)
      if (this.questao.isRespostaCorreta(this.respostaQuestao)) {
        this.gamification.aumentarPontuacao(
          this.login.getUsuarioLogado(),
          this.questao,
          new PontuacaoQuestaoParson()
        );
        this.messageService.add({
          severity: 'success',
          summary: 'Parabéns',
          detail: 'Resposta correta!',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Ops...',
          detail: 'Resposta incorreta!',
        });
      }
    });
  }
}
