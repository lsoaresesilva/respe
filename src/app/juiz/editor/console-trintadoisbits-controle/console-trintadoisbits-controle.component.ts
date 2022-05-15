import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import ConsoleEditor from 'src/app/model/consoleEditor';
import Submissao from 'src/app/model/submissao';
import { EscapeHtmlPipe } from 'src/app/pipes/keep-html.pipe';

@Component({
  selector: 'app-console-trintadoisbits-controle',
  templateUrl: './console-trintadoisbits-controle.component.html',
  styleUrls: ['./console-trintadoisbits-controle.component.css'],
  providers: [EscapeHtmlPipe],
})
export class ConsoleTrintadoisbitsControleComponent implements OnChanges {

  @Input()
  submissao: Submissao;

  @Input()
  consoleEditor: ConsoleEditor;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnChanges(): void {
    let x = this.submissao;
    let y = this.consoleEditor;
  }

  destacarDiferencasSaidas(testCase, saidaReal, pos) {
    let text = '';
    let saidaEsperada = testCase.saida;
    let oldText = saidaEsperada;
    if (!Array.isArray(saidaEsperada)) {
      text += "<span style='font-weight:bold'>Saída real: </span>";
      saidaReal.split('').forEach(function (val, i) {
        if (val != oldText.charAt(i)) text += "<span class='highlight'>" + val + '</span>';
        else text += val;
      });
      text +=
        "<br><span style='font-weight:bold'>Saída esperada: </span><span>" +
        saidaEsperada +
        '</span>';
    } else {
      text += "<span style='font-weight:bold'>Saída real:"+saidaReal+"</span>";
    }

    return this.sanitizer.bypassSecurityTrustHtml(text);
  }

}
