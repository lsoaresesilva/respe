import { Document, Collection } from './firestore/document';
import { Questao } from './questao';

@Collection("assuntosQuestoes")
export default class AssuntoQuestao extends Document{


    constructor(id, private questao, private assunto){
        super(id);
    }

    objectToDocument(){
        let document = {questaoId:this.questao.pk(), assuntoId: this.assunto.pk()};
        return document;
    }
}