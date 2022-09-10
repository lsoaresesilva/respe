import { forkJoin, Observable } from 'rxjs';
import Query from '../firestore/query';
import Submissao from '../submissao';
import VisualizacaoQuestao from './visualizacaoQuestao';
import TempoOnline from './tempoOnline';
import PageTrackRecord from './pageTrack';
import { PageTrack } from '../../guards/pageTrack.guard';
import Turma from '../turma';
import Usuario from '../usuario';
import { RespostaQuestaoFechada } from '../aprendizagem/questoes/respostaQuestaoFechada';
import AnalyticsProgramacao from './analyticsProgramacao';
import { Assunto } from '../aprendizagem/questoes/assunto';
import QuestaoFechada from '../aprendizagem/questoes/questaoFechada';
import MapeamentoErrosConceituais from './mapeamentoErrosConceituais';
import Conceito from '../aprendizagem/questoes/conceito';
import RespostasQuestoes from '../aprendizagem/questoes/respostasQuestoes';
import { MaterialAprendizagem } from '../aprendizagem/materialAprendizagem';
import { QuestaoProgramacao } from '../aprendizagem/questoes/questaoProgramacao';

export default class Analytics {
  // TODO: Fazer apenas um carregamento de assunto e usar par atudo aqui.

  // Analytics do estudante
  progresoGeral;
  progressoQuestoesProgramacao;
  progressoQuestoesFechadas;
  percentualVisualizacaoQuestoesFechadas;
  totalErrosProgramacao;
  errosProgramacao;
  mediaSubmissoesParaAcerto;
  totalExecucoes;
  tempoOnline;
  tentativasQuestoes;
  visualizacoesProgresso;

  errosConceituais: Map<Assunto, Map<string, number>>;

  private constructor() {}

  static init(estudante): Observable<Analytics> {
    return new Observable((observer) => {
      if (estudante != null && estudante.pk() != null) {
        const consultasGerais = {};
        consultasGerais['assuntos'] = Assunto.getAll();
        /* consultasGerais['submissoes'] = Submissao.getAll(
          new Query('estudanteId', '==', estudante.pk())
        ); */
        consultasGerais['pageTrack'] = PageTrackRecord.getAll([
          new Query('estudanteId', '==', estudante.pk()),
          new Query('pagina', '==', 'meu-desempenho'),
        ]);

        forkJoin(consultasGerais).subscribe((resultadosConsultasGerais: any) => {
          const assuntos = resultadosConsultasGerais.assuntos;
          //const submissoes = resultadosConsultasGerais.submissoes;
          const tempoOnline = resultadosConsultasGerais.tempoOnline;
          const pageTracks = resultadosConsultasGerais.PageTrack;

          const consultas = {};

          Assunto.consultarRespostasEstudante(estudante).subscribe((respostas) => {
            const analytics: Analytics = this.getAnalytics(assuntos, respostas);
            observer.next(analytics);
            observer.complete();
          });
        });
      } else {
        observer.error('É preciso informar um estudante para calcular o seu analytics');
      }
    });
  }

  static getAnalytics(assuntos, respostas: RespostasQuestoes) {
    const analytics = new Analytics();
    analytics.totalErrosProgramacao = AnalyticsProgramacao.calcularMediaErrosSintaxeProgramacao(
      respostas.questoesProgramacao.submissoes
    );
    analytics.mediaSubmissoesParaAcerto = AnalyticsProgramacao.calcularMediaSubmissoesParaAcerto(
      respostas.questoesProgramacao.submissoes
    );
    analytics.totalExecucoes = AnalyticsProgramacao.calcularExecucoes(
      respostas.questoesProgramacao.submissoes
    );

    analytics.tentativasQuestoes = AnalyticsProgramacao.calculaTentativasQuestoes(
      respostas.questoesProgramacao.submissoes
    );
    //analytics.visualizacoesProgresso = this.calculaVisualizacoesProgresso(pageTracks);
    analytics.errosProgramacao = Submissao.getAllErros(respostas.questoesProgramacao.submissoes);
    analytics.progressoQuestoesProgramacao = this.calcularProgressoQuestoesProgramacao(
      assuntos,
      respostas.questoesProgramacao.submissoes,
      respostas.questoesProgramacao.visualizacoesRespostas
    );
    analytics.progressoQuestoesFechadas = this.calcularProgressoQuestoesFechadas(
      assuntos,
      respostas.questoesFechadas
    );
    analytics.progresoGeral = this.calcularProgressoGeral(assuntos, respostas);
    return analytics;
  }

