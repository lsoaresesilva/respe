import { EventEmitter, Injectable } from '@angular/core';
import Mensagem from '../model/chatbot/mensagem';
import Observador from '../model/chatbot/observador';
import Observavel from '../model/chatbot/observavel';
import MensagemSuporteMonitor from '../model/mensagemSuporteMonitor';
import Usuario from '../model/usuario';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  mensagemUpdate;

  mensagens: any[];
  usuario;
  saudacao = false;
  motivacional = [];

  constructor() {
    this.reinicializar();
    this.usuario = new Usuario(null, null, null, null, null);
    this.usuario.nome = 'Davi';
    this.mensagemUpdate = new EventEmitter();
  }

  enviarMensagem(mensagem: Mensagem | any[]) {
    this.reinicializar();
    this.apresentarSaudacao();
    if (Array.isArray(mensagem)) {
      mensagem.forEach((msg) => {
        this.mensagens.push(new Mensagem(msg, this.usuario));
      });
    } else {
      this.mensagens.push(mensagem);
    }
    this.mensagemUpdate.emit();
  }

  receberMensagem(mensagem) {
    this.mensagens.push(mensagem);
    this.analisarMensagem(mensagem);
  }

  reinicializar() {
    this.mensagens = [];
  }

  analisarMensagem(mensagem) {
    if (mensagem.toLowerCase() === 'sim') {
    }
  }

  private apresentarSaudacao() {
    if (!this.saudacao) {
      this.saudacao = true;
      this.enviarMensagem(
        new Mensagem(MensagemSuporteMonitor.getMensagem('saudacao').mensagens[0], this.usuario)
      );
    }
  }
}
