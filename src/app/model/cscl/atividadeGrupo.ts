import { Observable } from "rxjs";
import { Assunto } from "../assunto";
import { Collection, date, Document } from "../firestore/document";
import { QuestaoProgramacao } from "../questoes/questaoProgramacao";
import Usuario from "../usuario";
import * as firebase from 'firebase';
import { Util } from "../util";

@Collection("atividadeGrupo")
export default class AtividadeGrupo extends Document{


    @date()
    data;

    constructor(id, public nome, public link, public dataExpiracao:Date, public estudantes:Usuario[]){
        super(id);
    }

    objectToDocument(){
        let document = super.objectToDocument();
        if(Array.isArray(this.estudantes)){
            document["estudantes"] = [];
            this.estudantes.forEach(estudante=>{
                document["estudantes"].push(estudante.pk())
            })
        }

        document["dataExpiracao"] = firebase.firestore.Timestamp.fromDate(this.dataExpiracao);

        return document;
    }

    salvar(assunto:Assunto, questao:QuestaoProgramacao){
        return new Observable(observer=>{
            super.save().subscribe(resultado=>{
                this.link = "http://localhost:4200/main/(principal:entrar-grupo/"+this.pk()+"/"+assunto.pk()+"/"+questao.id+")";
                this.save().subscribe(()=>{
                    observer.next();
                    observer.complete();
                })
            })
        });
        
    }

    isAtivo(){
        let dataAtual = new Date();
        let isMenor = dataAtual<Util.firestoreDateToDate(this.dataExpiracao)
        return isMenor;
    }


}