import { Document, Collection, ignore } from './firestore/document';
import { Observable, forkJoin } from 'rxjs';
import { QuestaoProgramacao } from './questoes/questaoProgramacao';
import Usuario from './usuario';
import Submissao from './submissao';
import { Util } from './util';
import { RespostaQuestaoFechada } from './respostaQuestaoFechada';
import { Assuntos } from './enums/assuntos';
import QuestaoFechada from './questoes/questaoFechada';
import QuestaoParsonProblem from './questoes/parsonProblem';
import Query from './firestore/query';
import { RespostaQuestaoParson } from './juiz/respostaQuestaoParson';
import QuestaoColaborativa from './cscl/questaoColaborativa';

@Collection('assuntos')
export class Assunto extends Document {
  constructor(id, public nome) {
    super(id);
    this.questoesFechadas = [];
    this.questoesProgramacao = [];
    this.objetivosEducacionais = [];
    this.questoesParson = [];
    this.questoesColaborativas = [];
  }

  sequencia;
  importancia;
  questoesProgramacao;
  questoesFechadas;
  questoesParson: any;
  questoesColaborativas;
  objetivosEducacionais: [];
  isAtivo;

  @ignore()
  percentualConclusao;

  /**
   * Este método deve ser temporário, pois uma questão possui relação com assuntos,
   * mas está sendo utilizado relação com banco de dados (usando a PK deles)
   * No entanto, isso é custoso, pois seria preciso carregar do BD cada assunto.
   * Para reduzir esse problema, futuramente, deve-se refatorar cada questão de programação para usar o nome que está no enumerador.
   */
  static construir(assunto) {
    if (assunto != null) {
      const a = new Assunto(assunto, null);
      if (assunto == 'PU0EstYupXgDZ2a57X0X') {
        // Repetições
        a.nome = Assuntos.repeticoes;
      } else if (assunto == 'jW22yOF9a28N0aQlNNGR') {
        // Repetições
        a.nome = Assuntos.variaveis;
      } else if (assunto == 'x6cVrs1hHkKmdRhFBpsf') {
        // Repetições
        a.nome = Assuntos.condicoes;
      }

      return a;
    }

    return null;
  }

  static getAll(query = null, orderBy = null): Observable<any[]> {
    if (query != null) {
      if (Array.isArray(query)) {
        query.push(new Query('isAtivo', '==', true));
      } else {
        let q = [];
        q.push(query);
        q.push(new Query('isAtivo', '==', true));
        query = q;
      }
    } else {
      query = new Query('isAtivo', '==', true);
    }

    return super.getAll(query);
  }

  static getAllAdmin(query = null, orderBy = null): Observable<any[]> {
    return super.getAll(query);
  }

  static get(id) {
    return new Observable((observer) => {
      super.get(id).subscribe(
        (assunto) => {
          assunto['questoesProgramacao'] = QuestaoProgramacao.construir(
            assunto['questoesProgramacao'],
            assunto
          );
          assunto['questoesFechadas'] = QuestaoFechada.construir(assunto['questoesFechadas']);
          assunto['questoesColaborativas'] = QuestaoColaborativa.construir(assunto['questoesColaborativas'], assunto);
          assunto['questoesParson'] = QuestaoParsonProblem.construir(assunto['questoesParson']);
          observer.next(assunto);
          observer.complete();
        },
        (err) => {
          observer.error(err);
        }
      );
    });
  }

  static isQuestoesProgramacaoFinalizadas(assunto: Assunto, estudante, margemAceitavel = 0.6) {
    return new Observable((observer) => {
      this.calcularPercentualConclusaoQuestoesProgramacao(
        assunto,
        estudante,
        margemAceitavel
      ).subscribe((percentual) => {
        if (percentual >= margemAceitavel) {
          observer.next(true);
          observer.complete();
        } else {
          observer.next(false);
          observer.complete();
        }
      });
    });
  }

  static calcularPercentualConclusao(assunto: Assunto, usuario): Observable<number> {
    return new Observable((observer) => {
      forkJoin([
        Assunto.calcularPercentualConclusaoQuestoesFechadas(assunto, usuario),
        Assunto.calcularPercentualConclusaoQuestoesParson(assunto, usuario),
        Assunto.calcularPercentualConclusaoQuestoesProgramacao(assunto, usuario, 0.6),
        
      ]).subscribe((resultado) => {
        let percentualConclusao = 0;
        resultado.forEach((percentual) => {
          percentualConclusao += percentual;
        });

        percentualConclusao /= 3;
        percentualConclusao = Math.round(percentualConclusao * 100);
        observer.next(percentualConclusao);
        observer.complete();
      });
    });
  }

