import Grupo from "../cscl/grupo";
import { Collection, Document } from "../firestore/document";

@Collection("autoInstrucoesColetivas")
export default class AutoInstrucaoColetiva extends Document{

    constructor(public id, public analiseProblema, public analiseSolucao, public grupo:Grupo){
        super(id);
    }

    objectToDocument(){
        let document = super.objectToDocument();
        if(this.grupo != null){
            document["grupoId"] = this.grupo.id;
        }

        return document;
    }

}