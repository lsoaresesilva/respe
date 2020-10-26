import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-total-execucoes',
  templateUrl: './total-execucoes.component.html',
  styleUrls: ['./total-execucoes.component.css'],
})
export class TotalExecucoesComponent implements OnInit {
  @Input()
  totalExecucoes;

  constructor() {}

  ngOnInit(): void {}
}
