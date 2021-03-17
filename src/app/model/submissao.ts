import { QuestaoProgramacao } from './questoes/questaoProgramacao';
import { Document, Collection, date, ignore } from './firestore/document';
import Erro from './errors/erro';
import { Observable, forkJoin } from 'rxjs';
import Query from './firestore/query';
import Usuario from './usuario';
import ResultadoTestCase from './resultadoTestCase';
import ErroCompilacaoFactory from './errors/analise-compilacao/erroCompilacaoFactory';
import { ErroCompilacao } from './errors/analise-compilacao/erroCompilacao';
import { Assunto } from './assunto';

@Collection('submissoes')
export default class Submissao extends Document {
  constructor(id, public codigo: string, public estudante: Usuario, public assunto:Assunto, public questao: QuestaoProgramacao) {
    super(id);
    
    this.erro = null;
    this.resultadosTestsCases = [];
  }

  @date()
  data;
  erro;
  resultadosTestsCases: ResultadoTestCase[];
  @ignore()
  saida;

  /**
   * Recupera todos os usuários que realizaram submissão
   * @param questao
   */
  static getSubmissoesRecentesTodosUsuarios(
    questao: QuestaoProgramacao,
    usuarioLogado: Usuario
  ): Observable<any[]> {
    return new Observable((observer) => {
      Submissao.getAll(new Query('questaoId', '==', questao.id)).subscribe((resultado) => {
        // eliminar a submissao do próprio estudante
        let submissoes = resultado.filter((sub) => {
          if (sub.estudanteId !== usuarioLogado.pk()) {
            return true;
          }
        });

        submissoes = this.filtrarSubmissoesConcluidas(submissoes);
        submissoes = this.agruparPorEstudante(submissoes);
        observer.next(submissoes);
        observer.complete();
      });
    });
  }

  /*
    Recupera os exercícios em que o estudante trabalhou na última semana.
    Para isso são analisadas as submissões que ele realizou.
  */
  static getExerciciosTrabalhadosUltimaSemana(estudante: Usuario) {
    return new Observable((observer) => {
      Submissao.getAll(new Query('estudanteId', '==', estudante.pk())).subscribe((submissoes) => {
        // Filtrar apenas da ultima semana
        const semanaAtras = new Date();
        semanaAtras.setDate(new Date().getDate() - 7);
        const submissoesFiltradas = this.filtrarSubmissoesPorData(
          submissoes,
          new Date(),
          semanaAtras
        );
        const questoes = this.getQuestoesDeSubmissoes(submissoesFiltradas);
        observer.next(questoes);
        observer.complete();
        // Verificar das submissoes quantas questões foram trabalhadas
      });
    });
  }

  static getQuestoesDeSubmissoes(submissoes) {
    const questoes = [];

    if (Array.isArray(submissoes) && submissoes.length > 0) {
      submissoes.forEach((submissao) => {
        if (!questoes.includes(submissao.questaoId)) {
          questoes.push(submissao.questaoId);
        }
      });
    }

    return questoes;
  }

  static filtrarSubmissoesPorData(submissoes: any[], dataInicio, dataFim) {
    const submissoesFiltradas = [];
    if (Array.isArray(submissoes) && submissoes.length > 0) {
      const intervaloDatas = this.getDaysArray(dataFim, dataInicio);

      intervaloDatas.forEach((data) => {
        submissoes.forEach((submissao) => {
          const date = submissao.data.toDate();

          if (date.toDateString() === data.toDateString()) {
            submissoesFiltradas.push(submissao);
          }
        });
      });
    }

    return submissoesFiltradas;
  }

  static getDaysArray = function (start, end): any[] {
    const datas = [];
    for (const dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
      datas.push(new Date(dt));
    }
    return datas;
  };

  private static agruparPorEstudante(submissoes: Submissao[]) {
    const submissoesAgrupadas = {};
    submissoes.forEach((submissao) => {
      if (submissoesAgrupadas[submissao['estudanteId']] == undefined) {
        submissoesAgrupadas[submissao['estudanteId']] = [];
      }

      submissoesAgrupadas[submissao['estudanteId']].push(submissao);
    });

    const submissoesRecentesAgrupadas = [];

    Object.keys(submissoesAgrupadas).forEach((estudanteId) => {
      submissoesRecentesAgrupadas.push(this.filtrarRecente(submissoesAgrupadas[estudanteId]));
    });

    return submissoesRecentesAgrupadas;
  }

  static agruparPorQuestao(submissoes: Submissao[]): Map<string, []> {
    const submissoesAgrupadas = new Map();
    submissoes.forEach((submissao) => {
      if (submissoesAgrupadas.get(submissao['questaoId']) === undefined) {
        submissoesAgrupadas.set(submissao['questaoId'], []);
      }

      submissoesAgrupadas.get(submissao['questaoId']).push(submissao);
    });

    return submissoesAgrupadas;
  }

