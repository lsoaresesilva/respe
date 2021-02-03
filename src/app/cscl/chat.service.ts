import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Subject } from 'rxjs';
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

  sala;
  socket:WebSocket;
  socketChat;
  connection;
  doc;

  observerCodigo:Subject<any>;
  observerChat:Subject<any>;

  constructor(private login:LoginService) {
    this.observerCodigo = new Subject();
    this.observerChat = new Subject();
    //this.receberMensagem();
  }

  iniciarConexao(sala){
    this.sala = sala;
    let usuarioLogado = this.login.getUsuarioLogado();
    this.socketChat =  io.connect('http://localhost:3001', {query: {sala:sala, usuario:{id:usuarioLogado.pk(), nome:usuarioLogado.nome}}});

    this.socketChat.on('mensagemRecebida', (message) => {
      this.observerChat.next(JSON.parse(message));
  });


    this.socket = new WebSocket('ws://127.0.0.1:8080');
    let _this = this;
    this.socket.onopen = function(event) {

      // Dados para abertura da conexão
      let data = JSON.stringify({sala:sala, estudante:usuarioLogado.stringfiy(), tipo:"ACESSO"});
      _this.socket.send(data);

      _this.socket.onmessage = function (event) {

        let dadoRecebido = JSON.parse(event.data);

        if(dadoRecebido.tipo == "CONEXAO"){
          
          if(dadoRecebido.status == "OK"){
            _this.connection = new Sharedb.Connection(_this.socket);

            _this.connection.on('receive', function(request) {
              let data = request.data;
              if (data.tipo == "CHAT") {
                request.data = null;
                _this.observerChat.next(data);
              }
            });


            _this.doc = _this.connection.get('documents', sala);

            _this.doc.subscribe(function (err) {
              if (err) throw err;
  
              
              // Primeiro callback quando o documento é recebido do servidor
              _this.observerCodigo.next(_this.doc);
              

              //callback(_this.doc);
        
              _this.doc.on('op', function (op, source) {
                
                // Chamado quando o documento é atualizado
                _this.observerCodigo.next(_this.doc);
                //callback(_this.doc)
              });
            });

          }

        }      
      }
    }
  }
  
  /* 

  iniciarConexao(sala, callback){
    let usuarioLogado = this.login.getUsuarioLogado();
    //this.socket =  io.connect('http://localhost:3001', {query: {sala:sala, usuario:{id:usuarioLogado.pk(), nome:usuarioLogado.nome}}});
    this.socket = new WebSocket('ws://127.0.0.1:8080');
    let _this = this;
    this.socket.onopen = function(event) {
      let data = JSON.stringify({sala:sala})
      _this.socket.send(data);

      _this.socket.onmessage = function (event) {
        let data = JSON.parse(event.data)
        if(data.status == "OK"){
          _this.connection = new Sharedb.Connection(_this.socket);
          _this.doc = _this.connection.get('documents', sala);
          _this.doc.subscribe(function (err) {
            if (err) throw err;
            callback(_this.doc);
      
            _this.doc.on('op', function (op, source) {
              
              callback(_this.doc)
            });
          });
        }
        
      }

      
    };
    
    

    
  } */

   enviarMensagem(mensagem: MensagemChat) {
    if (mensagem != null) {
      
   return new Observable(observer => {
        let data = JSON.stringify({ sala:this.sala, estudante: mensagem.estudante.nome, texto: mensagem.texto, tipo:"CHAT" });

        this.socketChat.emit("enviarMensagem",data);
        //this.socket.send(data);
        observer.next();
        observer.complete();

      });
    }

  }


  /*enviarKeyEditor(edicao:Edicao){
    this.socket.emit("editorKeyEvent", edicao.stringfy());
  }

  receberCodigoEditor(callback){
    this.socket.on('editorCodigo', (data) => {
      callback(data);
      
    });
    
  } */
}
