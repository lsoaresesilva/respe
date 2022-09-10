
import { Util } from '../../util';

export class ModeloRespostaQuestao {
  constructor(public id, public codigo: String[], public isCorreto) {
    if (id == null) {
      this.id = Util.uuidv4();
    } else {
      this.id = id;
    }
  }

  /**
   * Constrói um objeto ModeloRespostaquestao a partir de um código informado
   * @param codigo
   */
  static construir(solucao) {
    if(solucao != null){
      const exemplo: ModeloRespostaQuestao = new ModeloRespostaQuestao(solucao.id, solucao.codigo, solucao.isCorreto);
      return exemplo;
    }
  }

  objectToDocument() {
    const document = {
    }

    if(this.codigo != null){
      document["codigo"] = this.codigo;
    }

    if(this.isCorreto != null){
      document["isCorreto"] = this.isCorreto;
    }

    return document;
  }

  validar() {
    if (!Array.isArray(this.codigo)) {
      return false;
    }
    return true;
  }
}
