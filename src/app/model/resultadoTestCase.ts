import { Collection, Document, date } from './firestore/document';
import { Observable, forkJoin } from 'rxjs';
import TestCase from './aprendizagem/questoes/testCase';
import Submissao from './submissao';
import Query from './firestore/query';

import * as firebase from 'firebase';
import { Util } from './util';

export default class ResultadoTestCase {

  // TODO: incluir a submissão

  constructor(public id, public status, public respostaAlgoritmo, public testCase: TestCase) {
    if (id == null) this.id = Util.uuidv4();
    else {
      this.id = id;
    }
  }

  static fromJson(resultadoJson: any) {
    return new ResultadoTestCase(resultadoJson.id, resultadoJson.status, resultadoJson.respostaAlgoritmo, resultadoJson.testCase);
  }

  /**
   * Constrói objetos ResultadoTestCase a partir do atributo resultadoTestCase de uma submissão (que é um array)
   * @param testsCases
   */
  static construir(resultadosTestsCases: any[]) {
    const objetoResultadoTestCase: ResultadoTestCase[] = [];

    if (resultadosTestsCases != null) {
      resultadosTestsCases.forEach((resultado) => {
        objetoResultadoTestCase.push(
          new ResultadoTestCase(
            null,
            resultado['status'],
            resultado['respostaAlgoritmo'],
            new TestCase(resultado['testCaseId'], null, null)
          )
        );
      });
    }

    return objetoResultadoTestCase;
  }

  static getRecente(resultadosTestCase: any[]) {
    let resultadoAtualTestCase = null;

    for (let x = 0; x < resultadosTestCase['length']; x++) {
      if (resultadoAtualTestCase == null) resultadoAtualTestCase = resultadosTestCase[x];
      else {
        let dateTestCase = resultadosTestCase[x]['data']['toDate']();
        let dateTestCaseAtual = resultadoAtualTestCase['data']['toDate']();
        if (dateTestCase['getTime']() > dateTestCaseAtual['getTime']()) {
          resultadoAtualTestCase = resultadosTestCase[x];
        }
      }
    }

    return resultadoAtualTestCase;
  }

  objectToDocument() {
    let document = {};
    document['status'] = this.status;
    document['respostaAlgoritmo'] = this.respostaAlgoritmo;
    document['testCaseId'] = this.testCase.id;
    return document;
  }
}
