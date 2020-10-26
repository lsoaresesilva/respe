import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-percentual-visualizacao-questoes',
  templateUrl: './percentual-visualizacao-questoes.component.html',
  styleUrls: ['./percentual-visualizacao-questoes.component.css'],
})
export class PercentualVisualizacaoQuestoesComponent {
  @Input()
  progresso;

  constructor() {}
}
