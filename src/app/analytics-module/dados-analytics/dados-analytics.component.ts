import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { LoginService } from 'src/app/login-module/login.service';
import Analytics from 'src/app/model/analytics/analytics';

@Component({
  selector: 'dados-analytics',
  templateUrl: './dados-analytics.component.html',
  styleUrls: ['./dados-analytics.component.css'],
})
export class DadosAnalyticsComponent implements OnInit, OnChanges {
  @Input()
  analytics: Analytics;

  constructor(private login: LoginService) {}

  ngOnInit(): void {
    let x = this.analytics;
  }

  ngOnChanges(): void {

  }
}
