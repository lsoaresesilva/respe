import { Document, Collection } from './firestore/document';
import { Dificuldade } from './dificuldade';
import { Assunto } from './assunto';
import Alternativa from './alternativa';

@Collection("questoesFechadas")
export default class QuestaoFechada extends Document{

    constructor(id, public nomeCurto, public enunciado, public dificuldade:Dificuldade, public sequencia, public assuntoPrincipal:Assunto, alternativas:Alternativa[]){
        super(id);
    }

    objectToDocument(){
        let document = super.objectToDocument();
        document["assuntoPrincipalId"] = this.assuntoPrincipal.pk();

        return document;
    }
}