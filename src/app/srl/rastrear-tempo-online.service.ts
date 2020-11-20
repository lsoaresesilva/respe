import { Injectable } from '@angular/core';

import * as TimeMe from 'timeme.js';
import { LoginService } from '../login-module/login.service';
import TempoOnline from '../model/analytics/tempoOnline';
import { logging } from 'protractor';

@Injectable({
  providedIn: 'root',
})
export class RastrearTempoOnlineService {
  usuarioLogado;

  constructor() {
    this.gerenciarTimer();
    this.iniciarTimer(this.usuarioLogado);
  }

  iniciarTimer(usuarioLogado) {
    console.log('iniciou');
    if (usuarioLogado != null) {
      this.usuarioLogado = usuarioLogado;
      TimeMe.initialize({
        currentPageName: '32bits', // current page
        idleTimeoutInSeconds: 120, // seconds
      });
    }
  }

  private gerenciarTimer() {
    const _this = this;

    TimeMe.callWhenUserLeaves(function () {
      console.log('The user is not currently viewing the page!');
      console.log(TimeMe.getTimeOnPageInSeconds('32bits'));
      const tempoConectado = new TempoOnline(
        null,
        TimeMe.getTimeOnPageInSeconds('32bits'),
        _this.usuarioLogado
      );
      tempoConectado.save().subscribe(() => {});
    });

    TimeMe.callWhenUserReturns(function () {
      console.log('The user has come back!');
      TimeMe.resetRecordedPageTime('32bits');
    });
  }
}
