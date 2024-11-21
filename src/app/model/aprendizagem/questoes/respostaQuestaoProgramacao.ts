
import { Document, Collection, date, ignore } from '../../database/document';
import Erro from '../../errors/erro';
import { Observable, forkJoin } from 'rxjs';
import Query from '../../database/query';
import Usuario from '../../usuario';
import ResultadoTestCase from '../../resultadoTestCase';
import ErroCompilacaoFactory from '../../errors/analise-compilacao/erroCompilacaoFactory';
import { ErroCompilacao } from '../../errors/analise-compilacao/erroCompilacao';
import { Assunto } from './assunto';
import { keyframes } from '@angular/animations';
import { Cacheable } from 'ts-cacheable';
import { Util } from '../../util';
import { database } from 'firebase';
import { QuestaoProgramacao } from './questaoProgramacao';
import RespostaBase from './respostaBase';
import { ErrosExecucao } from '../../errors/analise-pre-compilacao/parseAlgoritmo';
import ErroProgramacao from './erroProgramacao';

export enum STATUS_RESPOSTA_QUESTAO_PROGRAMACAO {
  CONTEM_ERRO = "erro",
  TESTSCASES_RESPONDIDOS_SUCESSO = "resposta_correta",
  TESTSCASES_RESPONDIDOS_INSUCESSO = "resposta_incorreta",
  NAO_RESPONDIDA = "nao_respondida"
}

@Collection('respostaquestaoprogramacao')
export default class RespostaQuestaoProgramacao extends Document implements RespostaBase{
  constructor(
    primary_key,
    public codigo: string,
    public estudante: Usuario,
    public assunto: Assunto,
    public questao: QuestaoProgramacao
  ) {
    super(primary_key);

    this.erro = null;
    this.resultadosTestsCases = [];
  }

  @date()
  data;
  erro:ErroProgramacao;
  erros:ErrosExecucao;
  resultadosTestsCases: ResultadoTestCase[];
  @ignore()
  saida;
  status:STATUS_RESPOSTA_QUESTAO_PROGRAMACAO = STATUS_RESPOSTA_QUESTAO_PROGRAMACAO.NAO_RESPONDIDA;
  isRespostaCorreta:boolean;


  static toArray(submissoes:RespostaQuestaoProgramacao[]){

  }

  setErros(erros){
    this.erros = erros;
    this.invalidarResultadosTestCases();
    this.status = STATUS_RESPOSTA_QUESTAO_PROGRAMACAO.CONTEM_ERRO;
  }

  /*
    Recupera os exercícios em que o estudante trabalhou na última semana.
    Para isso são analisadas as submissões que ele realizou.
  */
  static getExerciciosTrabalhadosUltimaSemana(estudante: Usuario) {
    return new Observable((observer) => {
      RespostaQuestaoProgramacao.getAll(new Query('estudanteId', '==', estudante.pk)).subscribe((submissoes) => {
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

  static dataToObject(submissaoJson: any) {
    let submissao = new RespostaQuestaoProgramacao(
      submissaoJson.id,
      submissaoJson.codigo,
      submissaoJson.estudante,
      null,
      QuestaoProgramacao.dataToObject(submissaoJson.questao)
    );

    submissao.status = submissaoJson.status;
    submissao.isRespostaCorreta = submissaoJson.is_resposta_correta;
    submissao.resultadosTestsCases = [];
    

    if (Array.isArray(submissaoJson.resultados)) {
      submissaoJson.resultados.forEach((r) => {
        let resultado = ResultadoTestCase.fromJson(r);
        submissao.resultadosTestsCases.push(resultado);
      });
    };

    if(submissaoJson.data != null){
      submissao.data = new Date(submissaoJson.data);
    }

    if (Array.isArray(submissaoJson.erros) && submissaoJson.erros.length > 0) {
      submissao.erro = new ErroProgramacao(submissaoJson.erros[0].linha, submissaoJson.erros[0].mensagem, submissaoJson.erros[0].categoria)
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

  static agruparPorEstudante(submissoes: RespostaQuestaoProgramacao[]): Map<string, RespostaQuestaoProgramacao[]> {
    const submissoesAgrupadas = new Map<string, RespostaQuestaoProgramacao[]>();
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

  


  static filtrarRecente(questao:QuestaoProgramacao | string): Observable<RespostaQuestaoProgramacao> {
    let questaoId = null;
    if(questao instanceof QuestaoProgramacao && questao.pk != null){
      questaoId = questao.pk;
    }else{
      questaoId = questao;
    }

    return RespostaQuestaoProgramacao.getByQuery([new Query("questao_id", "==", questaoId), new Query("recente", "==", true)]);
  }

  static agruparPorQuestao(submissoes: RespostaQuestaoProgramacao[]): Map<string, any[]> {
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

  static filtrarSubmissoesConclusao(submissoesQuestao = [], status = false):RespostaQuestaoProgramacao[] {
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

  static _orderByDate(submissoes: RespostaQuestaoProgramacao[]) {
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



  /**
   * Recupera as submissões para uma questão.
   */
  static getPorQuestao(questao: QuestaoProgramacao, estudante: Usuario): Observable<any[]> {
    return new Observable((observer) => {
      if (
        questao == null ||
        typeof questao.pk == null ||
        estudante == null ||
        typeof estudante.pk != 'function'
      ) {
        observer.error(new Error('Questão ou estudante não podem ser vazios'));
      } else {
        RespostaQuestaoProgramacao.getAll([
          new Query('estudanteId', '==', estudante.pk),
          new Query('questaoId', '==', questao.pk),
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
        RespostaQuestaoProgramacao.getAll([
          new Query('questaoId', '==', questao.pk),
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
    let submissao = new RespostaQuestaoProgramacao(
      document.id,
      document.codigo,
      Usuario.fromJson({ id: document.estudanteId }),
      Assunto.fromJson({ id: document.assuntoId, nome: '' }),
      new QuestaoProgramacao(document.questaoId, '', '', 1, 1, [], null, '', null, [])
    );
    submissao.resultadosTestsCases = [];
    submissao.questao = document.questao;
    submissao.erro = document.erro;
    if (Array.isArray(document.resultadosTestsCases)) {
      document.resultadosTestsCases.forEach((r) => {
        let resultado = ResultadoTestCase.fromJson(r);
        submissao.resultadosTestsCases.push(resultado);
      });
    }

    

    return submissao;
  }

  objectToDocument() {
    const document = super.objectToDocument();


    if (this.questao != null && this.questao.pk != null) {
      document['questao_id'] = this.questao.pk;
    }

    document['codigo'] = this.codigo;
    if (this.erro != null) {
      document['erro'] = this.erro.objectToDocument();
    }
    if (this.resultadosTestsCases != null && this.resultadosTestsCases.length > 0) {
      const resultadoTestsCases = [];
      this.resultadosTestsCases.forEach((resultadoTestCase) => {
        resultadoTestsCases.push(resultadoTestCase.objectToDocument());
      });
      document['resultados_test_cases'] = resultadoTestsCases;
    }

    document['is_resposta_correta'] = this.isRespostaCorreta;

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
  construirJson(questao: QuestaoProgramacao, tipo):any {
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

  atualizarResultados(resposta) {
    this.resultadosTestsCases = ResultadoTestCase.construir(resposta.resultados);
    this.status = this.isFinalizada() ? STATUS_RESPOSTA_QUESTAO_PROGRAMACAO.TESTSCASES_RESPONDIDOS_SUCESSO : STATUS_RESPOSTA_QUESTAO_PROGRAMACAO.TESTSCASES_RESPONDIDOS_INSUCESSO;
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
