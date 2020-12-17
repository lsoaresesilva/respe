import { Document, Collection } from '../firestore/document';

@Collection('perguntasEstudantes')
export default class PerguntaEstudante extends Document {
  constructor(id, public estudante, public pergunta) {
    super(id);
  }

  // Object to document
}
