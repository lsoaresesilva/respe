import { Collection, Document } from '../firestore/document';
import Alternativa from '../alternativa';
import { TipoQuestaoExperimento } from './tipoQuestaoExperimento';

@Collection("questoesExperimento")
export default class QuestaoExperimento extends Document{

    enunciado;
    assuntos;
    alternativas: Alternativa[];
    tipo:TipoQuestaoExperimento;

    objectToDocument() {
        let document = super.objectToDocument();
        if (this.alternativas != null && this.alternativas.length > 0) {
            let alternativas = [];
            this.alternativas.forEach(alternativa => {
                if (typeof alternativa.objectToDocument === "function")
                    alternativas.push(alternativa.objectToDocument());
            })

            document["alternativas"] = alternativas;
        }

        return document;
    }

    

}