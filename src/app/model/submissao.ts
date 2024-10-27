
import { Document, Collection, date, ignore } from './firestore/document';
import Erro from './errors/erro';
import { Observable, forkJoin } from 'rxjs';
import Query from './firestore/query';
import Usuario from './usuario';
import ResultadoTestCase from './resultadoTestCase';
import ErroCompilacaoFactory from './errors/analise-compilacao/erroCompilacaoFactory';
import { ErroCompilacao } from './errors/analise-compilacao/erroCompilacao';
import { Assunto } from './aprendizagem/questoes/assunto';
import { keyframes } from '@angular/animations';
import { Cacheable } from 'ts-cacheable';
import { Util } from './util';
import { database } from 'firebase/compat';
import { QuestaoProgramacao } from './aprendizagem/questoes/questaoProgramacao';
import RespostaBase from './aprendizagem/questoes/respostaBase';

@Collection('submissoes')
export default class Submissao extends Document implements RespostaBase{
  constructor(
    id,
    public codigo: string,
    public estudante: Usuario,
    public assunto: Assunto,
    public questao: QuestaoProgramacao
  ) {
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
  /* static getSubmissoesRecentesTodosUsuarios(
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

        submissoes = this.filtrarSubmissoesConclusao(submissoes);
        submissoes = this.agruparRecentePorEstudante(submissoes);
        observer.next(submissoes);
        observer.complete();
      });
    });
  }
 */
  static toArray(submissoes:Submissao[]){

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

  static fromJson(submissaoJson: any) {
    let submissao = new Submissao(
      submissaoJson.id,
      submissaoJson.codigo,
      Usuario.fromJson({ id: submissaoJson.estudante }),
      Assunto.fromJson({ id: submissaoJson.assuntoId, nome: '' }),
      new QuestaoProgramacao(submissaoJson.questaoId, '', '', 1, 1, [], null, '', null, [])
    );

    submissao.resultadosTestsCases = [];
    submissao['questaoId'] = submissaoJson.questaoId;
    if (Array.isArray(submissaoJson.resultadosTesteCase)) {
      submissaoJson.resultadosTesteCase.forEach((r) => {
        let resultado = ResultadoTestCase.fromJson(r);
        submissao.resultadosTestsCases.push(resultado);
      });
    };

    if(submissaoJson.data != null){
      submissao.data = new Date(submissaoJson.data);
    }

    if (submissaoJson.erro != null) {
      submissao.erro = {data:submissaoJson.erro.data, id:submissaoJson.erro.id, traceback:submissaoJson.erro.traceback}
    }

    submissao.data = new Date(submissao.data);

    return submissao;
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

  static agruparPorEstudante(submissoes: Submissao[]): Map<string, Submissao[]> {
    const submissoesAgrupadas = new Map<string, Submissao[]>();
    submissoes.forEach((submissao) => {

      if(submissao['estudanteId'] == null && submissao['estudante'] != null){
        submissao['estudanteId'] = submissao['estudante'];
      }

      if (submissoesAgrupadas.get(submissao['estudanteId']) === undefined) {
        submissoesAgrupadas.set(submissao['estudanteId'], []);
      }

      submissoesAgrupadas.get(submissao['estudanteId']).push(submissao);
    });

    return submissoesAgrupadas;
  }

  static agruparRecentePorEstudante(submissoes: Submissao[]): Map<string, Submissao> {
    let submissoesRecentesAgrupadas: Map<string, Submissao> = new Map();
    if(Array.isArray(submissoes)){
      const submissoesAgrupadas = this.agruparPorEstudante(submissoes);
      submissoesAgrupadas.forEach((submissoes, estudanteId) => {
        submissoesRecentesAgrupadas.set(estudanteId, this.filtrarRecente(submissoesAgrupadas.get(estudanteId)));
      });
    }
    return submissoesRecentesAgrupadas;
  }

  static agruparPorQuestao(submissoes: Submissao[]): Map<string, any[]> {
    const submissoesAgrupadas = new Map();
    submissoes.forEach((submissao) => {
      if (submissoesAgrupadas.get(submissao['questaoId']) === undefined) {
        submissoesAgrupadas.set(submissao['questaoId'], []);
      }

      submissoesAgrupadas.get(submissao['questaoId']).push(submissao);
    });

    return submissoesAgrupadas;
  }

  /**
   * Retorna apenas uma submissão por questão, sendo escolhida aquela que tiver status de completado, se houver.
   * @param submissoes
   */
  static getSubmissoesUnicas(submissoes) {
    let submissoesConcluidas = this.filtrarSubmissoesConclusao(submissoes);
    let submissoesAgrupadas = this.agruparPorQuestao(submissoesConcluidas);
    let submissoesUnicas = [];
    submissoesAgrupadas.forEach((v, k) => {
      if (v.length != 0) {
        submissoesUnicas.push(v[0]);
      }
    });

    return submissoesUnicas;
  }

  static filtrarSubmissoesConclusao(submissoesQuestao = [], status = false):Submissao[] {
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
          (el) => el.status === status
        );

        // Se a submissão tiver todos seus status true, então retorne-a
        if (filterFalseTestsCases.length === 0) {
          return submissao;
        }
      });

    return submissaoFiltrada;
  }

