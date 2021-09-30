import { Message, ParticipantResponse } from "ng-chat";
import { Observable, of } from "rxjs";
import { Collection, Document } from "../../firestore/document";
import Usuario from "../../usuario";
import AtividadeGrupo from "../atividadeGrupo";
import Grupo from "../grupo";
import MensagemChat from "./mensagemChat";


@Collection("chatGrupo")
export default class ChatGrupo extends Document{

    constructor(id, public mensagens:MensagemChat[], public estudantesConectados:Usuario[], public grupo:Grupo, public atividadeGrupo:AtividadeGrupo){
        super(id);
        if(this.estudantesConectados == null){
            this.estudantesConectados = [];
        }
        if(this.mensagens == null){
            this.mensagens = [];
        }
    }


    objectToDocument(){
        let document = super.objectToDocument();

        if(this.atividadeGrupo.pk() != null){
            document["atividadeGrupoId"] = this.atividadeGrupo.pk();
        }

        if(this.grupo.id != null){
            document["grupoId"] = this.grupo.id;
        }

        if(Array.isArray(this.mensagens)){
            document["mensagens"] = [];
            this.mensagens.forEach(mensagem=>{
                document["mensagens"].push(mensagem.objectToDocument())
            });
        }

        if(Array.isArray(this.estudantesConectados)){
            document["estudantesConectados"] = [];
            this.estudantesConectados.forEach(estudante=>{
                document["estudantesConectados"].push({id:estudante.pk(), nome:estudante.nome});
            });
        }

        return document;
    }

    static getByQuery(query, orderBy = null):Observable<ChatGrupo> {
        return new Observable(observer=>{
            super.getByQuery(query).subscribe(chatGrupo=>{
                if(chatGrupo != null){


                    if(Array.isArray(chatGrupo.estudantesConectados)){
                        let estudantesConectados = [];

                        chatGrupo.estudantesConectados.forEach(aluno => {
                            estudantesConectados.push(new Usuario(aluno.id, null, null, null, null, aluno.nome));
                        });

                        chatGrupo.estudantesConectados = estudantesConectados;
                    }

                    if(Array.isArray(chatGrupo.mensagens)){

                        let mensagens = [];

                        chatGrupo.mensagens.forEach(mensagem => {
                            if(mensagem != null && mensagem.estudante != null){
                                mensagens.push(new MensagemChat(mensagem.id, new Usuario(mensagem.estudante.id, null, null, null, null, mensagem.estudante.nome), mensagem.texto, mensagem.data));
                            }

                        });

                        chatGrupo.mensagens = mensagens;
                    }




                    if(chatGrupo.atividadeGrupoId != null){
                        chatGrupo.atividadeGrupo = new AtividadeGrupo(chatGrupo.atividadeGrupoId, null, null, null, null, null, null);
                    }

                    if(chatGrupo.grupoId != null){
                        chatGrupo.grupo = new Grupo(chatGrupo.grupoId, null);
                    }
                }
                observer.next(chatGrupo);
                observer.complete();
            })
        })
    }

    getEstudantesConectados():Observable<ParticipantResponse[]> {
            return of(
              this.estudantesConectados.map((user) => {
                let participantResponse = new ParticipantResponse();

                participantResponse.participant = user.toChatParticipant();
                participantResponse.metadata = {
                  totalUnreadMessages: 0,
                };

                return participantResponse;
              })
            );
    }

    getMensagensChat(): Observable<Message[]>{
        return of(
            this.mensagens.map((mensagem) => {
              let m = new Message();

              m.dateSent = mensagem.data;
              m.fromId = mensagem.estudante.id;
              m.message = mensagem.texto;
              m.toId = this.grupo.id;

              return m;
            })
          );
    }

    getEstudanteConectadoById(userId){
        let resultado = this.estudantesConectados.filter((e) => {
            if(e.pk() == userId){
                return true;
            }
        });
        return resultado.length > 0?resultado[0]:null;
    }

    isEstudanteConectado(estudante:Usuario){
        return this.estudantesConectados.filter((e) => {
            if(e.pk() == estudante.pk()){
                return true;
            }
        }).length > 0?true:false;
    }

    desconectarEstudante(estudante:Usuario){
        for(let i = 0; i < this.estudantesConectados.length; i++){
            if(this.estudantesConectados[i].pk() == estudante.pk()){
                this.estudantesConectados.splice(i, 1);
                return true;
            }
        }

        return false;
    }
}
