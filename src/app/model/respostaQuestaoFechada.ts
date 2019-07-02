import { Collection, Document, date } from './firestore/document';
import Estudante from './estudante';
import { Util } from './util';


@Collection("respostaQuestaoFechada")
export default class RespostaQuestaoFechada extends Document{
    estudante: Estudante;
    resposta :String;

    constructor(public id, estudante,resposta){
        super(id);

        this.estudante=estudante;
        this.resposta=resposta;

    }

    objectToDocument(){
        return {
            estudanteId:this.estudante.pk(),
            resposta:this.resposta
        }
    }

}