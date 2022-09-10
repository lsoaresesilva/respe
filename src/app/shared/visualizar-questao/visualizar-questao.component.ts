import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, MenuItem } from 'primeng/api';
import { QuestaoProgramacao } from '../../model/aprendizagem/questoes/questaoProgramacao';
import { LoginService } from '../../login-module/login.service';
import { Groups } from '../../model/experimento/groups';
import { DomSanitizer } from '@angular/platform-browser';
import {Assunto} from '../../model/aprendizagem/questoes/assunto';
@Component({
  selector: 'app-visualizar-questao',
  templateUrl: './visualizar-questao.component.html',
  styleUrls: ['./visualizar-questao.component.css'],
})
export class VisualizarQuestaoComponent implements OnInit {
  @Input()
  questao?;
  assunto;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private sanitizer: DomSanitizer
  ) {
    this.questao = new QuestaoProgramacao(null, null, null, null, null, [], [], '', null, []);
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['assuntoId'] != undefined && params['questaoId'] != undefined) {
        Assunto.get(params['assuntoId']).subscribe((assunto) => {
          this.assunto = assunto;
          if (
            assunto['questoesProgramacao'] != undefined &&
            assunto['questoesProgramacao'].length > 0
          ) {
            assunto['questoesProgramacao'].forEach((questao) => {
              if (questao.id == params['questaoId']) {
                this.questao = questao;
                if (this.questao.testsCases.length > 3) {
                  this.questao.testsCases.splice(3, 1);
                }
              }
            });
          }
        });
      } else {
        if (this.questao == undefined) {
          throw new Error(
            'Não é possível visualizar uma questão, pois não foram passados os identificadores de assunto e questão.'
          );
        }
      }
    });
  }

  abrirEditor(questao) {
    this.router.navigate([
      'geral/main',
      { outlets: { principal: ['editor', this.assunto.pk(), questao.id] } },
    ]);
  }

  responder(questao) {
    if (this.loginService.getUsuarioLogado().grupoExperimento == Groups.control) {
      this.router.navigate([
        'geral/main',
        { outlets: { principal: ['editor', this.assunto.pk(), questao.id] } },
      ]);
      return;
    }

    this.router.navigate([
      'geral/main',
      { outlets: { principal: ['self-instruction', this.assunto.pk(), questao.id] } },
    ]);
  }
  alterarQuestao(questao: QuestaoProgramacao) {
    if (questao != undefined) {
      this.router.navigate([
        'geral/main',
        { outlets: { principal: ['atualizacao-questao', questao.id] } },
      ]);
    }
  }

  apresentarSaida(saida) {
    if (Array.isArray(saida)) {
      return saida.join('<br />');
    } else {
      return saida;
    }
  }

  formatarHtml(questao){
    return this.sanitizer.bypassSecurityTrustHtml(questao.enunciado);
  }

  gerarHtmlTextoComCodigo(questao) {
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
}
