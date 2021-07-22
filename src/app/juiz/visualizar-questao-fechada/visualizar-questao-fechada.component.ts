import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../login-module/login.service';
import { RespostaQuestaoFechada } from 'src/app/model/respostaQuestaoFechada';
import { MessageService, ConfirmationService } from 'primeng/api';
import Alternativa from 'src/app/model/alternativa';
import { Planejamento } from 'src/app/model/planejamento';
import { DomSanitizer } from '@angular/platform-browser';
import VisualizacaoQuestao from 'src/app/model/analytics/visualizacaoQuestao';
import PontuacaoQuestaoFechada from 'src/app/model/gamification/pontuacaoQuestaoFechada';
import Gamification from 'src/app/model/gamification/gamification';
import { GamificationFacade } from 'src/app/gamification/gamification.service';
import QuestaoFechada from 'src/app/model/sistema-aprendizagem/questoes/questaoFechada';
import { Assunto } from 'src/app/model/sistema-aprendizagem/assunto';

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

  alternativaEscolhida;

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    private login: LoginService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private gamification: GamificationFacade
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
    if (this.questao == null) {
      this.route.params.subscribe((params) => {
        if (params['assuntoId'] != undefined && params['questaoId'] != undefined) {
          this.respostaQuestaoFechada = new RespostaQuestaoFechada(
            null,
            this.login.getUsuarioLogado(),
            new Alternativa(null, null, null),
            this.questao
          );
          this.mostrar = false;

          Assunto.get(params['assuntoId']).subscribe((assunto) => {
            this.assunto = assunto;
            const usuario = this.login.getUsuarioLogado();
            if (
              assunto['questoesFechadas'] != undefined &&
              assunto['questoesFechadas'].length > 0
            ) {
              this.questao = assunto['getQuestaoFechadaById'](params['questaoId']);

              RespostaQuestaoFechada.getRespostaQuestaoEstudante(this.questao, usuario).subscribe(
                (respostaUsuario: RespostaQuestaoFechada) => {
                  if (respostaUsuario != null) {
                    this.respostaQuestaoFechada = respostaUsuario;
                    this.mostrar = true;
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
  }

  confirmar() {
    if (!this.questao.isRespostaValida(this.respostaQuestaoFechada)) {
      this.messageService.add({
        severity: 'info',
        summary: 'ops...',
        detail: 'É preciso selecionar uma alternativa!',
      });
    } else if (this.respostaQuestaoFechada.pk() != undefined) {
      this.messageService.add({
        severity: 'warn',
        summary: 'ops...',
        detail: 'Só é possível responder uma vez!',
      });
    } else {
      this.confirmationService.confirm({
        message: 'Você não poderá responder essa questão novamente.',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => {
          this.responder();
        },
      });
    }
  }

  responder() {
    this.respostaQuestaoFechada.questao = this.questao;
    //this.respostaQuestaoFechada.alternativa.id = this.alternativaEscolhida;
    this.respostaQuestaoFechada.save().subscribe((resultado) => {
      this.mostrar = true;
      if (this.respostaQuestaoFechada.isCorreta()) {
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
