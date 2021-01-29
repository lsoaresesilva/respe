import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import MensagemChat from '../model/mensagemChat';
import Usuario from '../model/usuario';
import * as io from 'socket.io-client';
import { LoginService } from '../login-module/login.service';
import Edicao from '../model/edicao';
import Sharedb from 'sharedb/lib/client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  socket;
  connection;
  doc;

  constructor(private login:LoginService) {
    
    this.receberMensagem();
  }

  iniciarConexao(sala, callback){
    let usuarioLogado = this.login.getUsuarioLogado();
    //this.socket =  io.connect('http://localhost:3001', {query: {sala:sala, usuario:{id:usuarioLogado.pk(), nome:usuarioLogado.nome}}});
    this.socket = new WebSocket('ws://127.0.0.1:8080');
    this.connection = new Sharedb.Connection(this.socket);
    this.doc = this.connection.get('documents', 'algoritmo');
    let _this = this;
    this.doc.subscribe(function (err) {
      if (err) throw err;
      callback(_this.doc);

      _this.doc.on('op', function (op, source) {
        
        callback(_this.doc)
      });
    });
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

  enviarKeyEditor(edicao:Edicao){
    this.socket.emit("editorKeyEvent", edicao.stringfy());
  }

  receberCodigoEditor(callback){
    this.socket.on('editorCodigo', (data) => {
      callback(data);
      /* observer.complete(); */
    });
    
  }
}