  static filtrarSubmissoesConcluidas(submissoesQuestao = []) {
    // Filtrando todas as submissões que o seu resultadosTestsCase não seja undefined.
    const submissaoFiltrada = submissoesQuestao
      .filter((submissao) => {
        return submissao.resultadosTestsCases !== undefined;
      })
      .filter((submissao) => {
        // Filtrando toda as submissões que tem todos os seus testsCases com status true (significa que a questão foi finalizada)

        // Retorna um array vazio caso o resultadosTestsCases tenha todos os elementos com status true. Caso não, o array vai retornar
        // com pelo menos um elemento com status false
        const filterFalseTestsCases = submissao.resultadosTestsCases.filter(
          (el) => el.status === false
        );

        // Se a submissão tiver todos seus status true, então retorne-a
        if (filterFalseTestsCases.length === 0) {
          return submissao;
        }
      });

    return submissaoFiltrada;
  }

  static filtrarRecente(submissoes = []) {
    let submissaoRecente = null;
    if (submissoes.length != 0) {
      if (submissoes.length == 1) {
        submissaoRecente = submissoes[0];
      } else {
        submissoes.forEach((submissao) => {
          if (submissaoRecente == null) {
            submissaoRecente = submissao;
          } else {
            if (submissaoRecente.data.toDate().getTime() <= submissao.data.toDate().getTime()) {
              submissaoRecente = submissao;
            }
          }
        });
      }
    }

    return submissaoRecente;
  }

  /**
   * Recupera a submissão mais recente de um estudante para uma questão.
   */
  static getRecentePorQuestao(questao: QuestaoProgramacao, estudante: Usuario) {
    return new Observable((observer) => {
      this.getPorQuestao(questao, estudante).subscribe((submissoes) => {
        const submissaoRecente = this.filtrarRecente(submissoes);

        observer.next(submissaoRecente);
        observer.complete();
      });
    });
  }

  /**
   * Recupera as submissões para uma questão.
   */
  static getPorQuestao(questao: QuestaoProgramacao, estudante: Usuario): Observable<any[]> {
    return new Observable((observer) => {
      if (
        questao == null ||
        typeof questao.id == null ||
        estudante == null ||
        typeof estudante.pk != 'function'
      ) {
        observer.error(new Error('Questão ou estudante não podem ser vazios'));
      } else {
        Submissao.getAll([
          new Query('estudanteId', '==', estudante.pk()),
          new Query('questaoId', '==', questao.id),
        ]).subscribe((submissoes) => {
          observer.next(submissoes);
          observer.complete();
        });
      }
    });
  }

  static get(id) {
    return new Observable((observer) => {
      super.get(id).subscribe(
        (submissao) => {
          submissao['resultadosTestsCases'] = ResultadoTestCase.construir(
            submissao['resultadosTestsCases']
          );
          submissao['erro'] = ErroCompilacaoFactory.construirPorDocument(submissao['erro']);
          observer.next(submissao);
          observer.complete();
          /*ErroCompilacao.getAll(new Query("submissaoId", "==", submissao["id"])).subscribe(erros => {
                    submissao["erros"] = erros;
                }, err => {

                }, () => {
                    observer.next(submissao);
                    observer.complete();
                });*/
        },
        (err) => {
          observer.error(err);
        }
      );
    });
  }

  static getAll(queries = null, orderBy = null) {
    return new Observable<any[]>((observer) => {
      super.getAll(queries).subscribe(
        (submissoes) => {
          // let erros: any[] = [];
          submissoes.forEach((submissao) => {
            // erros.push(ErroCompilacao.getAll(new Query("submissaoId", "==", submissao.pk())));
            submissao.resultadosTestsCases = ResultadoTestCase.construir(
              submissao.resultadosTestsCases
            );
            submissao['erro'] = ErroCompilacaoFactory.construirPorDocument(submissao['erro']);
          });

          observer.next(submissoes);
          observer.complete();
        },
        (err) => {
          observer.error(err);
        }
      );
    });
  }

  /**
   * Extrai todos os erros cometidos pelo estudante em suas submissões.
   * @param submissoes
   */
  static getAllErros(submissoes): ErroCompilacao[] {
    const erros: ErroCompilacao[] = [];
    submissoes.forEach((submissao) => {
      if (submissao.erro != null && submissao.erro instanceof ErroCompilacao) {
        erros.push(submissao.erro);
      }
    });

    return erros;
  }

