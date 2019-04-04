import { Document, Collection } from './firestore/document';

@Collection("questoesAssuntos")
export default class QuestaoAssunto extends Document{

    idQuestao;
    idAssunto;


    constructor(id, idQuestao, idAssunto){
        super(id);
        this.idQuestao = idQuestao;
        this.idAssunto = idAssunto;
    }
}