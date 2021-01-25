import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import MensagemChat from '../model/mensagemChat';
import Usuario from '../model/usuario';
import * as io from 'socket.io-client';
import { LoginService } from '../login-module/login.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  socket;

  constructor(private login:LoginService) {
    
    this.receberMensagem();
  }

  iniciarConexao(sala){
    this.socket =  io.connect('http://localhost:3001', {query: {sala:sala, usuario:this.login.getUsuarioLogado().pk()}});
  }

  enviarMensagem(mensagem: MensagemChat) {
    if (mensagem != null) {
      return new Observable(observer => {
        this.socket.emit("enviarMensagem", { usuario: mensagem.estudante.nome, texto: mensagem.texto });
        observer.next();
        observer.complete();

      });
    }

  }

  receberMensagem() {

    return new Observable((observer) => {
      this.socket.on('mensagemRecebida', (message) => {
          observer.next(message);
      });
});

  }

  enviarKeyEditor(estudante, codigo){
    this.socket.emit("editorKeyEvent", { usuario: estudante.stringfy(), codigo: codigo });
  }

  receberCodigoEditor(callback){
    this.socket.on('editorCodigo', (data) => {
      callback(data);
      /* observer.complete(); */
    });
    
  }
}
