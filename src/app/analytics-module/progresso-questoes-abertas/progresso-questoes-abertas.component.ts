import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import Analytics from 'src/app/model/analytics/analytics';

@Component({
  selector: 'app-progresso-questoes-abertas',
  templateUrl: './progresso-questoes-abertas.component.html',
  styleUrls: ['./progresso-questoes-abertas.component.css'],
})
export class ProgressoQuestoesAbertasComponent implements OnChanges {
  @Input()
  estudante;

  percentual;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    Analytics.calcularProgressoQuestoesAbertas(this.estudante).subscribe((percentual) => {
      this.percentual = percentual;
    });
  }
}
