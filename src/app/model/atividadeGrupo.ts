import { Observable } from "rxjs";
import { Assunto } from "./assunto";
import { Collection, Document } from "./firestore/document";
import { QuestaoProgramacao } from "./questoes/questaoProgramacao";
import Usuario from "./usuario";

@Collection("atividadeGrupo")
export default class AtividadeGrupo extends Document{

    constructor(id, public nome, public link, public estudantes:Usuario[]){
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

        return document;
    }

    salvar(assunto:Assunto, questao:QuestaoProgramacao){
        return new Observable(observer=>{
            super.save().subscribe(resultado=>{
                let link = "http://localhost:4200/main/(principal:entrar-grupo/"+this.pk()+"/"+assunto.pk()+"/"+questao.id+")";
                this.save().subscribe(()=>{
                    observer.next();
                    observer.complete();
                })
            })
        });
        
    }


}