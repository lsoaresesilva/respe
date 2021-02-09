import { Assunto } from '../assunto';
import { Document, Collection, ignore } from '../firestore/document';
import { Observable, forkJoin } from 'rxjs';
import { Dificuldade } from '../enums/dificuldade';
import TestCase from '../testCase';

import Submissao from '../submissao';
import Usuario from '../usuario';
import { Util } from '../util';
import { ErroCompilacao } from '../errors/analise-compilacao/erroCompilacao';
import { ModeloRespostaQuestao } from '../modeloRespostaQuestao';

export class QuestaoProgramacao {
  constructor(
    public id,
    nomeCurto,
    enunciado,
    dificuldade,
    sequencia,
    assuntos,
    testsCases,
    algoritmoInicial,
    public exemplos: ModeloRespostaQuestao[]
  ) {
    if (id == null) {
      this.id = Util.uuidv4();
    } else {
      this.id = id;
    }
    this.nomeCurto = nomeCurto;
    this.enunciado = enunciado;
    this.dificuldade = dificuldade;
    this.sequencia = sequencia;
    this.assuntos = assuntos;
    this.testsCases = testsCases;
    this.algoritmoInicial = algoritmoInicial;
  }

  nomeCurto: string;
  enunciado: string;
  dificuldade: Dificuldade;
  assuntos: any[];
  sequencia: number;
  testsCases: TestCase[];
  algoritmoInicial: any = '';

  static isFinalizada(questao, usuario) {
    return new Observable((observer) => {
      Submissao.getRecentePorQuestao(questao, usuario).subscribe(
        (submissao) => {
          if (submissao != null && submissao['resultadosTestsCases'] != null) {
            const totalTestCase = questao.testsCases.length;
            let totalRespondidasSucesso = 0;

            submissao['resultadosTestsCases'].forEach((resultado) => {
              if (resultado != null && resultado['status'] == true) {
                totalRespondidasSucesso++;
              }
            });

            const percentual = (totalRespondidasSucesso / totalTestCase) * 100;
            observer.next(percentual);
            observer.complete();
          } else {
            observer.next(null);
            observer.complete();
          }
        },
        (err) => {
          observer.error(err);
        }
      );
    });
  }

  /* Verifica quais questões foram respondidas e altera o atributo respondida para true ou false; */
  static verificarQuestoesRespondidas(estudante, questoes) {
    return new Observable((observer) => {
      if (Array.isArray(questoes) && questoes.length > 0) {
        const consultas = {};

        questoes.forEach((questao) => {
          consultas[questao.id] = QuestaoProgramacao.isFinalizada(questao, estudante);
        });

        forkJoin(consultas).subscribe((questoesFinalizadas) => {
          questoes.forEach((questao) => {
            if (questoesFinalizadas[questao.id] != null) {
              questao.respondida = questoesFinalizadas[questao.id] === 100 ? true : false;
            }
          });

          observer.next(questoes);
          observer.complete();
        });
      } else {
        observer.next(questoes);
        observer.complete();
      }
    });
  }

  /**
   * Constrói objetos Questao a partir do atributo questoes de um assunto (que é um array)
   * @param testsCases
   */
  static construir(questoes: any[], assunto) {
    const objetosQuestoes: QuestaoProgramacao[] = [];

    if (questoes != null) {
      questoes.forEach((questao, index) => {
        const assuntos = [];
        if (questao.assuntos != null && questao.assuntos.length > 0) {
          questao.assuntos.forEach((assunto) => {
            assuntos.push(Assunto.construir(assunto) /*new Assunto(assunto, null)*/);
          });

          
        }

        if (assunto != null) {
          assuntos.push(assunto);
        }

        questoes[index].assuntos = assuntos;

        questao.testsCases = TestCase.construir(questao.testsCases);
        questao.exemplos = ModeloRespostaQuestao.construir(questao.exemplos);

        objetosQuestoes.push(
          new QuestaoProgramacao(
            questao.id,
            questao.nomeCurto,
            questao.enunciado,
            questao.dificuldade,
            questao.sequencia,
            questao.assuntos,
            questao.testsCases,
            questao.algoritmoInicial,
            questao.exemplos
          )
        );
      });
    }

    return objetosQuestoes;
  }

