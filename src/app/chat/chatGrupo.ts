import {
  ChatAdapter,
  ChatParticipantStatus,
  ChatParticipantType,
  Group,
  IChatGroupAdapter,
  IChatParticipant,
  Message,
  MessageType,
  ParticipantResponse,
} from 'ng-chat';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import ChatGrupo from '../model/cscl/chat/chatGrupo';
import MensagemChat from '../model/cscl/chat/mensagemChat';
import Grupo from '../model/cscl/grupo';
import Query from '../model/firestore/query';
import Usuario from '../model/usuario';
import { Util } from '../model/util';

export default class ChatGrupoAdapter extends ChatAdapter implements IChatGroupAdapter {

  estudante;
  mensagens:MensagemChat[];
  grupoAtividade:Grupo;
  grupoChat:Group;
  //chatGrupo;

  constructor(grupo:Grupo) {
    super();
    this.grupoAtividade = grupo;
    this.mensagens = [];
  }

  public static mockedParticipants: IChatParticipant[] = [
    {
      participantType: ChatParticipantType.User,
      id: 1,
      displayName: 'Arya Stark',
      avatar: 'https://66.media.tumblr.com/avatar_9dd9bb497b75_128.pnj',
      status: ChatParticipantStatus.Online,
    },
    {
      participantType: ChatParticipantType.User,
      id: 2,
      displayName: 'Cersei Lannister',
      avatar: null,
      status: ChatParticipantStatus.Online,
    },
    {
      participantType: ChatParticipantType.User,
      id: 3,
      displayName: 'Daenerys Targaryen',
      avatar: 'https://68.media.tumblr.com/avatar_d28d7149f567_128.png',
      status: ChatParticipantStatus.Busy,
    },
    {
      participantType: ChatParticipantType.User,
      id: 4,
      displayName: 'Eddard Stark',
      avatar: 'https://pbs.twimg.com/profile_images/600707945911844864/MNogF757_400x400.jpg',
      status: ChatParticipantStatus.Offline,
    },
    {
      participantType: ChatParticipantType.User,
      id: 5,
      displayName: 'Hodor',
      avatar:
        'https://pbs.twimg.com/profile_images/378800000449071678/27f2e27edd119a7133110f8635f2c130.jpeg',
      status: ChatParticipantStatus.Offline,
    },
    {
      participantType: ChatParticipantType.User,
      id: 6,
      displayName: 'Jaime Lannister',
      avatar:
        'https://pbs.twimg.com/profile_images/378800000243930208/4fa8efadb63777ead29046d822606a57.jpeg',
      status: ChatParticipantStatus.Busy,
    },
    {
      participantType: ChatParticipantType.User,
      id: 7,
      displayName: 'John Snow',
      avatar:
        'https://pbs.twimg.com/profile_images/3456602315/aad436e6fab77ef4098c7a5b86cac8e3.jpeg',
      status: ChatParticipantStatus.Busy,
    },
    {
      participantType: ChatParticipantType.User,
      id: 8,
      displayName: "Lorde Petyr 'Littlefinger' Baelish",
      avatar: 'http://68.media.tumblr.com/avatar_ba75cbb26da7_128.png',
      status: ChatParticipantStatus.Offline,
    },
    {
      participantType: ChatParticipantType.User,
      id: 9,
      displayName: 'Sansa Stark',
      avatar: 'http://pm1.narvii.com/6201/dfe7ad75cd32130a5c844d58315cbca02fe5b804_128.jpg',
      status: ChatParticipantStatus.Online,
    },
    {
      participantType: ChatParticipantType.User,
      id: 10,
      displayName: 'Theon Greyjoy',
      avatar:
        'https://thumbnail.myheritageimages.com/502/323/78502323/000/000114_884889c3n33qfe004v5024_C_64x64C.jpg',
      status: ChatParticipantStatus.Away,
    },
  ];

  desconectar(estudante){
    ChatGrupo.getByQuery(new Query("grupoId", "==", this.grupoAtividade.id)).subscribe((chatGrupo) => {
      if (chatGrupo != null) {
          if(chatGrupo.isEstudanteConectado(estudante)){
              chatGrupo.desconectarEstudante(estudante);

              chatGrupo.save().subscribe(() => {

            })
          }
        }
      });
  }


