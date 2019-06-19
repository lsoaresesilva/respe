import { Collection, Document, date } from './firestore/document';
import Estudante from './estudante';
import { Util } from './util';


@Collection("respostaQuestaoFechada")
export default class RespostaQuestaoFechada{
    estudante: Estudante;
    resposta :String;

    constructor(public id, estudante,resposta){
        this.estudante=estudante;
        this.resposta=resposta;
        if(id == null)
            this.id = Util.uuidv4();
        else{
            this.id = id;
        }



    }

    objectToDocument(){
        return {
            estudanteId:this.estudante.pk(),
            resposta:this.resposta
        }
    }

}