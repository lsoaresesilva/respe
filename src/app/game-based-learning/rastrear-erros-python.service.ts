import { Injectable } from '@angular/core';
import OnPythonError from './editor/onPythonError';

@Injectable({
  providedIn: 'root',
})
export class RastrearErrosPythonService {
  observadores: OnPythonError[];

  constructor() {
    this.observadores = [];
  }

  receberNotificacao(instancia) {
    this.observadores.push(instancia);
  }

  notificar(error) {
    this.observadores.forEach((observador) => {
      observador.notification(error);
    });
  }
}
