import { Document, Collection } from '../../firestore/document';
import { Util } from '../../util';

export default class TestCase {

  constructor(id, entradas, saida) {
    this.entradas = entradas;
    this.saida = saida;
    if (id == null) { this.id = Util.uuidv4(); } else {
      this.id = id;
    }
  }
  entradas: String[];
  saida;
  id;

   /**
   * Constrói objetos TestsCases a partir do atributo testsCases de uma questão (que é um array)
   * @param testsCases
   */
    static construir(testsCases: any[]) {
      const objetosTestsCases: TestCase[] = [];
      if (testsCases != null) {
        testsCases.forEach((testCase) => {
          objetosTestsCases.push(new TestCase(testCase.id, testCase.entradas, testCase.saida));
        });
      }
      return objetosTestsCases;
    }

  static validarTestsCases(tests: TestCase[]) {
    for (let i = 0; i < tests.length; i++) {
      if (!tests[i].validar()) {
        return false;
      }
    }
    return true;
  }

  objectToDocument() {
    const document = {};
    if (this.saida != null) {
      document['saida'] = this.saida;
    }

    if (this.id != null) {
      document['id'] = this.id;
    }

    if (Array.isArray(this.entradas) && this.entradas.length > 0) {
      document['entradas'] = this.entradas;
    }

    return document;
  }



  validarEntradaSaida(dado: String) {
    if (dado == undefined || dado == null || dado == '') {
      return false;
    }
    return true;
  }

  validar() {
    if (
      this.saida == null ||
      this.saida == undefined ||
      this.entradas == null ||
      this.entradas == undefined ||
      this.entradas.length == 0
    ) {
      return false;
    }
    return true;
  }
}