  /**
   * Recupera as submissões mais recentes do estudante. As submissões são referentes a diferentes questões de programação.
   * @param assunto
   * @param usuario
   */
  static getTodasSubmissoesProgramacaoPorEstudante(assunto, usuario) {
    const submissoes = {};
    assunto.questoesProgramacao.forEach((questao) => {
      if (questao.testsCases != undefined && questao.testsCases.length > 0) {
        questao.testsCases.forEach((testCase) => {
          submissoes[questao.id] = Submissao.getRecentePorQuestao(questao, usuario);
        });
      }
    });

    return submissoes;
  }

  static calcularPercentualConclusaoQuestoesFechadas(
    assunto: Assunto,
    usuario: Usuario
  ): Observable<number> {
    // Recuperar todas as questões de um assunto
    return new Observable((observer) => {
      let totalRespostas = 0;
      const respostas = [];
      assunto.questoesFechadas.forEach((questao) => {
        // Recuperar todas as respostas às questões fechadas

        respostas.push(RespostaQuestaoFechada.getRespostaQuestaoEstudante(questao, usuario));
      });

      if (respostas.length > 0 && assunto.questoesFechadas.length == respostas.length) {
        forkJoin(respostas).subscribe((respostas) => {
          for (let i = 0; i < assunto.questoesFechadas.length; i++) {
            if (respostas[i] != null) {
              // let resultado = QuestaoFechada.isRespostaCorreta(assunto.questoesFechadas[i], respostas[i]);
              // if (resultado) {
              totalRespostas++;
              // }
            }
          }

          const percentual = totalRespostas / assunto.questoesFechadas.length;
          observer.next(percentual);
          observer.complete();
        });
      } else {
        observer.next(0);
        observer.complete();
      }
    });
  }

  static calcularPercentualConclusaoQuestoesParson(
    assunto: Assunto,
    usuario: Usuario
  ): Observable<number> {
    // Recuperar todas as questões de um assunto
    return new Observable((observer) => {
      let totalRespostas = 0;
      const respostas = [];
      assunto.questoesParson.forEach((questao) => {
        // Recuperar todas as respostas às questões fechadas

        respostas.push(RespostaQuestaoParson.getRespostaQuestaoEstudante(questao, usuario));
      });

      if (respostas.length > 0 && assunto.questoesParson.length == respostas.length) {
        forkJoin(respostas).subscribe((respostas) => {
          for (let i = 0; i < assunto.questoesParson.length; i++) {
            if (respostas[i] != null) {
              // let resultado = QuestaoFechada.isRespostaCorreta(assunto.questoesFechadas[i], respostas[i]);
              // if (resultado) {
              totalRespostas++;
              // }
            }
          }

          const percentual = totalRespostas / assunto.questoesParson.length;
          observer.next(percentual);
          observer.complete();
        });
      } else {
        observer.next(0);
        observer.complete();
      }
    });
  }

  /**
   * Calcula o percentual de questões de programação que o estudante resolveu.
   * @param assunto
   * @param usuario
   * @param margemAceitavel
   */
  static calcularPercentualConclusaoQuestoesProgramacao(
    assunto: Assunto,
    usuario: Usuario,
    margemAceitavel
  ): Observable<number> {
    // Pegar todas as questões de um assunto
    return new Observable((observer) => {
      if (assunto != undefined && usuario != undefined) {
        const submissoes = this.getTodasSubmissoesProgramacaoPorEstudante(assunto, usuario);
        if (!Util.isObjectEmpty(submissoes)) {
          forkJoin(submissoes).subscribe((submissoes) => {
            const s: any = submissoes;
            if (!Util.isObjectEmpty(s)) {
              const totalQuestoes = assunto.questoesProgramacao.length;
              const questoesRespondidas = [];
              assunto.questoesProgramacao.forEach((questao) => {
                const questaoRespondida = true;
                // for (let j = 0; j < questao.testsCases.length; j++) {
                const resultadoAtualTestCase = null;

                for (const questaoId in s) {
                  if (questaoId == questao.id) {
                    const totalTestsCases = questao.testsCases.length;
                    let totalAcertos = 0;
                    if (s[questaoId] != null && s[questaoId].resultadosTestsCases.length != 0) {
                      s[questaoId].resultadosTestsCases.forEach((resultadoTestCase) => {
                        if (resultadoTestCase.status) {
                          totalAcertos++;
                        }
                      });

                      const percentual = totalAcertos / totalTestsCases;
                      if (percentual >= margemAceitavel) {
                        questoesRespondidas.push(questao);
                      }
                    }
                  }
                }
                // }
              });

              observer.next(questoesRespondidas.length / totalQuestoes);
              observer.complete();
            } else {
              observer.next(0);
              observer.complete();
            }
          });
        } else {
          observer.next(0);
          observer.complete();
        }
      }
    });
  }

  /* Ordena os assuntos a partir da sequência em que devem ser trabalhados. */
  static ordenar(arrayAssuntos: Assunto[]) {
    arrayAssuntos.sort(function (assuntoA, assuntoB) {
      return assuntoA.sequencia - assuntoB.sequencia;
    });

    return arrayAssuntos;
  }

