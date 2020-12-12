import { Document, Collection } from './firestore/document';
import { Assunto } from './assunto';
import Usuario from './usuario';
import { NivelConfianca } from './nivelConfianca';

@Collection('autoReflexoes')
export default class AutoReflexao extends Document {
  nivelConfianca: NivelConfianca;

  constructor(id, nivelConfianca, public dificuldades, public acoesSucesso) {
    super(id);
    this.nivelConfianca = nivelConfianca;
  }

  validar() {
    if (this.acoesSucesso != '' || this.dificuldades != '' || this.nivelConfianca > 0) {
      return true;
    } else {
      return false;
    }
  }
}
