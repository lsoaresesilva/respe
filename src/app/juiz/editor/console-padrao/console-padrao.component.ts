import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-console-padrao',
  templateUrl: './console-padrao.component.html',
  styleUrls: ['./console-padrao.component.css']
})
export class ConsolePadraoComponent implements OnInit {

  @Input()
  submissao;

  constructor() { }

  ngOnInit(): void {
  }

}
