import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { LabelCategoriasErros } from 'src/app/model/errors/enum/labelCategoriasErro';

import { getLabelPorCategoriaNumero } from 'src/app/model/errors/enum/labelCategoriasErro';
import { EscapeHtmlPipe } from 'src/app/pipes/keep-html.pipe';
import ConsoleEditor from 'src/app/model/consoleEditor';
import Submissao from 'src/app/model/submissao';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css'],
  providers: [EscapeHtmlPipe],
})
export class ConsoleComponent implements OnChanges {
  @Input()
  submissao: Submissao;

  @Input()
  consoleEditor: ConsoleEditor;

  constructor(private sanitizer: DomSanitizer) {}
  ngOnChanges(changes: SimpleChanges): void {
    let x = this.submissao;
    let y = x;
  }

  getLabelCategoriaErro(categoria) {
    return getLabelPorCategoriaNumero(categoria);
  }

  destacarDiferencasSaidas(testCase, saidaReal){ 
    
    let    text = '';
    let saidaEsperada = testCase.saida;
    let oldText = saidaEsperada;
    text += "<span style='font-weight:bold'>Saída real: </span>"
    saidaReal.split('').forEach(function(val, i){
      if (val != oldText.charAt(i))
        text += "<span class='highlight'>"+val+"</span>";  
      else
        text += val;            
    });
    text += "<br><span style='font-weight:bold'>Saída esperada: </span><span>"+saidaEsperada+"</span>"
    return this.sanitizer.bypassSecurityTrustHtml(text);
  }
  
}
