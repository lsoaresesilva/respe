import { Collection, Document } from "./firestore/document";
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


}