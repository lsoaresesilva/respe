import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { LoginService } from 'src/app/login-module/login.service';
import Analytics from 'src/app/model/analytics/analytics';

@Component({
  selector: 'app-dados-estudante',
  templateUrl: './dados-estudante.component.html',
  styleUrls: ['./dados-estudante.component.css'],
})
export class DadosEstudanteComponent implements OnChanges {
  @Input()
  estudante;

  analytics$: Analytics;

  constructor(private login: LoginService) {}

  ngOnChanges(): void {
    if (this.estudante != null && this.estudante.id != null) {
      Analytics.init(this.estudante).subscribe((analytics) => {
        this.analytics$ = analytics;
      });
    }
  }
}
