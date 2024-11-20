import AtividadeGrupo from "./atividadeGrupo";
import Edicao from "./edicao";
import { Collection, date, Document } from "../database/document";
import Submissao from "../aprendizagem/questoes/respostaQuestaoProgramacao";
import Grupo from "./grupo";
import RespostaQuestaoProgramacao from "../aprendizagem/questoes/respostaQuestaoProgramacao";

@Collection('submissoesGrupo')
export default class SubmissaoGrupo extends Document {

  @date()
  data 

  constructor(id, public submissao:RespostaQuestaoProgramacao, public grupo:Grupo, public atividadeGrupo:AtividadeGrupo, public isFinal) {
    super(id);
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

    document["isFinal"] = this.isFinal;
    

    return document;
  }

  
}
