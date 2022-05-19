import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GamificationFacade } from 'src/app/gamification/gamification.service';
import { ApresentacaoService } from 'src/app/geral-module/apresentacao.service';
import { LoginService } from 'src/app/login-module/login.service';
import PontuacaoQuestaoParson from 'src/app/model/gamification/pontuacaoQuestaoParson';
import { RespostaQuestaoParson } from 'src/app/model/juiz/respostaQuestaoParson';
import { Assunto } from 'src/app/model/questoes/assunto';
import QuestaoParsonProblem from 'src/app/model/questoes/questaoParsonProblem';

@Component({
  selector: 'app-visualizar-parson',
  templateUrl: './visualizar-parson.component.html',
  styleUrls: ['./visualizar-parson.component.css'],
})
export class VisualizarParsonComponent implements OnInit, AfterViewChecked {
  questao?: QuestaoParsonProblem;
  usuario;
  respostaQuestaoFechada?: RespostaQuestaoParson;
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
    this.respostaQuestaoFechada = new RespostaQuestaoParson(null, this.usuario, [], this.questao);
  }


  ngAfterViewChecked() {
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
    this.route.params.subscribe((params) => {
      if (params['assuntoId'] != undefined && params['questaoId'] != undefined) {
        Assunto.get(params['assuntoId']).subscribe((assunto: Assunto) => {
          this.assunto = assunto;

          if (assunto['questoesFechadas'] != undefined && assunto['questoesFechadas'].length > 0) {
            this.questao = assunto['getQuestaoParsonById'](params['questaoId']);
            this.respostaQuestaoFechada.questao = this.questao;

            RespostaQuestaoParson.getRespostaQuestaoEstudante(this.questao, this.usuario).subscribe(
              (respostaUsuario: RespostaQuestaoParson) => {
                if (respostaUsuario != null) {
                  this.respostaQuestaoFechada = respostaUsuario;
                  this.questao.segmentos = [];

                }
              }
            );
          }
        });
      } else {
        throw new Error(
          'Não é possível visualizar uma questão, pois não foram passados os identificadores de assunto e questão.'
        );
      }
    });
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

  enviar() {
    this.respostaQuestaoFechada.save().subscribe((resposta) => {
      if (this.questao.isRespostaCorreta(this.respostaQuestaoFechada)) {
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
