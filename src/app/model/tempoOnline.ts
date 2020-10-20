import Usuario from './usuario';
import { Observable } from 'rxjs';
import { Collection, Document } from './firestore/document';

@Collection('tempoOnline')
export default class TempoOnline extends Document {
  constructor(id, public segundos, public estudante) {
    super(id);
  }

  objectToDocument() {
    const document = super.objectToDocument();
    if (this.estudante != null && this.estudante.pk != null) {
      document['estudanteId'] = this.estudante.pk();
    }

    return document;
  }

  atualizarTempo(usuario: Usuario) {}
}