  iniciar(estudante: Usuario): Observable<Group> {
    this.estudante = estudante;

    let _this = this;

    return new Observable((observer) => {

      let callback = new BehaviorSubject<any>(null);

      callback.subscribe((chatGrupo) => {
        if (chatGrupo != null) {

          let mensagem = chatGrupo.mensagens[chatGrupo.mensagens.length - 1] as MensagemChat;

          if(mensagem != null){
            if(mensagem.estudante.nome != _this.estudante.nome){
              let usuario = new Usuario(
                mensagem.estudante.id,
                null,
                null,
                null,
                null,
                mensagem.estudante.nome
              );

              let m = new Message();
              m.type = MessageType.Text;
              m.message = mensagem.texto;
              m.fromId = mensagem.estudante.id;
              m.toId = _this.grupoAtividade.id;
              m.dateSent = Util.firestoreDateToDate(mensagem.data)

              _this.onMessageReceived(_this.grupoChat, m);
            }
          }


          _this.listFriends().subscribe((response) => {
            _this.onFriendsListChanged(response);
          });


        }
      });

      ChatGrupo.getByQuery(new Query("grupoId", "==", this.grupoAtividade.id)).subscribe((chatGrupo) => {
        if (chatGrupo != null) {
            if(!chatGrupo.isEstudanteConectado(estudante)){
                chatGrupo.estudantesConectados.push(estudante);

                chatGrupo.save().subscribe(() => {

              })
            }

            let estudantesGrupo:IChatParticipant[] = [];
            let consultas = [];
            this.grupoAtividade.estudantes.forEach(estudante=>{

              consultas.push(Usuario.get(estudante.pk()));

              /* let participante = new Usuario(estudante, null, null, null, null, null);
              estudantesGrupo.push(participante); */
            })

            forkJoin(consultas).subscribe(estudantes=>{

              estudantes.forEach(estudante=>{
                estudantesGrupo.push(estudante["toChatParticipant"]());
              })

              this.grupoChat = new Group(estudantesGrupo);
              this.grupoChat.id = this.grupoAtividade.id;
              ChatGrupo.onDocumentUpdate(chatGrupo.id, callback);
              observer.next(this.grupoChat);
              observer.complete();

            })


        }
      });


    });

    /* */
  }

  groupCreated(group: Group): void {
    //ChatGrupoAdapter.mockedParticipants.push(group);

    /* ChatGrupoAdapter.mockedParticipants = ChatGrupoAdapter.mockedParticipants.sort(
      (first, second) => (second.displayName > first.displayName ? -1 : 1)
    ); */

    // Trigger update of friends list
    this.listFriends().subscribe((response) => {
      this.onFriendsListChanged(response);
    });
  }

  listFriends(): Observable<ParticipantResponse[]> {
    return new Observable((observer) => {

      ChatGrupo.getByQuery(new Query("grupoId", "==", this.grupoAtividade.id)).subscribe((chatGrupo) => {
        if (chatGrupo != null) {
          chatGrupo.getEstudantesConectados().subscribe((alunosConectados) => {
            if(this.grupoChat != null){
              let grupo = new ParticipantResponse();
              grupo.participant = this.grupoChat;
              grupo.metadata = {
                totalUnreadMessages: 0,
              };

              alunosConectados.push(grupo);
            }

            observer.next(alunosConectados);
            observer.complete();
          });
        }
      });
    });
  }
  getMessageHistory(destinataryId: any): Observable<Message[]> {
    return new Observable((observer) => {
      ChatGrupo.getByQuery(new Query("grupoId", "==", this.grupoAtividade.id)).subscribe((chatGrupo) => {
        if (chatGrupo != null) {
          chatGrupo.getMensagensChat().subscribe((mensagens) => {
            observer.next(mensagens);
            observer.complete();
          });
        }
      });
    });
  }

  sendMessage(message: Message): void {

    ChatGrupo.getByQuery(new Query("grupoId", "==", this.grupoAtividade.id)).subscribe(chatGrupo=>{
      let usuario = chatGrupo.getEstudanteConectadoById(message.fromId);
      if(usuario != null){
        let mensagem = new MensagemChat(null, new Usuario(usuario.id/* this.grupoAtividade.id */, null, null, null, null, usuario.nome), message.message, null);
        chatGrupo.mensagens.push(mensagem);
        chatGrupo.save().subscribe(()=>{

        });
      }

    })

  }
}
