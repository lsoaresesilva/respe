import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { forkJoin } from 'rxjs';
import Analytics from 'src/app/model/analytics/analytics';
import { Assunto } from 'src/app/model/assunto';

@Component({
  selector: 'app-progesso-geral',
  templateUrl: './progesso-geral.component.html',
  styleUrls: ['./progesso-geral.component.css'],
})
export class ProgessoGeralComponent implements OnChanges {
  @Input()
  estudante;

  percentual;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    Analytics.calcularProgressoGeral(this.estudante).subscribe((percentual) => {
      this.percentual = percentual;
    });
  }
}
