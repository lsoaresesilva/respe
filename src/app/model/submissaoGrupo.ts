import AtividadeGrupo from "./atividadeGrupo";
import Edicao from "./edicao";
import { Collection, date, Document } from "./firestore/document";

@Collection('submissoesGrupo')
export default class SubmissaoGrupo extends Document {

  @date()
  data 

  constructor(id, public edicoes:Edicao[], public atividadeGrupo:AtividadeGrupo) {
    super(id);
    
  }

  objectToDocument(){
    let objeto = super.objectToDocument();

    if(Array.isArray(this.edicoes)){
        objeto["edicoes"] = [];
        this.edicoes.forEach(edicao =>{
            objeto["edicoes"].push(edicao.stringfy());
        })
    }

    if(this.atividadeGrupo != null){
        objeto["atividadeGrupoId"] = this.atividadeGrupo.pk();
    }


    return this.objectToDocument();
    
  }
}
