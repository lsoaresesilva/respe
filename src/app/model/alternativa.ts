import { Document, Collection } from './firestore/document';
import QuestaoFechada from './questaoFechada';

@Collection("alternativas")
export default class Alternativa extends Document{
    texto:String ;
    isVerdadeira:Boolean;
    questaoFechada:QuestaoFechada;

    constructor(id, texto, isVerdadeira, questaoFechada){
        super(id);
        this.texto = texto;
        this.isVerdadeira = isVerdadeira;
        this.questaoFechada = questaoFechada;
    }

    objectToDocument(){
        let document = super.objectToDocument();
        document["questaoFechadaId"] = this.questaoFechada.pk();
        return document;
    }
    validar() {
        if (this.texto == undefined || this.texto == null || this.isVerdadeira == null || this.isVerdadeira == undefined ||
         this.questaoFechada == undefined || this.questaoFechada == null) {
          return false;
        }
        return true;
        
      }
    
}