import { Collection, Document } from '../firestore/document';
import Conceito from '../aprendizagem/questoes/conceito';

@Collection("conceitos")
export default class MapeamentoErrosConceituais extends Document {

  constructor(public id, public conceito: Conceito){
    super(id);
  }
}
