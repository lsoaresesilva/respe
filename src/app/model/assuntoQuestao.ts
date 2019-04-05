import { Document, Collection } from './firestore/document';

@Collection("assuntosQuestoes")
export default class AssuntoQuestao extends Document{

    idQuestao;
    idAssunto;


    constructor(id, idQuestao, idAssunto){
        super(id);
        this.idQuestao = idQuestao;
        this.idAssunto = idAssunto;
    }
}