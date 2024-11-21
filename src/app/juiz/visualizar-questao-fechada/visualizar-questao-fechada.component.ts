import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../login-module/login.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import Alternativa from '../../model/aprendizagem/questoes/alternativa';
import { DomSanitizer } from '@angular/platform-browser';
import VisualizacaoQuestao from 'src/app/model/analytics/visualizacaoQuestao';
import PontuacaoQuestaoFechada from 'src/app/model/gamification/pontuacaoQuestaoFechada';
import Gamification from 'src/app/model/gamification/gamification';
import { GamificationFacade } from 'src/app/gamification/gamification.service';
import { Assunto } from 'src/app/model/aprendizagem/questoes/assunto';
import QuestaoFechada from 'src/app/model/aprendizagem/questoes/questaoFechada';
import { RespostaQuestaoFechada } from 'src/app/model/aprendizagem/questoes/respostaQuestaoFechada';
import { ChatbotService } from 'src/app/chatbot/chatbot.service';

@Component({
  selector: 'app-visualizar-questao-fechada',
  templateUrl: './visualizar-questao-fechada.component.html',
  styleUrls: ['./visualizar-questao-fechada.component.css'],
})
export class VisualizarQuestaoFechadaComponent implements OnInit {
  @Input()
  questao: QuestaoFechada;

  respostaQuestaoFechada: RespostaQuestaoFechada;
  mostrar;
  assunto;
  usuario;
  alternativaEscolhida;

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    private login: LoginService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private gamification: GamificationFacade,
    private chatbotService: ChatbotService,
  ) {
    
  }

  /* selecionarAlternativa(alternativa) {
    this.respostaQuestaoFechada.alternativa = alternativa;
  }  */

  gerarHtmlTextoComCodigo(questao: QuestaoFechada) {
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

  formatarHtml(questao){
    return this.sanitizer.bypassSecurityTrustHtml(questao.enunciado);
  }

  ngOnInit() {
    this.usuario = this.login.getUsuarioLogado();
    
    if (this.questao == null) {
      this.route.params.subscribe((params) => {
        QuestaoFechada.get(params['questaoId']).subscribe((questao) => {
          this.questao = questao as QuestaoFechada;
          this.respostaQuestaoFechada = new RespostaQuestaoFechada(null, this.usuario, new Alternativa(null, null, null), questao);
          RespostaQuestaoFechada.getRespostaQuestaoEstudante(this.questao).subscribe(
            (respostaUsuario: RespostaQuestaoFechada) => {
              if (respostaUsuario != null) {
                this.respostaQuestaoFechada = respostaUsuario;
                this.mostrar = true;
              }
            }
          );
        });
      });
    }
  }

  confirmar() {
    if (!this.questao.isRespostaValida(this.respostaQuestaoFechada)) {
      this.messageService.add({
        severity: 'info',
        summary: 'ops...',
        detail: 'É preciso selecionar uma alternativa!',
      });
    } else if (this.respostaQuestaoFechada.pk != undefined) {
      this.messageService.add({
        severity: 'warn',
        summary: 'ops...',
        detail: 'Só é possível responder uma vez!',
      });
    } else {
      this.responder();
    }
  }

  responder() {
    this.respostaQuestaoFechada.questao = this.questao;
    this.respostaQuestaoFechada.isRespostaCorreta = this.respostaQuestaoFechada.isCorreta();
    //this.respostaQuestaoFechada.alternativa.id = this.alternativaEscolhida;
    this.respostaQuestaoFechada.save().subscribe((resultado) => {
      this.respostaQuestaoFechada = resultado as RespostaQuestaoFechada;
      this.respostaQuestaoFechada.questao = this.questao;
      this.mostrar = true;
      if (this.respostaQuestaoFechada.isRespostaCorreta) {
        /* Gamification.aumentarPontuacao(this.login.getUsuarioLogado(), this.questao, new PontuacaoQuestaoFechada()); */
        this.gamification.aumentarPontuacao(
          this.login.getUsuarioLogado(),
          this.questao,
          new PontuacaoQuestaoFechada()
        );
        this.messageService.add({
          severity: 'success',
          summary: 'Parabéns!',
          detail: ' Você acertou essa questão!',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'ops...',
          detail: 'Você errou essa questao!',
        });
      }
    });
  }
}
