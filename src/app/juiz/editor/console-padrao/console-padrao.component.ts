import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TerminalService } from 'primeng/terminal';
import ConsoleEditor from 'src/app/model/consoleEditor';

@Component({
  selector: 'app-console-padrao',
  templateUrl: './console-padrao.component.html',
  styleUrls: ['./console-padrao.component.css'],
  providers: [TerminalService]
})
export class ConsolePadraoComponent implements OnChanges {

  @Input()
  console:ConsoleEditor;

  saidaOriginal;

  constructor(private terminalService: TerminalService) {
    this.saidaOriginal = "";
   }

  ngOnChanges(changes: SimpleChanges): void {
  /*   if(this.submissao != null && this.submissao.saida != null){
      this.terminalService.sendResponse(this.submissao.saida);
    } */
  }

  visualizarSaidaOriginal(){
    this.saidaOriginal = this.console.tracebackOriginal;
  }

  

}
