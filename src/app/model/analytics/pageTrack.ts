import { Collection, date, Document } from '../firestore/document';

@Collection('pageTrack')
export default class PageTrackRecord extends Document {
  @date()
  data;

  constructor(id, public pagina, public estudante) {
    super(id);
  }

  objectToDocument() {
    const document = super.objectToDocument();

    if (this.estudante != null && this.estudante.pk() != null) {
      document['estudanteId'] = this.estudante.pk();
    }

    return document;
  }
}
