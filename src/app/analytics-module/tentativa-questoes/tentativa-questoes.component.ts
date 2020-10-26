import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tentativa-questoes',
  templateUrl: './tentativa-questoes.component.html',
  styleUrls: ['./tentativa-questoes.component.css'],
})
export class TentativaQuestoesComponent implements OnInit {
  @Input()
  tentativasQuestoes;

  constructor() {}

  ngOnInit(): void {}
}
