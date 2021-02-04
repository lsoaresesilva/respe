import AtividadeGrupo from "./atividadeGrupo";
import Edicao from "./edicao";
import { Collection, date, Document } from "../firestore/document";

@Collection('submissoesGrupo')
export default class SubmissaoGrupo extends Document {

  @date()
  data 

  constructor(id, public edicoes:Edicao[], public atividadeGrupo:AtividadeGrupo) {
    super(id);
    
  }

  
}
