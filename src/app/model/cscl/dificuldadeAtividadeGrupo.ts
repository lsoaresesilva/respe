import { Collection, Document } from "../firestore/document";
import Usuario from "../usuario";
import AtividadeGrupo from "./atividadeGrupo";
import Grupo from "./grupo";

@Collection("relatosDificuldadesAtividadesGrupo")
export default class DificuldadeAtividadeGrupo extends Document{

    constructor(public id, public atividadeGrupo:AtividadeGrupo, public grupo:Grupo, public estudante:Usuario, public dificuldade, public justificativa){
        super(id);
    }

    objectToDocument(){
        let document = super.objectToDocument();
        if(this.atividadeGrupo != null){
            document["atividadeGrupoId"] = this.atividadeGrupo.pk();
        }

        if(this.grupo != null){
            document["grupoId"] = this.grupo.id;
        }

        if(this.estudante != null){
            document["estudanteId"] = this.estudante.pk();
        }

        return document;
    }
}