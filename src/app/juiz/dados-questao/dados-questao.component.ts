import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import Submissao from 'src/app/model/submissao';
import { LoginService } from 'src/app/login-module/login.service';
import { ApresentacaoService } from 'src/app/geral-module/apresentacao.service';
import { DomSanitizer } from '@angular/platform-browser';
import { QuestaoProgramacao } from 'src/app/model/aprendizagem/questoes/questaoProgramacao';

@Component({
  selector: 'dados-questao',
  templateUrl: './dados-questao.component.html',
  styleUrls: ['./dados-questao.component.css'],
})
export class DadosQuestaoComponent implements AfterViewInit {
  @Input()
  questao?: QuestaoProgramacao;



  constructor(
    private login: LoginService,
    private apresentacao: ApresentacaoService,
    private sanitizer: DomSanitizer
  ) {}



  ngAfterViewInit() {
    this.apresentacao.apresentarEditor(this.login.getUsuarioLogado());
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

  formatarHtml(questao){
    return this.sanitizer.bypassSecurityTrustHtml(questao.enunciado);
  }
}
