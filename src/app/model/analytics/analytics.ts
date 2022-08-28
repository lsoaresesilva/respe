import { forkJoin, Observable } from 'rxjs';
import Query from '../firestore/query';
import Submissao from '../submissao';
import VisualizacaoQuestao from './visualizacaoQuestao';
import TempoOnline from './tempoOnline';
import PageTrackRecord from './pageTrack';
import { PageTrack } from '../../guards/pageTrack.guard';
import Turma from '../turma';
import Usuario from '../usuario';
import { RespostaQuestaoFechada } from '../questoes/respostaQuestaoFechada';
import AnalyticsProgramacao from './analyticsProgramacao';
import { Assunto } from '../questoes/assunto';
import QuestaoFechada from '../questoes/questaoFechada';

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

          Assunto.consultarRespostasEstudante(estudante).subscribe(respostas=>{
            const analytics:Analytics = this.getAnalytics(assuntos, respostas);
            observer.next(analytics);
            observer.complete();
          })


        });

      } else {
        observer.error('É preciso informar um estudante para calcular o seu analytics');
      }
    });
  }

  static getAnalytics(assuntos,respostas){
    const analytics = new Analytics();
    analytics.totalErrosProgramacao = AnalyticsProgramacao.calcularMediaErrosSintaxeProgramacao(respostas.submissoes);
    analytics.mediaSubmissoesParaAcerto = AnalyticsProgramacao.calcularMediaSubmissoesParaAcerto(respostas.submissoes);
    analytics.totalExecucoes = AnalyticsProgramacao.calcularExecucoes(respostas.submissoes);

    analytics.tentativasQuestoes = AnalyticsProgramacao.calculaTentativasQuestoes(respostas.submissoes);
    //analytics.visualizacoesProgresso = this.calculaVisualizacoesProgresso(pageTracks);
    analytics.errosProgramacao = Submissao.getAllErros(respostas.submissoes);
    analytics.progressoQuestoesProgramacao = this.calcularProgressoQuestoesProgramacao(assuntos, respostas.submissoes, respostas.visualizacoesRespostasProgramacao);
    analytics.progressoQuestoesFechadas = this.calcularProgressoQuestoesFechadas(assuntos, respostas.respostasQuestaoFechada);
    analytics.progresoGeral = this.calcularProgressoGeral(assuntos, respostas);
    return analytics;
  }


  static getAnalyticsTurma(estudantes:Usuario[]){
    return new Observable((observer) => {
      let consultaRespostas = [];
      estudantes.forEach(estudante=>{

        consultaRespostas.push(Assunto.consultarRespostasEstudante(estudante))

      });



      forkJoin(consultaRespostas).subscribe(respostas=>{
        Assunto.getAll().subscribe(assuntos=>{
          const analytics:Analytics = new Analytics();
          let submissoes = [];

          respostas.forEach(resposta=>{
            submissoes = [...submissoes, ...resposta["submissoes"]];
          });

          analytics.errosProgramacao = Submissao.getAllErros(submissoes);
          observer.next(analytics);
          observer.next(analytics);
        })
      })
    });
  }

  public static calcularProgressoGeral(assuntos:Assunto[], respostas) {

    let percentuais = [];

    assuntos.forEach((assunto) => {
      percentuais.push(
        this.calcularProgressoNoAssunto(assunto, respostas)
      );
    });
    return Analytics.calcularPercentual(percentuais, assuntos.length);
  }

  static calcularProgressoNoAssunto(assunto: Assunto, respostas) {
    let percentualConclusao = 0;

    percentualConclusao += this.calcularPercentualConclusaoQuestoesFechadas(
      assunto,
      respostas.respostasQuestaoFechada
    );

    percentualConclusao += this.calcularPercentualConclusaoQuestoesParson(
      assunto,
      respostas.resposaQuestaoParson
    );

    /* percentualConclusao += this.calcularPercentualConclusaoQuestoesCorrecao(
      assunto,
      respostas.respostaQuestaoCorrecao
    ); */

    percentualConclusao += this.calcularPercentualConclusaoQuestoesProgramacao(
      assunto,
      Submissao.agruparPorQuestao(respostas.submissoes),
      respostas.visualizacoesRespostasProgramacao,
      0.5
    );



    return percentualConclusao/3; // Divide por dois, pois as questões parson e correção estavam com problema.
  }


  static calcularPercentualConclusaoQuestoesFechadas(assunto: Assunto, respostasQuestoesFechadas) {
    let totalRespostas = 0;
    for (let i = 0; i < assunto.questoesFechadas.length; i++) {
      let resultado = false;
      for (let j = 0; j < respostasQuestoesFechadas.length; j++) {
        let questaoIdResposta = respostasQuestoesFechadas[j].questaoId;
        let questaoId = assunto.questoesFechadas[i].id
        if (questaoIdResposta == questaoId) {
          resultado = QuestaoFechada.isRespostaCorreta(
            assunto.questoesFechadas[i],
            respostasQuestoesFechadas[j]
          );
        }
      }

      if (resultado) {
        totalRespostas++;
      }
    }
    const percentual = totalRespostas / assunto.questoesFechadas.length;

    return percentual;
  }

  static calcularPercentualConclusaoQuestoesParson(assunto: Assunto, respostasQuestoesParson) {
    let totalRespostas = 0;
    for (let i = 0; i < assunto.questoesParson.length; i++) {
      let resultado = false;
      for (let j = 0; j < respostasQuestoesParson.length; j++) {
        if (respostasQuestoesParson[j].questaoId == assunto.questoesParson[i].id) {
          resultado = assunto.questoesParson[i].isRespostaCorreta(respostasQuestoesParson[j]);
          break
        }
      }

      if (resultado) {
        totalRespostas++;
      }
    }
    const percentual = totalRespostas / assunto.questoesParson.length;

    return percentual;
  }

  static calcularPercentualConclusaoQuestoesCorrecao(assunto: Assunto, respostas) {
    let totalRespostas = 0;
    for (let i = 0; i < assunto.questoesCorrecao.length; i++) {
      let resultado = false;
      for (let j = 0; j < respostas.length; j++) {
        if (respostas[j].questaoCorrecaoId == assunto.questoesCorrecao[i].id) {
          resultado = assunto.questoesCorrecao[i].isRespostaCorreta(respostas[j]);

          if(resultado){
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
    let percentuais = [];
    assuntos.forEach((assunto) => {
      percentuais.push(

        this.calcularPercentualConclusaoQuestoesProgramacao(assunto, Submissao.agruparPorQuestao(submissoes), visualizacoes, 0.70)
      );
    });

    return Analytics.calcularPercentual(percentuais, assuntos.length);
  }

  static calcularProgressoQuestoesFechadas(assuntos, respostas) {
    let percentuais = [];
    assuntos.forEach((assunto) => {
      percentuais.push(

        this.calcularPercentualConclusaoQuestoesFechadas(assunto, respostas)
      );
    });

    return Analytics.calcularPercentual(percentuais, assuntos.length);
  }

  private static calcularPercentual(percentuais, quantidadeAssuntos) {
    let percentualConclusao: any = 0;

    percentuais.forEach((percentual) => {
      percentualConclusao += percentual;
    });

    return ((percentualConclusao / quantidadeAssuntos)*100).toFixed(2);
  }

  static calcularPercentualConclusaoQuestoesProgramacao(
    assunto: Assunto,
    submissoes: Map<string, Submissao[]>,
    visualizacoesQuestoesProgramacao:any[],
    margemAceitavel
  ) {
    if (assunto != undefined && submissoes != undefined && submissoes.size > 0) {
      const totalQuestoes = assunto.questoesProgramacao.length;
      let questoesRespondidas = 0;
      assunto.questoesProgramacao.forEach((questao) => {

        if(questao.id != "4fe6ba63-0d71-49e5-b3b9-a1756872e2ad"){ // Bloqueia a questão adicionada para prof. do if
          let subsQuestao = submissoes.get(questao.id);
          let subRecente = Submissao.filtrarRecente(subsQuestao);
          let visualizouResposta = visualizacoesQuestoesProgramacao.findIndex((visualizacao)=>{
            if(visualizacao.questaoId == questao.id){
              return true;
            }

            return false;
          })
          if(visualizouResposta == -1){
            let resultado = questao.isFinalizada(subRecente, margemAceitavel);
            if (resultado) {
              questoesRespondidas += 1;
            }
          }

        }

      });


      if(assunto.id != "PU0EstYupXgDZ2a57X0X"){
        return questoesRespondidas / totalQuestoes;
      }else{
        return questoesRespondidas / (totalQuestoes-1);
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
