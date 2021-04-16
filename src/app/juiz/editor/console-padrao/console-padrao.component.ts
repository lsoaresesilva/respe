import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TerminalService } from 'primeng/terminal';

@Component({
  selector: 'app-console-padrao',
  templateUrl: './console-padrao.component.html',
  styleUrls: ['./console-padrao.component.css'],
  providers: [TerminalService]
})
export class ConsolePadraoComponent implements OnChanges {

  @Input()
  submissao;

  constructor(private terminalService: TerminalService) { }

  ngOnChanges(changes: SimpleChanges): void {
  /*   if(this.submissao != null && this.submissao.saida != null){
      this.terminalService.sendResponse(this.submissao.saida);
    } */
  }

  

}
