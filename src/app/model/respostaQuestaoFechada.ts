import { Collection, Document, date } from './firestore/document';
import Usuario from './usuario';


@Collection("respostaQuestaoFechada")
export default class RespostaQuestaoFechada extends Document{
    estudante: Usuario;
    resposta :String;

    constructor(public id, estudante,resposta){
        super(id);

        this.estudante=estudante;
        this.resposta=resposta;
       
    }

   objectToDocument(){
        let document = super.objectToDocument()
        document["usuarioId"] = this.estudante.pk();
        return document;
    }

}