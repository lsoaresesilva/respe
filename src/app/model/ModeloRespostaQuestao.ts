import { Collection, Document, date } from './firestore/document';
import Usuario from './usuario';
import { Questao } from './questao';


@Collection("modeloRespostaQuestao")
export class ModeloRespostaQuestao extends Document{
    questao:Questao;
    codigo:String
    

    constructor(public id, codigo){
        super(id);
        this.codigo=codigo;
        
       
    }

   objectToDocument(){
        let document = super.objectToDocument()
        document["questaoId"] = this.questao.id;
        return document;
    }

}