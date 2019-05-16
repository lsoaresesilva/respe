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
        else if(this["questaoId"] != undefined){
            document["questaoId"] = this["questaoId"];
        }

        if(this.entradas != null && this.entradas.length > 0)
            document["entradas"] = this.entradas;

        return document;
    }


    validarEntrada(entrada:String) {
        if (entrada== undefined ||entrada == null || entrada  == "" ) {
             return false;
        }
        return true;
    }

    validar(){
            if (this.saida == null || this.saida ==undefined ||this.entradas == null|| this.entradas == undefined|| this.entradas.length ==0 || this.questao == null || this.questao == undefined) {
              return false;
            }
            return true;
    }
}