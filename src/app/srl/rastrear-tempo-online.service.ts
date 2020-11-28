import { Injectable } from '@angular/core';

import * as TimeMe from 'timeme.js';
import { LoginService } from '../login-module/login.service';
import TempoOnline from '../model/analytics/tempoOnline';
import { logging } from 'protractor';
import Usuario from '../model/usuario';
import { PerfilUsuario } from '../model/enums/perfilUsuario';

@Injectable({
  providedIn: 'root',
})
export class RastrearTempoOnlineService {
  usuarioLogado;

  constructor() {
    this.gerenciarTimer();
    this.iniciarTimer(this.usuarioLogado);
  }

  iniciarTimer(usuarioLogado: Usuario) {
    if (usuarioLogado != null && usuarioLogado.perfil === PerfilUsuario.estudante) {
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
      const tempoConectado = new TempoOnline(
        null,
        TimeMe.getTimeOnPageInSeconds('32bits'),
        _this.usuarioLogado
      );
      tempoConectado.save().subscribe(() => {});
    });

    TimeMe.callWhenUserReturns(function () {
      TimeMe.resetRecordedPageTime('32bits');
    });
  }
}
