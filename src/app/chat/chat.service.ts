import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import MensagemChat from '../model/cscl/chat/mensagemChat';
import Usuario from '../model/usuario';
import * as io from 'socket.io-client';
import { LoginService } from '../login-module/login.service';
import Sharedb from 'sharedb/lib/client';
import { environment } from 'src/environments/environment';
import Grupo from '../model/cscl/grupo';
import { ChatAdapter, ChatParticipantStatus, Group, IChatGroupAdapter, IChatParticipant, Message, MessageType, ParticipantResponse } from 'ng-chat';


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

  groupCreated(group: Group): void {
    console.log("Grupo criado");
  }



  /* public onMessageReceived(participant: IChatParticipant, message: Message): void{


  }

  public onFriendsListChanged(participantsResponse: ParticipantResponse[]): void{

  } */



  receberMensagens() {
    /* this.socketChat.on('mensagemRecebida', (message) => {
      this.observerChat.next(JSON.parse(message));
    }); */


  }

  /* carregarMensagens(grupo: Grupo) {
    MensagemChat.carregarMensagens(grupo).subscribe((mensagens) => {
      mensagens.forEach((mensagem) => {
        this.observerChat.next(mensagem);
      });
    });
  } */


  enviarMensagem(mensagem: MensagemChat) {
    /* if (mensagem != null) {
      let novaMensagem = new MensagemChat(
        null,
        mensagem.estudante,
        mensagem.texto,
        mensagem.grupo,
        mensagem.atividadeGrupo
      );
      novaMensagem.save().subscribe(() => {
        let x = 2;
      });

      return new Observable((observer) => {
        let data = JSON.stringify({
          sala: this.sala,
          estudante: mensagem.estudante.nome,
          texto: mensagem.texto,
          tipo: 'CHAT',
        });

        this.socketChat.emit('enviarMensagem', data);

        observer.next();
        observer.complete();
      });
    } */
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
