import {Document, Collection} from './firestore/document'
import { Questao } from './questao';

@Collection("testsCases")
export default class TestCase extends Document{
    entradas:String [];
    saida:String;
    questao:Questao;

    constructor(id, entradas, saida, questao){
        super(id);
        this.entradas = entradas;
        this.saida = saida;
        this.questao = questao;
    }

    objectToDocument(){
        let document = super.objectToDocument();
        if(this.questao != null && typeof this.questao.pk === "function")
            document["questaoId"] = this.questao.pk();

        if(this.entradas != null && this.entradas.length > 0)
            document["entradas"] = this.entradas;

        return document;
    }

    // validar() {
    //     if (this.entradas == undefined || this.entradas == [null] || this.entradas == null ) {
    //       return false;
    //     }
    
    //     return true;
    //   }
    
}