  definirSequenciaQuestoes(questoes: any[]) {
    // Definir a sequência a partir da posição no array
    for (let i = 0; i < questoes.length; i = i + 1) {
      if (
        questoes[i] instanceof QuestaoFechada ||
        questoes[i] instanceof QuestaoProgramacao ||
        questoes[i] instanceof QuestaoParsonProblem
      ) {
        if (questoes[i].sequencia != null) {
          questoes[i].sequencia = i + 1;
        }

        if (questoes[i].dificuldade === undefined) {
          questoes[i].dificuldade = 1;
        }
      }
    }

    const questoesFechadas = [];
    const questoesProgramacao = [];
    const questoesParson = [];

    questoes.forEach((questao) => {
      if (questao instanceof QuestaoFechada) {
        questoesFechadas.push(questao);
      } else if (questao instanceof QuestaoProgramacao) {
        questoesProgramacao.push(questao);
      } else if (questao instanceof QuestaoParsonProblem) {
        questoesParson.push(questao);
      }
    });

    this.questoesFechadas = questoesFechadas;
    this.questoesProgramacao = questoesProgramacao;
    this.questoesParson = questoesParson;
  }

  getUltimaSequencia() {
    return (
      this.questoesFechadas.length +
      this.questoesProgramacao.length +
      this.questoesParson.length +
      1
    );
  }

  /* Retorna as questões de um assunto ordenadas por sua sequência. */
  ordenarQuestoes() {
    let questoes = new Array(
      this.questoesFechadas.length + this.questoesProgramacao.length + this.questoesParson.length
    );
    questoes = questoes.fill(0);

    this.questoesFechadas.forEach((questao) => {
      questoes[questao.sequencia - 1] = questao;
    });

    this.questoesProgramacao.forEach((questao) => {
      questoes[questao.sequencia - 1] = questao;
    });

    this.questoesParson.forEach((questao) => {
      questoes[questao.sequencia - 1] = questao;
    });

    return questoes;
  }

  objectToDocument() {
    const document = super.objectToDocument();

    if (Array.isArray(this.questoesProgramacao) != null && this.questoesProgramacao.length > 0) {
      const questoes = [];
      this.questoesProgramacao.forEach((questao) => {
        if (typeof questao.objectToDocument === 'function') {
          questoes.push(questao.objectToDocument());
        }
      });

      document['questoesProgramacao'] = questoes;
    }

    if (Array.isArray(this.questoesFechadas) != null && this.questoesFechadas.length > 0) {
      const questoesFechadas = [];
      this.questoesFechadas.forEach((questao) => {
        if (typeof questao.objectToDocument === 'function') {
          questoesFechadas.push(questao.objectToDocument());
        }
      });

      document['questoesFechadas'] = questoesFechadas;
    }

    if (Array.isArray(this.questoesParson) && this.questoesParson.length > 0) {
      const questoesParson = [];
      this.questoesParson.forEach((questao) => {
        if (typeof questao.objectToDocument === 'function') {
          questoesParson.push(questao.objectToDocument());
        }
      });

      document['questoesParson'] = questoesParson;
    }

    if (Array.isArray(this.questoesColaborativas) && this.questoesColaborativas.length > 0) {
      const questoesColaborativas = [];
      this.questoesColaborativas.forEach((questao) => {
        if (typeof questao.objectToDocument === 'function') {
          questoesColaborativas.push(questao.objectToDocument());
        }
      });

      document['questoesColaborativas'] = questoesColaborativas;
    }

    if (this.objetivosEducacionais.length > 0) {
      document['questoeobjetivosEducacionaisFechadas'] = this.objetivosEducacionais;
    }

    return document;
  }

  getQuestaoProgramacaoById(questaoId) {
    let questaoLocalizada = null;
    this.questoesProgramacao.forEach((questao) => {
      if (questao.id == questaoId) {
        questaoLocalizada = questao;
      }
    });

    return questaoLocalizada;
  }

  getQuestaoColaborativaById(questaoId):QuestaoColaborativa | null {
    let questaoLocalizada = null;
    this.questoesColaborativas.forEach((questao) => {
      if (questao.id == questaoId) {
        questaoLocalizada = questao;
      }
    });

    return questaoLocalizada;
  }

  getQuestaoFechadaById(questaoId) {
    let questaoLocalizada = null;
    this.questoesFechadas.forEach((questao) => {
      if (questao.id == questaoId) {
        questaoLocalizada = questao;
      }
    });

    return questaoLocalizada;
  }

  getQuestaoParsonById(questaoId) {
    let questaoLocalizada = null;
    this.questoesParson.forEach((questao) => {
      if (questao.id == questaoId) {
        questaoLocalizada = questao;
      }
    });

    return questaoLocalizada;
  }

  validar() {
    if (this.nome == undefined || this.nome == null) {
      return false;
    }

    return true;
  }
}