  static _orderByDate(submissoes: Submissao[]) {
    submissoes.sort((s1, s2) => {
      if (s1.data != null && s2.data != null && s1.data != "" && s2.data != "") {
        let dataS1 = null;
        let dataS2 = null;
        if(s1.data.toDate != null && s2.data.toDate != null){
          dataS1 = s1.data.toDate();
          dataS2 = s2.data.toDate();
        }else{
          dataS1 = new Date(s1.data);
          dataS2 = new Date(s2.data);
        }

        if (dataS1.getTime() < dataS2.getTime()) {
          return -1;
        } else if (dataS1.getTime() > dataS2.getTime()) {
          return 1;
        } else {
          return 0;
        }


      }
      return 0;
    });
  }

  //
  static filtrarDataRange(submissoes:Submissao[], dataInicio, dataTermino){
    return submissoes.filter((submissao)=>{
      let dataSubmissao = new Date(submissao.data).getTime();
      if(dataSubmissao >= dataInicio.getTime() && dataSubmissao <= dataTermino.getTime()){
        return true;
      }else{
        return false;
      }
    });
  }

  static filtrarRecente(submissoes = []):Submissao {
    Submissao._orderByDate(submissoes);

    let submissaoRecente = null;
    if (submissoes.length != 0) {
      if (submissoes.length == 1) {
        submissaoRecente = submissoes[0];
      } else {
        submissoes.forEach((submissao) => {
          if (submissaoRecente == null) {
            submissaoRecente = submissao;
          } else {

            if (submissaoRecente.data != null && submissao.data != null && submissaoRecente.data != "" && submissao.data != "") {
              if (submissaoRecente.data.toDate().getTime() <= submissao.data.toDate().getTime()) {
                submissaoRecente = submissao;
              }
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

  static getSubmissaoConcluidaPorQuestao(questao:QuestaoProgramacao){
    return new Observable((observer) => {
      if (questao != null){
        Submissao.getAll([
          new Query('questaoId', '==', questao.id),
          new Query("estudantes", "array-contains", {status:true})
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

  //@Cacheable()
  static getAll(queries = null, orderBy = null) {
    return new Observable<any[]>((observer) => {
      super.getAll(queries, orderBy).subscribe(
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



  static documentToObject(document) {
    let submissao = new Submissao(
      document.id,
      document.codigo,
      Usuario.fromJson({ id: document.estudanteId }),
      Assunto.fromJson({ id: document.assuntoId, nome: '' }),
      new QuestaoProgramacao(document.questaoId, '', '', 1, 1, [], null, '', null, [])
    );
    submissao.resultadosTestsCases = [];
    submissao['questaoId'] = document.questaoId;
    if (Array.isArray(document.resultadosTestsCases)) {
      document.resultadosTestsCases.forEach((r) => {
        let resultado = ResultadoTestCase.fromJson(r);
        submissao.resultadosTestsCases.push(resultado);
      });
    }

    if (document.erro != null) {
      submissao.erro = {data:document.erro.data, id:document.erro.id, traceback:document.erro.traceback}
    }

    return submissao;
  }

  objectToDocument() {
    const document = super.objectToDocument();

    if (this.estudante != null && this.estudante.pk() != null) {
      document['estudanteId'] = this.estudante.pk();
    }

    if (this.questao != null && this.questao.id != null) {
      document['questaoId'] = this.questao.id;
    }

    if (this.assunto != null && this.assunto.pk() != null) {
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
      resultadosTesteCase: this.resultadosTestsCases,
      assuntoId: this['assuntoId'],
      erro:this.erro,
      data: Util.firestoreDateToDate(this.data),
      estudante: this['estudanteId'],
      codigo: this.codigo,
      questaoId: this['questaoId'],
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
    json['tipo'] = 'visualização';
    json['questao'] = questao.toJson(true, testCase.id);

    return json;
  }

  hasErroSintaxe(){
    if(this.erro != null){
      return true;
    }else{
      return false;
    }
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
    this.resultadosTestsCases = ResultadoTestCase.construir(resposta.resultados);
  }

  /**
   * Houve um erro de programação ao submeter o algoritmo, realiza os procedimentos adequados a partir disto.
   * @param resposta
   */
  processarErroServidor(resposta) {
    this.invalidarResultadosTestCases();
    if (ErroCompilacao.isErro(resposta)) {
      this.erro = ErroCompilacaoFactory.construir(resposta);
    }
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
