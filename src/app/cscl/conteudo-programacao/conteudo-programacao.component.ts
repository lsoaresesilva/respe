import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-conteudo-programacao',
  templateUrl: './conteudo-programacao.component.html',
  styleUrls: ['./conteudo-programacao.component.css']
})
export class ConteudoProgramacaoComponent implements OnInit {

  @Input("conteudoProgramacao")
  conteudo;

  constructor() { }

  ngOnInit() {
  }

}
