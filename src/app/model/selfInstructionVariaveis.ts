import { Document, Collection } from './firestore/document';
import { Questao } from './questao';

@Collection("monitoramento_srl")
export class SelfInstructionVariaveis extends Document{
    
    questao:Questao;
    monitoramento:String;
    

    constructor(id, questao,monitoramento){
        super(id);
        this.questao = questao;
        this.monitoramento = monitoramento;
    }

    objectToDocument(){
        let document = super.objectToDocument()
       // document["monitoramentoId"] = this.monitoramento.pk();
        document["questaoId"] = this.questao.id; // TODO: incluir também o assuntoID
        return document;
    }

}