import { Injectable } from '@angular/core';

import * as TimeMe from 'timeme.js';
import { LoginService } from '../login-module/login.service';
import TempoOnline from '../model/tempoOnline';
import { logging } from 'protractor';
import Usuario from '../../../../agendamentosaudegaranhuns/src/app/modelos/usuario';

@Injectable({
  providedIn: 'root',
})
export class RastrearTempoOnlineService {
  usuarioLogado;

  constructor() {
    this.gerenciarTimer();
  }

  iniciarTimer(usuarioLogado) {
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
      _this.iniciarTimer(_this.usuarioLogado);
    });
  }
}
