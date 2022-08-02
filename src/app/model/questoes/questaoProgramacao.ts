import { Observable, forkJoin } from "rxjs";
import { ModeloRespostaQuestao } from "./modeloRespostaQuestao";
import { MaterialAprendizagem } from "../sistema-aprendizagem/materialAprendizagem";
import Submissao from "../submissao";
import TestCase from "../testCase";
import { Util } from "../util";
import { Assunto } from "./assunto";
import { Dificuldade } from './enum/dificuldade';


export class QuestaoProgramacao implements MaterialAprendizagem{
  constructor(
    public id,
    public nomeCurto,
    public enunciado,
    public dificuldade: Dificuldade,
    public ordem,
    public assuntos,
    public testsCases: TestCase[],
    public algoritmoInicial,
    public solucao: ModeloRespostaQuestao
  ) {
    if (id == null) {
      this.id = Util.uuidv4();
    }
  }

  assunto: Assunto;

  isFinalizada(submissao, margemAceitavel){
    if(submissao == null || submissao.questaoId != this.id){
      return false;
    }


    const totalTestsCases = this.testsCases.length-1;
    let totalAcertos = 0;
    if (submissao.questaoId != null && submissao.resultadosTestsCases.length != 0) {
      submissao.resultadosTestsCases.forEach((resultadoTestCase) => {
        if (resultadoTestCase.status) {
          totalAcertos++;
        }
      });

      const percentual = totalAcertos / totalTestsCases;
      if (percentual >= margemAceitavel) {
        return true;
      }
    }

    return false;
  }

  static isFinalizada(questao, usuario) {
    return new Observable((observer) => {
      Submissao.getRecentePorQuestao(questao, usuario).subscribe(
        (submissao) => {
          if(submissao != null){
            if(submissao["data"] != null){
              let x = Util.firestoreDateToDate(submissao["data"]);
            }
          }

          if (submissao != null && submissao['resultadosTestsCases'] != null) {
            let totalTestCase = questao.testsCases.length;
            // TODO: Algumas questões tem 4 testscases e outros 3. Enquanto todas não tem 4, então usar esse código.
            if(questao.testsCases.length == 4){
              totalTestCase -= 1;
            }

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
          questao.percentualResposta = 0;
          consultas[questao.id] = QuestaoProgramacao.isFinalizada(questao, estudante);
        });

        forkJoin(consultas).subscribe((questoesFinalizadas) => {
          questoes.forEach((questao) => {
            if (questoesFinalizadas[questao.id] != null) {
              questao.respondida = questoesFinalizadas[questao.id] === 100 ? true : false;
              questao.percentualResposta = questoesFinalizadas[questao.id];
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

  /** TODO: Verificar se é possível construir, caso contrário disparar um erro. */
  static _construirIndividual(questaoDocument, assunto):QuestaoProgramacao{
    const assuntos = [];
    if (questaoDocument.assuntos != null && questaoDocument.assuntos.length > 0) {
      questaoDocument.assuntos.forEach((assunto) => {
        assuntos.push(Assunto.criarAssunto(assunto) /*new Assunto(assunto, null)*/);
      });

      if (assunto != null) {
        assuntos.push(assunto);
      }

      //questao.assuntos = assuntos;
    }

    let testsCases = TestCase.construir(questaoDocument.testsCases);
    let solucao = ModeloRespostaQuestao.construir(questaoDocument.solucao);

    let questao = new QuestaoProgramacao(questaoDocument.id, questaoDocument.nomeCurto, questaoDocument.enunciado, questaoDocument.dificuldade, questaoDocument.ordem, assuntos, testsCases, questaoDocument.algoritmoInicial, solucao )


    return questao
  }

  /**
   * Constrói objetos Questao a partir do atributo questoes de um assunto (que é um array)
   * @param testsCases
   */
  static construir(questoes: any[], assunto) {
    const objetosQuestoes: QuestaoProgramacao[] = [];

    if (questoes != null) {
      questoes.forEach((questao, index) => {

        questao = this._construirIndividual(questao, assunto);

        objetosQuestoes.push(
          new QuestaoProgramacao(
            questao.id,
            questao.nomeCurto,
            questao.enunciado,
            questao.dificuldade,
            questao.ordem,
            questao.assuntos,
            questao.testsCases,
            questao.algoritmoInicial,
            questao.solucao
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

    if (this.solucao != undefined) {
      document['solucao'] = this.solucao;
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

    document['ordem'] = this.ordem;

    if (this.testsCases != null && this.testsCases.length > 0) {
      const ts = [];
      this.testsCases.forEach((testCase) => {
        ts.push(testCase.objectToDocument());
      });
      document['testsCases'] = ts;
    }

    if (this.solucao != null) {
        document['solucao'] = this.solucao.objectToDocument();
    }

    return document;
  }

  possuiCodigoNoEnunciado() {
    if (this.enunciado != null) {
      return this.enunciado.search("'''python") != -1 ? true : false;
    }
  }

  getExemploCorreto(): ModeloRespostaQuestao {
    if (this.solucao != null) {
     return this.solucao;
    }
  }

  toJson(isVisualizacao = false, id = null) {
    const ts = [];

    if(isVisualizacao && id != null){
      if (this.testsCases != null && this.testsCases.length > 0) {
        this.testsCases.forEach((testCase) => {
          if(testCase.id == id){
            ts.push(testCase.objectToDocument());
          }

        });
      }
    }else{
      if (this.testsCases != null && this.testsCases.length > 0) {
        this.testsCases.forEach((testCase) => {
          ts.push(testCase.objectToDocument());
        });
      }
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
      this.ordem == null ||
      this.ordem < 1 ||
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