  static getAnalyticsTurma(estudantes: Usuario[]):Observable<Analytics> {
    return new Observable<Analytics>((observer) => {
      const consultaRespostas: Observable<RespostasQuestoes>[] = [];
      estudantes.forEach((estudante) => {
        consultaRespostas.push(Assunto.consultarRespostasEstudante(estudante));
      });

      forkJoin(consultaRespostas).subscribe((respostas) => {
        Assunto.getAll().subscribe((assuntos) => {
          const analytics: Analytics = new Analytics();
          let submissoes = [];
          let respostasQuestoesFechadas = [];
          let respostasQuestoesParson = [];

          respostas.forEach((resposta) => {
            submissoes = [...submissoes, ...resposta.questoesProgramacao.submissoes];
          });

          respostas.forEach((resposta) => {
            respostasQuestoesFechadas = [
              ...respostasQuestoesFechadas,
              ...resposta.questoesFechadas,
            ];
          });

          respostas.forEach((resposta) => {
            respostasQuestoesParson = [...respostasQuestoesParson, ...resposta.questoesParson];
          });

          let respostasTurma: RespostasQuestoes = new RespostasQuestoes();
          respostasTurma.questoesFechadas = respostasQuestoesFechadas;
          respostasTurma.questoesParson = respostasQuestoesParson;
          respostasTurma.questoesProgramacao = {
            submissoes: submissoes,
            visualizacoesRespostas: [],
          };

          analytics.errosProgramacao = Submissao.getAllErros(submissoes);
          analytics.errosConceituais = this.calcularErrosConceituais(assuntos, respostasTurma);
          observer.next(analytics);
          observer.next(analytics);
        });
      });
    });
  }

  public static calcularErroNoAssunto(assunto: Assunto, respostas) {}

  public static calcularErrosConceituais(
    assuntos: Assunto[],
    respostas: RespostasQuestoes
  ): Map<Assunto, Map<string, number>> {
    const percentuais: Map<Assunto, Map<string, number>> = new Map();
    assuntos.forEach((assunto) => {
      const mapeamento: Map<string, number> = new Map();
      this.calcularErrosConceituaisQuestoes(assunto.questoesFechadas, respostas.questoesFechadas, mapeamento);
      this.calcularErrosConceituaisQuestoes(assunto.questoesProgramacao, respostas.questoesProgramacao.submissoes, mapeamento);
      percentuais.set(assunto, mapeamento);
    });

    return percentuais;
  }

