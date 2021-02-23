import AtividadeGrupo from "./atividadeGrupo";
import Edicao from "./edicao";
import { Collection, date, Document } from "../firestore/document";
import Submissao from "../submissao";

@Collection('submissoesGrupo')
export default class SubmissaoGrupo extends Document {

  @date()
  data 

  constructor(id, public submissao:Submissao, public atividadeGrupo:AtividadeGrupo) {
    super(id);
    
  }

  objectToDocument(){
    let document = super.objectToDocument();

    if(this.submissao.pk() != null){
      document["submissaoId"] = this.submissao.pk();
    }


    if(this.atividadeGrupo.pk() != null){
      document["atividadeGrupoId"] = this.atividadeGrupo.pk();
    }

    return document;
  }

  
}
