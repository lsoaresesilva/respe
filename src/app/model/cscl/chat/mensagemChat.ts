import grupo from '../grupo';
import { Collection, date, Document } from '../../firestore/document';
import Usuario from '../../usuario';
import { Util } from '../../util';
import { forkJoin, Observable } from 'rxjs';
import Query from '../../firestore/query';


import * as firebase from 'firebase';

export default class MensagemChat{

 
    constructor(public id, public estudante:Usuario, public texto, public data){
       if(id == null){
           this.id = Util.uuidv4();
       }

    }

    objectToDocument(){
        
        let document = {texto:this.texto};

        if(this.estudante.pk() != null){
            document["estudante"] = {id:this.estudante.pk(), nome:this.estudante.nome};
        }

        

        if(this.data == null){
            document["data"] = firebase.firestore.Timestamp.now();
        }else{
            document["data"] = this.data;
        }

        
        

        return document;
    }

    

    /* static carregarMensagens(grupo:grupo){
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
        

    } */
}