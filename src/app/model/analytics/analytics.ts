import { forkJoin, Observable } from 'rxjs';
import { Assunto } from '../sistema-aprendizagem/assunto';
import Query from '../firestore/query';
import Submissao from '../submissao';
import VisualizacaoQuestao from './visualizacaoQuestao';
import TempoOnline from './tempoOnline';
import PageTrackRecord from './pageTrack';
import { PageTrack } from '../../guards/pageTrack.guard';
import Turma from '../turma';
import Usuario from '../usuario';
import { RespostaQuestaoFechada } from '../respostaQuestaoFechada';
import AnalyticsProgramacao from './analyticsProgramacao';

export default class Analytics {
  // TODO: Fazer apenas um carregamento de assunto e usar par atudo aqui.

  // Analytics do estudante
  progresoGeral;
  progressoQuestoesAbertas;
  progressoQuestoesFechadas;
  percentualVisualizacaoQuestoesFechadas;
  totalErrosProgramacao;
  errosProgramacao;
  mediaSubmissoesParaAcerto;
  totalExecucoes;
  tempoOnline;
  tentativasQuestoes;
  visualizacoesProgresso;

  private constructor() {}

  static init(estudante): Observable<Analytics> {
    return new Observable((observer) => {
      if (estudante != null && estudante.pk() != null) {
        const analytics = new Analytics();

        const consultasGerais = {};
        consultasGerais['assuntos'] = Assunto.getAll();
        consultasGerais['submissoes'] = Submissao.getAll(
          new Query('estudanteId', '==', estudante.pk())
        );
        consultasGerais['tempoOnline'] = TempoOnline.getTempoOnline(estudante);
        consultasGerais['pageTrack'] = PageTrackRecord.getAll([
          new Query('estudanteId', '==', estudante.pk()),
          new Query('pagina', '==', 'meu-desempenho'),
        ]);

        forkJoin(consultasGerais).subscribe((resultadosConsultasGerais: any) => {
          const assuntos = resultadosConsultasGerais.assuntos;
          const submissoes = resultadosConsultasGerais.submissoes;
          const tempoOnline = resultadosConsultasGerais.tempoOnline;
          const pageTracks = resultadosConsultasGerais.PageTrack;

          analytics.totalErrosProgramacao = AnalyticsProgramacao.calcularTotalErrosProgramacao(submissoes);
          analytics.mediaSubmissoesParaAcerto = this.calcularMediaSubmissoesParaAcerto(submissoes);
          analytics.totalExecucoes = AnalyticsProgramacao.calcularExecucoes(submissoes);
          analytics.tempoOnline = tempoOnline;
          analytics.tentativasQuestoes = AnalyticsProgramacao.calculaTentativasQuestoes(submissoes);
          analytics.visualizacoesProgresso = this.calculaVisualizacoesProgresso(pageTracks);
          analytics.errosProgramacao = Submissao.getAllErros(submissoes);

          const consultas = {};

          consultas['progressoGeral'] = this.calcularProgressoGeral(assuntos, estudante);
          consultas['progressoQuestoesAbertas'] = this.calcularProgressoQuestoesAbertas(
            assuntos,
            estudante
          );
          consultas['progressoQuestoesFechadas'] = this.calcularProgressoQuestoesFechadas(
            assuntos,
            estudante
          );

          consultas[
            'percentualVisualizacaoQuestoesFechadas'
          ] = this.calcularPercentualVisualizacaoQuestoes(assuntos, estudante);

          forkJoin(consultas).subscribe(
            (respostas: any) => {
              analytics.progresoGeral = respostas.progressoGeral;
              analytics.progressoQuestoesAbertas = respostas.progressoQuestoesAbertas;
              analytics.progressoQuestoesFechadas = respostas.progressoQuestoesFechadas;
              analytics.percentualVisualizacaoQuestoesFechadas =
                respostas.percentualVisualizacaoQuestoesFechadas;

              observer.next(analytics);
              observer.complete();
            },
            (err) => {
              observer.error(err);
            }
          );
        });

        /* Assunto.getAll().subscribe((assuntos) => {

        }); */
      } else {
        observer.error('É preciso informar um estudante para calcular o seu analytics');
      }
    });
  }

  public static calcularProgressoGeral(assuntos, estudante) {
    return new Observable((observer) => {
      if (estudante.pk() != null) {
        const consultasConclusao = [];
        Assunto.consultarRespostasEstudante(estudante).subscribe(respostas=>{
          assuntos.forEach((assunto) => {
            consultasConclusao.push(Assunto.calcularProgresso(assunto, respostas));
          });
        })
        

        this.calcularPercentual(consultasConclusao, assuntos.length).subscribe((percentual) => {
          observer.next(percentual);
          observer.complete();
        });
      } else {
        observer.next(0);
        observer.complete();
      }
    });
  }

  static calcularProgressoQuestoesAbertas(assuntos, estudante) {
    return new Observable((observer) => {
      if (estudante.pk() != null) {
        const consultasConclusao = [];
        assuntos.forEach((assunto) => {
          consultasConclusao.push(
            //Assunto.calcularPercentualConclusaoQuestoesProgramacao(assunto, estudante, 1)
          );
        });

        this.calcularPercentual(consultasConclusao, assuntos.length).subscribe((percentual) => {
          observer.next(percentual);
          observer.complete();
        });
      } else {
        observer.next(0);
        observer.complete();
      }
    });
  }

  static calcularProgressoQuestoesFechadas(assuntos, estudante) {
    return new Observable((observer) => {
      if (estudante.pk() != null) {
        const consultasConclusao = [];
        assuntos.forEach((assunto) => {
          consultasConclusao.push(
            Assunto.calcularPercentualConclusaoQuestoesFechadas(assunto, estudante)
          );
        });

        this.calcularPercentual(consultasConclusao, assuntos.length).subscribe((percentual) => {
          observer.next(percentual);
          observer.complete();
        });
      } else {
        observer.next(0);
        observer.complete();
      }
    });
  }

  private static calcularPercentual(consultasConclusao, quantidadeAssuntos) {
    return new Observable((observer) => {
      forkJoin(consultasConclusao).subscribe(
        (percentuais) => {
          let percentualConclusao: any = 0;

          percentuais.forEach((percentual) => {
            percentualConclusao += percentual;
          });

          observer.next(percentualConclusao / quantidadeAssuntos);
          observer.complete();
        },
        (err) => {
          observer.error(err);
        }
      );
    });
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

 

  private static calcularMediaSubmissoesParaAcerto(submissoes) {
    let media = 0;
    let submissoesIncorretas = 0;
    let iteracao = 0;

    // Agrupar por questoes
    const submissoesAgrupadas = Submissao.agruparPorQuestao(submissoes);
    // Verificar se para uma questão há submissão correta. Se houver, somar o total de submissoes erradas e desconsiderar as corretas.
    submissoesAgrupadas.forEach((submissoesQuestao, questaoId, map) => {
      const submissoesConcluidas = Submissao.filtrarSubmissoesConclusao(submissoesQuestao);
      submissoesIncorretas += submissoesQuestao.length - submissoesConcluidas.length;
      if (submissoesConcluidas.length != 0) {
        ++iteracao;
      }
    });

    if (iteracao !== 0) {
      media = submissoesIncorretas / iteracao;
    }
    return media;
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
