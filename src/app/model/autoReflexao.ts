import { Document, Collection } from './firestore/document';
import Usuario from './usuario';
import { NivelConfianca } from './nivelConfianca';

@Collection('autoReflexoes')
export default class AutoReflexao extends Document {

  constructor(id, public nivelConfianca: NivelConfianca, public dificuldades, public acoesSucesso) {
    super(id);
  }

  validar() {
    if (this.acoesSucesso != '' || this.dificuldades != '' || this.nivelConfianca > 0) {
      return true;
    } else {
      return false;
    }
  }
}