  /*analisarErros() {
        this.erros = [];
        this.erros = this.erros.concat(ErroSintaxeVariavel.erros(this));
        this.erros = this.erros.concat(ErroSintaxeCondicional.erros(this));
        this.erros = this.erros.concat(ErroSintaxeFuncao.erros(this));

    }

    hasErrors() {

        if (this.erros.length > 0) {
            return true;
        }

        return false;
    }*/

  objectToDocument() {
    const document = super.objectToDocument();
    
    if(this.estudante != null && this.estudante.pk() != null){
      document['estudanteId'] = this.estudante.pk();
    }

    if(this.questao != null && this.questao.id != null){
      document['questaoId'] = this.questao.id;
    }

    if(this.assunto != null && this.assunto.pk() != null){
      document['assuntoId'] = this.assunto.pk();
    }
    
    
    document['codigo'] = this.codigo;
    if (this.erro != null && this.erro instanceof ErroCompilacao) {
      document['erro'] = this.erro.objectToDocument();
    }
    if (this.resultadosTestsCases != null && this.resultadosTestsCases.length > 0) {
      const resultadoTestsCases = [];
      this.resultadosTestsCases.forEach((resultadoTestCase) => {
        resultadoTestsCases.push(resultadoTestCase.objectToDocument());
      });
      document['resultadosTestsCases'] = resultadoTestsCases;
    }
    return document;
  }

  toJson() {
    return {
      codigo: this.codigo,
    };
  }

  /**
   * Constrói o JSON que será enviado ao backend.
   */
  construirJson(questao: QuestaoProgramacao, tipo) {
    const json = {};
    json['submissao'] = this.toJson();
    json['tipo'] = tipo;
    json['questao'] = questao.toJson();

    return json;
  }

  construirJsonVisualizacao(questao: QuestaoProgramacao, testCase) {
    const json = {};
    json['submissao'] = this.toJson();
    json['tipo'] = "visualização";
    json['questao'] = questao.toJson(true, testCase.id);

    return json;
  }

  isFinalizada() {
    if (this.resultadosTestsCases != null && this.resultadosTestsCases.length > 0) {
      let sucesso = true;
      this.resultadosTestsCases.forEach((resultadoTestCase) => {
        if (!resultadoTestCase.status) {
          sucesso = false;
        }
      });
      return sucesso;
    } else {
      return null;
    }
  }

  linhasAlgoritmo() {
    if (this.codigo != undefined) {
      return this.codigo.split('\n');
    }

    return [];
  }

  processarRespostaServidor(resposta) {
    return new Observable((observer) => {
      this.resultadosTestsCases = ResultadoTestCase.construir(resposta.resultados);
      // this.saida = resposta.saida
      this.save().subscribe((resultado) => {
        // salva novamente, pois agora há dados sobre os resultadosTestsCases
        observer.next(resultado);
        observer.complete();
      });
    });
  }

  /**
   * Houve um erro de programação ao submeter o algoritmo, realiza os procedimentos adequados a partir disto.
   * @param resposta
   */
  processarErroServidor(resposta) {
    return new Observable((observer) => {
      this.invalidarResultadosTestCases();
      if (ErroCompilacao.isErro(resposta)) {
        this.erro = ErroCompilacaoFactory.construir(resposta);

        this.save().subscribe((resultado) => {
          observer.next(resultado);
          observer.complete();
        });
      }
    });
  }

  /**
   * Anula os testscases quando há um erro no algoritmo/servidor.
   */
  invalidarResultadosTestCases() {
    this.questao.testsCases.forEach((testCase) => {
      this.resultadosTestsCases.push(new ResultadoTestCase(null, false, null, testCase));
    });
  }

  validar() {
    if (this.codigo == '') {
      return false;
    }

    return true;
  }

  getStatusTestCase(testCase) {
    if (this.resultadosTestsCases.length > 0) {
      let resultado = false;
      for (let i = 0; i < this.resultadosTestsCases.length; i++) {
        if (this.resultadosTestsCases[i].testCase != null) {
          if (this.resultadosTestsCases[i].testCase.id == testCase.id) {
            resultado = this.resultadosTestsCases[i].status;
            break;
          }
        }
      }

      return resultado;
    }

    return null;
  }

  getResultadoTestcase(testCase) {
    if (this.resultadosTestsCases.length > 0) {
      let resultado = null;
      for (let i = 0; i < this.resultadosTestsCases.length; i++) {
        if (this.resultadosTestsCases[i].testCase != null) {
          if (this.resultadosTestsCases[i].testCase.id == testCase.id) {
            resultado = this.resultadosTestsCases[i];
            break;
          }
        }
      }

      return resultado;
    }

    return null;
  }
}
