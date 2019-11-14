import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-responder-questao-programacao-lite',
  templateUrl: './responder-questao-programacao-lite.component.html',
  styleUrls: ['./responder-questao-programacao-lite.component.css']
})
export class ResponderQuestaoProgramacaoLiteComponent implements OnInit {

  @Input()
  questao;
  @Input()
  assunto;
  submissao;

  constructor() {


  }

  ngOnInit() {

  }

  onSubmit(submissao){
    this.submissao = submissao;
  }

  onError(submissao){
    this.submissao = submissao;
  }

}