  static getByAssuntoQuestao(assuntoQuestao) {
    return new Observable((observer) => {
      assuntoQuestao = assuntoQuestao.split('/');
      const assuntoId = assuntoQuestao[0];
      const questaoId = assuntoQuestao[1];
      if (assuntoId != null && questaoId != null) {
        Assunto.get(assuntoId).subscribe(
          (assunto) => {
            const questao = assunto['getQuestaoProgramacaoById'](questaoId);
            observer.next(questao);
            observer.complete();
          },
          (err) => {
            observer.error(err);
          }
        );
      } else {
        observer.error(
          new Error('É preciso informar um assunto e questão no formato: assunto-id/questao-id')
        );
      }
    });
  }

  objectToDocument() {
    const document = {};

    document['id'] = this.id;
    document['nomeCurto'] = this.nomeCurto;
    document['enunciado'] = this.enunciado;
    document['dificuldade'] = this.dificuldade;
    if (this.algoritmoInicial != undefined) {
      document['algoritmoInicial'] = this.algoritmoInicial;
    }

    if (this.exemplos != undefined) {
      document['exemplos'] = this.exemplos;
    }

    if (this.assuntos != null && this.assuntos.length > 0) {
      const assuntos = [];
      this.assuntos.forEach((assunto) => {
        if (assunto.pk != undefined) {
          assuntos.push(assunto.pk());
        } // TODO: erro aqui
      });

      document['assuntos'] = assuntos;
    }

    document['sequencia'] = this.sequencia;

    if (this.testsCases != null && this.testsCases.length > 0) {
      const ts = [];
      this.testsCases.forEach((testCase) => {
        ts.push(testCase.objectToDocument());
      });
      document['testsCases'] = ts;
    }

    return document;
  }

  possuiCodigoNoEnunciado() {
    if (this.enunciado != null) {
      return this.enunciado.search("'''python") != -1 ? true : false;
    }
  }

  getExemploCorreto(): ModeloRespostaQuestao {
    if (Array.isArray(this.exemplos)) {
      return this.exemplos.filter((exemplo) => {
        return exemplo.isCorreto;
      })[0];
    }
  }

  toJson() {
    const ts = [];

    if (this.testsCases != null && this.testsCases.length > 0) {
      this.testsCases.forEach((testCase) => {
        ts.push(testCase.objectToDocument());
      });
    }

    return {
      testsCases: ts,
    };
  }

  /*  buscarAssuntos(assuntoPrincipal): Observable<any[]> {
    return new Observable((observer) => {
      const consultaAssuntos = [];
      let assuntosQuestao = [];

      if (assuntoPrincipal != undefined) {
        assuntosQuestao.push(assuntoPrincipal);
      } // incluindo o assunto principal à lista de questões

      if (this.assuntos != null) {
        this.assuntos.forEach((assunto) => {
          if (assunto.id != undefined) {
            consultaAssuntos.push(Assunto.get(assunto.id));
          }
        });
      }

      if (consultaAssuntos.length > 0) {
        forkJoin(consultaAssuntos).subscribe(
          (assuntosRecuperados) => {
            assuntosQuestao = assuntosQuestao.concat(assuntosRecuperados);
            observer.next(assuntosQuestao);
            observer.complete();
          },
          (err) => {
            observer.error(err);
          }
        );
      } else {
        observer.next(assuntosQuestao);
        observer.complete();
      }
    });
  } */

  validar() {
    if (
      this.nomeCurto == null ||
      this.nomeCurto == '' ||
      this.enunciado == null ||
      this.enunciado == '' ||
      this.dificuldade == null ||
      this.sequencia == null ||
      this.sequencia < 1 ||
      this.testsCases == undefined ||
      this.testsCases.length == 0 ||
      TestCase.validarTestsCases(this.testsCases) == false
    ) {
      return false;
    }
    return true;
  }

  formatarAlgoritmoInicial() {
    if (this.algoritmoInicial != null) {
      this.algoritmoInicial = this.algoritmoInicial.join('\n');
    }
  }

  prepararSave() {}

  getTestCaseById(id): TestCase {
    const testCase = this.testsCases.filter((testCase) => {
      return testCase.id == id;
    });

    return testCase[0] != null ? testCase[0] : null;
  }
}
