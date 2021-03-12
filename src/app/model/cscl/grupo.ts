import Usuario from '../usuario';
import { Util } from '../util';

export default class Grupo {
  constructor(public id, public estudantes: Usuario[]) {
    if (this.id == null) {
      this.id = Util.uuidv4();
    }
  }

  objectToDocument() {
    let document = {id:this.id};
    if (Array.isArray(this.estudantes)) {
      document['estudantes'] = [];
      this.estudantes.forEach((estudante) => {
        document['estudantes'].push(estudante.pk());
      });
    }

    return document;
  }
}
