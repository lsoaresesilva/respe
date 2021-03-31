import AtividadeGrupo from "./atividadeGrupo";
import Edicao from "./edicao";
import { Collection, date, Document } from "../firestore/document";
import Submissao from "../submissao";
import Grupo from "./grupo";

@Collection('submissoesGrupo')
export default class SubmissaoGrupo extends Document {

  @date()
  data 

  constructor(id, public submissao:Submissao, public grupo:Grupo, public atividadeGrupo:AtividadeGrupo, public isFinal) {
    super(id);
    this.isFinal = false;
  }

  objectToDocument(){
    let document = super.objectToDocument();
    
    if(this.submissao != null && this.submissao.pk() != null){
      document["submissaoId"] = this.submissao.pk();
    }

    if(this.grupo != null && this.grupo.id != null){
      document["grupoId"] = this.grupo.id;
    }

    if(this.atividadeGrupo != null && this.atividadeGrupo.pk() != null){
      document["atividadeGrupoId"] = this.atividadeGrupo.pk();
    }
    

    return document;
  }

  
}
