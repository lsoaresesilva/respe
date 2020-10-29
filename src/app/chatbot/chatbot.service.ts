import { Injectable } from '@angular/core';
import Observador from '../model/chatbot/observador';
import Observavel from '../model/chatbot/observavel';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService implements Observavel {
  observadores: Observador[];

  constructor() {
    this.observadores = [];
  }

  attach(observador: Observador) {
    this.observadores.push(observador);
  }

  notify() {
    this.observadores.forEach((observador) => {
      observador.receberNotificacao();
    });
  }
}
