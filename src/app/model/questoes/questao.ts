import { Util } from '../util';

export default abstract class Questao {
  constructor(
    public id,
    public enunciado,
    public nomeCurto,
    public sequencia,
    public dificuldade,
    public respostaCorreta
  ) {
    if (id == null) {
      this.id = Util.uuidv4();
    } else {
      this.id = id;
    }
  }

  validar() {
    if (
      this.nomeCurto == null ||
      this.nomeCurto == '' ||
      this.enunciado == null ||
      this.enunciado == '' ||
      this.dificuldade == null ||
      this.sequencia == null ||
      this.sequencia < 1
    ) {
      return false;
    }
    return true;
  }

  objectToDocument() {
    const document = {};
    document['id'] = this.id;
    document['nomeCurto'] = this.nomeCurto;
    document['enunciado'] = this.enunciado;
    document['dificuldade'] = this.dificuldade;
    document['sequencia'] = this.sequencia;
    document['respostaCorreta'] = this.respostaCorreta != null ? this.respostaCorreta : '';

    return document;
  }
}
