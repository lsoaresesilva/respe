import grupo from '../grupo';
import { Collection, date, Document } from '../../firestore/document';
import Usuario from '../../usuario';
import { Util } from '../../util';
import { forkJoin, Observable } from 'rxjs';
import Query from '../../firestore/query';
import Grupo from '../grupo';
import AtividadeGrupo from '../atividadeGrupo';

@Collection("mensagensChat")
export default class MensagemChat extends Document{

    @date()
    data;

    constructor(public id, public estudante:Usuario, public texto, public grupo:Grupo, public atividadeGrupo:AtividadeGrupo){
        super(id);
    }

    objectToDocument(){
        let document = super.objectToDocument();
        if(this.estudante.pk() != null){
            document["estudanteId"] = this.estudante.pk();
        }

        if(this.grupo.id != null){
            document["grupoId"] = this.grupo.id;
        }

        if(this.atividadeGrupo.pk() != null){
            document["atividadeGrupoId"] = this.atividadeGrupo.pk();
        }
        

        return document;
    }

    static carregarMensagens(grupo:grupo){
        return new Observable<MensagemChat[]>(observer=>{
            if(grupo != null){
                let consultaEstudantes:Observable<Usuario>[] = [];
                let estudantesUnicos = [];
                MensagemChat.getAll(new Query("grupoId", "==", grupo.id)).subscribe(mensagens=>{
                    mensagens.forEach(mensagem=>{
                        if(mensagem["estudanteId"] != null){
                            if(!estudantesUnicos.includes(mensagem["estudanteId"])){
                                estudantesUnicos.push(mensagem["estudanteId"]);
                            }
                        }
                    })

                    estudantesUnicos.forEach(estudante=>{
                        consultaEstudantes.push(Usuario.get(estudante));
                    })

                    forkJoin(consultaEstudantes).subscribe(estudantes=>{
                        mensagens.forEach(mensagem=>{
                            if(mensagem["estudanteId"] != null){
                                for(let i = 0; i < estudantes.length; i++){
                                    if(mensagem["estudanteId"] == estudantes[i].pk()){
                                        mensagem.estudante = estudantes[i];
                                    }
                                }
                               
                            }
                        })

                        mensagens.sort((mensagemA, mensagemB)=>{
                            let dataA = mensagemA.data.toDate()
                            let dataB = mensagemB.data.toDate()
                            if(dataA < dataB){
                                return -1;
                            }else if(dataA > dataA){
                                return 1;
                            }

                            return 0;
                        });

                        observer.next(mensagens);
                        observer.complete();
                    })
                })
            }
            
        })
        

    }
}