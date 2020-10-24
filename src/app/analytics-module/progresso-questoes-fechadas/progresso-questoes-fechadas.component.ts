import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import Analytics from 'src/app/model/analytics/analytics';

@Component({
  selector: 'app-progresso-questoes-fechadas',
  templateUrl: './progresso-questoes-fechadas.component.html',
  styleUrls: ['./progresso-questoes-fechadas.component.css'],
})
export class ProgressoQuestoesFechadasComponent implements OnChanges {
  @Input()
  estudante;

  percentual;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    Analytics.calcularProgressoQuestoesFechadas(this.estudante).subscribe((percentual) => {
      this.percentual = percentual;
    });
  }
}