  static calcularErrosConceituaisQuestoes(
    questoes: MaterialAprendizagem[],
    respostas: any[],
    mapeamento: Map<string, number>
  ) {
    if (
      questoes != null &&
      Array.isArray(questoes) &&
      Array.isArray(respostas)
    ) {

      function atualizarMapeamento(questao){
        if(Array.isArray(questao.conceitos)){
          questao.conceitos.forEach((conceito) => {
            let mapConceito = mapeamento.get(conceito.id);
            if (mapConceito == null) {
              mapeamento.set(conceito.id, 0);
            }
            let quantidadeErrosDesteConceito = mapeamento.get(conceito.id);
            quantidadeErrosDesteConceito += 1;
            mapeamento.set(conceito.id, quantidadeErrosDesteConceito);

          });
        }
      }

      for (let i = 0; i < questoes.length; i++) {
        const questao = questoes[i];
        let resultado;
        if(questao instanceof QuestaoProgramacao){
          const submissoesAgrupadas = Submissao.agruparPorQuestao(respostas);
          const submissoesQuestao = submissoesAgrupadas.get(questao.id);
          const submissoesQuestaoPorEstudante = Submissao.agruparRecentePorEstudante(submissoesQuestao);
          submissoesQuestaoPorEstudante.forEach((submissao, estudanteId)=>{
            resultado = submissao.isFinalizada();
            if (!resultado) {
              atualizarMapeamento(questao);

            }
          });
        } else{
          respostas.forEach((resposta) => {
            if (resposta.questao.id === questao.id) {
              if(questao instanceof QuestaoFechada){
                resultado = questao.isRespostaCorreta(resposta);
              }
              if (!resultado) {
                atualizarMapeamento(questao);
              }
            }
          });
        }

        // TODO: Percorrer array de respostas. Para cada resposta errada, incluir o conceito

      }
      return mapeamento;
    } else {
      return null;
    }
  }

  public static calcularProgressoGeral(assuntos: Assunto[], respostas) {
    const percentuais = [];

    assuntos.forEach((assunto) => {
      percentuais.push(this.calcularProgressoNoAssunto(assunto, respostas));
    });
    return Analytics.calcularPercentual(percentuais, assuntos.length);
  }

  static calcularProgressoNoAssunto(assunto: Assunto, respostas: RespostasQuestoes) {
    let percentualConclusao = 0;

    percentualConclusao += this.calcularPercentualConclusaoQuestoesFechadas(
      assunto,
      respostas.questoesFechadas
    );

    percentualConclusao += this.calcularPercentualConclusaoQuestoesParson(
      assunto,
      respostas.questoesParson
    );

    /* percentualConclusao += this.calcularPercentualConclusaoQuestoesCorrecao(
      assunto,
      respostas.respostaQuestaoCorrecao
    ); */

    percentualConclusao += this.calcularPercentualConclusaoQuestoesProgramacao(
      assunto,
      Submissao.agruparPorQuestao(respostas.questoesProgramacao.submissoes),
      respostas.questoesProgramacao.visualizacoesRespostas,
      0.5
    );

    return percentualConclusao / 3; // Divide por dois, pois as questões parson e correção estavam com problema.
  }

  static _isQuestaoFechadaRespondidaSucesso(
    questaoFechada: QuestaoFechada,
    respostasQuestoesFechadas: RespostaQuestaoFechada[]
  ) {
    let resultado = false;

    for (let i = 0; i < respostasQuestoesFechadas.length; i++) {
      if (respostasQuestoesFechadas[i].questao.id === questaoFechada.id) {
        resultado = questaoFechada.isRespostaCorreta(respostasQuestoesFechadas[i]);
      }
    }

    return resultado;
  }

  static calcularPercentualConclusaoQuestoesFechadas(assunto: Assunto, respostasQuestoesFechadas) {
    if (
      assunto != null &&
      Array.isArray(assunto.questoesFechadas) &&
      Array.isArray(respostasQuestoesFechadas)
    ) {
      let totalRespostas = 0;
      for (let i = 0; i < assunto.questoesFechadas.length; i++) {
        const questao = assunto.questoesFechadas[i];
        const resultado = this._isQuestaoFechadaRespondidaSucesso(
          questao,
          respostasQuestoesFechadas
        );

        if (resultado) {
          totalRespostas++;
        }
      }
      const percentual = totalRespostas / assunto.questoesFechadas.length;

      return percentual;
    } else {
      return 0;
    }
  }

