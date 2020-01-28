import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent{

  @Input()
  submissao;

  constructor() { }

  /*apresentarErros(){
    if (this.submissao != null && this.submissao.erros != undefined && this.submissao.erros.length > 0) {
      this.submissao.erros.forEach(erro => {
        this.mensagem += erro.mensagem + "<br>";
        
      });
    }
  }*/

}
