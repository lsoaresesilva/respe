import { Document, Collection } from './firestore/document';
import QuestaoFechada from './questaoFechada';

@Collection("alternativas")
export default class Alternativa extends Document{

    constructor(id, texto, public questaoFechada:QuestaoFechada, public isVerdadeiro){
        super(id);
    }

    objectToDocument(){
        let document = super.objectToDocument();
        document["questaoFechadaId"] = this.questaoFechada.pk();
        return document;
    }
}