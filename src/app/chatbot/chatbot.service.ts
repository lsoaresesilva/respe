import { EventEmitter, Injectable } from '@angular/core';
import Mensagem from '../model/chatbot/mensagem';
import Observador from '../model/chatbot/observador';
import Observavel from '../model/chatbot/observavel';
import Postagem from '../model/cscl/postagem';
import MensagemSuporteMonitor from '../model/mensagemSuporteMonitor';
import { QuestaoProgramacao } from '../model/questoes/questaoProgramacao';
import Usuario from '../model/usuario';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  mensagemUpdate;

  mensagens: any[];
  usuario;
  saudacao = false;
  pedidoAjuda = false;
  motivacional = [];

  constructor() {
    this.reinicializar();
    this.usuario = new Usuario(null, null, null, null, null, null);
    this.usuario.nome = 'Davi';
    this.mensagemUpdate = new EventEmitter();
  }

  enviarMensagem(mensagem: Mensagem | Mensagem[]) {
    this.reinicializar();
    this.apresentarSaudacao();
    if(Array.isArray(mensagem)){
      this.mensagens = mensagem;
    }else{
      this.mensagens.push(mensagem);
    }
    /* if (Array.isArray(mensagem)) {
      mensagem.forEach((msg) => {
        this.mensagens.push(new Mensagem(msg, this.usuario));
      });
    } else {
      this.mensagens.push(mensagem);
    } */
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
    
  }

  private apresentarSaudacao() {
    if (!this.saudacao) {
      this.saudacao = true;
      this.enviarMensagem(
        MensagemSuporteMonitor.getSaudacao()
      );
    }
  }
}
