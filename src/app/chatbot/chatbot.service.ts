import { Injectable } from '@angular/core';
import Mensagem from '../model/chatbot/mensagem';
import Observador from '../model/chatbot/observador';
import Observavel from '../model/chatbot/observavel';
import MensagemSuporteMonitor from '../model/mensagemSuporteMonitor';
import Usuario from '../model/usuario';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  mensagens: any[];
  usuario;
  saudacao = false;

  constructor() {
    this.mensagens = [];
    this.usuario = new Usuario(null, null, null, null, null);
    this.usuario.nome = 'Davi';
  }

  enviarMensagem(mensagem) {
    this.apresentarSaudacao();
    this.mensagens.push(mensagem);
  }

  receberMensagem(mensagem) {
    this.mensagens.push(mensagem);
    this.analisarMensagem(mensagem);
  }

  analisarMensagem(mensagem) {}

  private apresentarSaudacao() {
    if (!this.saudacao) {
      this.saudacao = true;
      this.enviarMensagem(
        new Mensagem(MensagemSuporteMonitor.getMensagem('saudacao'), this.usuario)
      );
    }
  }
}