  static calcularPercentualConclusaoQuestoesParson(assunto: Assunto, respostasQuestoesParson) {
    if (
      assunto != null &&
      Array.isArray(assunto.questoesParson) &&
      Array.isArray(respostasQuestoesParson)
    ) {
      let totalRespostas = 0;
      for (let i = 0; i < assunto.questoesParson.length; i++) {
        let resultado = false;
        for (let j = 0; j < respostasQuestoesParson.length; j++) {
          if (respostasQuestoesParson[j].questaoId == assunto.questoesParson[i].id) {
            resultado = assunto.questoesParson[i].isRespostaCorreta(respostasQuestoesParson[j]);
            break;
          }
        }

        if (resultado) {
          totalRespostas++;
        }
      }
      const percentual = totalRespostas / assunto.questoesParson.length;

      return percentual;
    } else {
      return 0;
    }
  }

  static calcularPercentualConclusaoQuestoesCorrecao(assunto: Assunto, respostas) {
    let totalRespostas = 0;
    for (let i = 0; i < assunto.questoesCorrecao.length; i++) {
      let resultado = false;
      for (let j = 0; j < respostas.length; j++) {
        if (respostas[j].questaoCorrecaoId == assunto.questoesCorrecao[i].id) {
          resultado = assunto.questoesCorrecao[i].isRespostaCorreta(respostas[j]);

          if (resultado) {
            break;
          }
        }
      }

      if (resultado) {
        totalRespostas++;
      }
    }

    if (assunto.questoesCorrecao.length > 0) {
      return totalRespostas / assunto.questoesCorrecao.length;
    }

    return 0;
  }

  static calcularProgressoQuestoesProgramacao(assuntos, submissoes, visualizacoes) {
    if (Array.isArray(assuntos) && Array.isArray(submissoes)) {
      const percentuais = [];
      assuntos.forEach((assunto) => {
        percentuais.push(
          this.calcularPercentualConclusaoQuestoesProgramacao(
            assunto,
            Submissao.agruparPorQuestao(submissoes),
            visualizacoes,
            0.7
          )
        );
      });

      return Analytics.calcularPercentual(percentuais, assuntos.length);
    } else {
      return 0;
    }
  }

  static calcularProgressoQuestoesFechadas(assuntos, respostas) {
    const percentuais = [];
    assuntos.forEach((assunto) => {
      percentuais.push(this.calcularPercentualConclusaoQuestoesFechadas(assunto, respostas));
    });

    return Analytics.calcularPercentual(percentuais, assuntos.length);
  }

  private static calcularPercentual(percentuais, quantidadeAssuntos) {
    let percentualConclusao: any = 0;

    percentuais.forEach((percentual) => {
      percentualConclusao += percentual;
    });

    return ((percentualConclusao / quantidadeAssuntos) * 100).toFixed(2);
  }

  static calcularPercentualConclusaoQuestoesProgramacao(
    assunto: Assunto,
    submissoes: Map<string, Submissao[]>,
    visualizacoesQuestoesProgramacao: any[],
    margemAceitavel
  ) {
    if (
      assunto != undefined &&
      submissoes != undefined &&
      submissoes.size > 0 &&
      Array.isArray(assunto.questoesProgramacao)
    ) {
      const totalQuestoes = assunto.questoesProgramacao.length;
      let questoesRespondidas = 0;
      assunto.questoesProgramacao.forEach((questao) => {
        if (questao.id != '4fe6ba63-0d71-49e5-b3b9-a1756872e2ad') {
          // Bloqueia a questão adicionada para prof. do if
          const subsQuestao = submissoes.get(questao.id);
          const subRecente = Submissao.filtrarRecente(subsQuestao);
          const visualizouResposta = visualizacoesQuestoesProgramacao.findIndex((visualizacao) => {
            if (visualizacao.questaoId == questao.id) {
              return true;
            }

            return false;
          });
          if (visualizouResposta == -1) {
            const resultado = questao.isFinalizada(subRecente, margemAceitavel);
            if (resultado) {
              questoesRespondidas += 1;
            }
          }
        }
      });

      if (assunto.id != 'PU0EstYupXgDZ2a57X0X') {
        return questoesRespondidas / totalQuestoes;
      } else {
        return questoesRespondidas / (totalQuestoes - 1);
      }
    } else {
      return 0;
    }
  }

