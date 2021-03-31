import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import MensagemChat from '../model/chat/mensagemChat';
import Usuario from '../model/usuario';
import * as io from 'socket.io-client';
import { LoginService } from '../login-module/login.service';
import Sharedb from 'sharedb/lib/client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  sala;
  socketChat;

  estudantesOnline;

  observerCodigo: Subject<any>;
  observerChat: Subject<any>;

  constructor(private login: LoginService) {
    this.observerChat = new Subject();
    this.estudantesOnline = new BehaviorSubject([]);
  }

  receberMensagens() {
    this.socketChat.on('mensagemRecebida', (message) => {
      this.observerChat.next(JSON.parse(message));
    });
  }



  iniciar(sala) {
    this.sala = sala;
    let usuarioLogado = this.login.getUsuarioLogado();
    return new Observable((observer) => {
      /**
       * Socket para a sincronização do chat
       */
      this.socketChat = io.connect(environment.URL_CHAT, {
        query: { sala: sala, estudanteId: usuarioLogado.pk() },
      });

      this.socketChat.on('conexao', () => {
        observer.next(true);
        observer.complete();
      });

      this.socketChat.on('conexaoAluno', (estudantesConectados) => {

        this.estudantesOnline.next(estudantesConectados);
      });

      this.socketChat.on('logout', (message) => {
        // TODO: implementar o logout que remove o estudante da lista de estudantes logados.
      });
    });

    /**
     * Socket para a sincronização do editor
     */
    /* this.socket = new WebSocket(environment.URL_SERVIDOR_DOC);
    let _this = this;
    this.socket.onopen = function (event) {
      // Dados para abertura da conexão
      let data = JSON.stringify({
        sala: sala,
        estudante: usuarioLogado.stringfiy(),
        tipo: 'ACESSO',
      });
      _this.socket.send(data);

      _this.socket.onmessage = function (event) {
        let dadoRecebido = JSON.parse(event.data);

        if (dadoRecebido.tipo == 'CONEXAO') {
          if (dadoRecebido.status == 'OK') {
            _this.connection = new Sharedb.Connection(_this.socket);

            _this.connection.on('receive', function (request) {
              let data = request.data;
              if (data.tipo == 'CHAT') {
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
      };
    }; */
  }

  enviarMensagem(mensagem: MensagemChat) {
    if (mensagem != null) {
      return new Observable((observer) => {
        let data = JSON.stringify({
          sala: this.sala,
          estudante: mensagem.estudante.nome,
          texto: mensagem.texto,
          tipo: 'CHAT',
        });

        this.socketChat.emit('enviarMensagem', data);
        mensagem.save().subscribe(() => {
          console.log('Salvou');
        });
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
