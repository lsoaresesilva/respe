import { Collection, Document } from './firestore/document';
import { QuestaoProgramacao } from './questoes/questaoProgramacao';
import { Util } from './util';

export class ModeloRespostaQuestao {
  constructor(public id, public codigo: String[], public isCorreto) {
    if (id == null) {
      this.id = Util.uuidv4();
    } else {
      this.id = id;
    }
  }

  /**
   * Constrói objetos TestsCases a partir do atributo testsCases de uma questão (que é um array)
   * @param testsCases
   */
  static construir(exemploDocument) {
    if(exemploDocument != null){
      const exemplo: ModeloRespostaQuestao = new ModeloRespostaQuestao(exemploDocument.id, exemploDocument.codigo, exemploDocument.isCorreto);
      return exemplo;
    }
  }

  objectToDocument() {
    const document = { codigo: this.codigo, isCorreto: this.isCorreto };
    return document;
  }

  validar() {
    if (!Array.isArray(this.codigo)) {
      return false;
    }
    return true;
  }
}