  private static getTotalUnicoVisualizacoesQuestoes(estudante): Observable<number> {
    return new Observable((observer) => {
      VisualizacaoQuestao.getAll(new Query('estudanteId', '==', estudante.pk())).subscribe(
        (visualizacoes) => {
          const visualizacoesQuestaoUnicas = new Set(); // Para várias visualizações de uma questão, pega apenas uma
          visualizacoes.forEach((visualizacao) => {
            visualizacoesQuestaoUnicas.add(visualizacao['questaoId']);
          });

          observer.next(visualizacoesQuestaoUnicas.size);
          observer.complete();
        },
        (err) => {
          observer.error(err);
        }
      );
    });
  }

  private static calcularPercentualVisualizacaoQuestoes(assuntos: Assunto[], estudante) {
    return new Observable((observer) => {
      // Verificar o total único de visualizações de questões
      this.getTotalUnicoVisualizacoesQuestoes(estudante).subscribe((visualizacoes) => {
        let totalQuestoes = 0;
        assuntos.forEach((assunto) => {
          if (Array.isArray(assunto.questoesFechadas)) {
            totalQuestoes += assunto.questoesFechadas.length;
          }
          if (Array.isArray(assunto.questoesProgramacao)) {
            totalQuestoes += assunto.questoesProgramacao.length;
          }
        });

        observer.next(visualizacoes / totalQuestoes);
        observer.complete();
      });
    });
  }

  private static calcularPercentualQuestoesProgramacaoTentouResolver(assuntos, submissoes) {
    const totalQuestoesResolvidas = 0;
    let totalQuestoes;

    assuntos.forEach((assunto) => {
      if (Array.isArray(assunto.questoesProgramacao)) {
        totalQuestoes += assunto.questoesProgramacao.length;
      }
    });
  }

  static calculaVisualizacoesProgresso(pageTracks) {
    if (Array.isArray(pageTracks)) return pageTracks.length;

    return 0;
  }

  static calcularNumeroAtividadesTrabalhadasPorSemana(turma: Turma) {
    return new Observable<Usuario[]>((observer) => {
      const atividadesPorEstudante = [];

      Usuario.getAll(new Query('codigoTurma', '==', turma.codigo)).subscribe(
        (estudantes: Usuario[]) => {
          const consultasRespostasFechadasAtividades = {};
          const consultasRespostasProgramacaoAtividades = {};

          estudantes.forEach((estudante) => {
            consultasRespostasFechadasAtividades[
              estudante.pk()
            ] = RespostaQuestaoFechada.getAtividadesTrabalhadasUltimaSemana(estudante);
            consultasRespostasProgramacaoAtividades[
              estudante.pk()
            ] = Submissao.getExerciciosTrabalhadosUltimaSemana(estudante);
          });

          forkJoin(consultasRespostasFechadasAtividades).subscribe(
            (atividadesTrabalhadas: object) => {
              estudantes.forEach((estudante) => {
                for (const prop in atividadesTrabalhadas) {
                  if (prop === estudante.pk()) {
                    estudante.respostasQuestoesFechadas = atividadesTrabalhadas[prop];
                    break;
                  }
                }
              });

              forkJoin(consultasRespostasProgramacaoAtividades).subscribe(
                (atividadesTrabalhadas: object) => {
                  estudantes.forEach((estudante) => {
                    for (const prop in atividadesTrabalhadas) {
                      if (prop === estudante.pk()) {
                        estudante.respostasQuestoesProgramacao = atividadesTrabalhadas[prop];
                        break;
                      }
                    }
                  });
                  observer.next(estudantes);
                  observer.complete();
                }
              );
            }
          );
        }
      );
    });
  }
}
