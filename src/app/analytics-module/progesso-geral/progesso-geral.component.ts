import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-progesso-geral',
  templateUrl: './progesso-geral.component.html',
  styleUrls: ['./progesso-geral.component.css'],
})
export class ProgessoGeralComponent {
  @Input()
  progresso;

  constructor() {}
}
