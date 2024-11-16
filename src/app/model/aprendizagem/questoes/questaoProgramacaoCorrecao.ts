
import { forkJoin, Observable } from 'rxjs';
import RespostaQuestaoCorrecaoAlgoritmo from '../../correcao-algoritmo/correcaoAlgoritmo';
import Query from '../../firestore/query';
import Submissao from '../../respostaQuestaoProgramacao';
import Usuario from '../../usuario';
import { Util } from '../../util';
import { Assunto } from './assunto';
import { QuestaoProgramacao } from './questaoProgramacao';

export default class QuestaoProgramacaoCorrecao{


  constructor(public primary_key, public sequencia, public questao: QuestaoProgramacao) {
    if (primary_key == null) {
      this.primary_key = Util.uuidv4();
    } else {
      this.primary_key = primary_key;
    }
  }
  assunto: Assunto;

  static dataToObject(questoes: any[], assunto) {
    const objetos: QuestaoProgramacaoCorrecao[] = [];

    if (questoes != null) {
      questoes.forEach((questao) => {
        let questaoProgramacao = assunto.getQuestaoProgramacaoById(questao.questaoId);
        objetos.push(
          new QuestaoProgramacaoCorrecao(questao.pk, questao.sequencia, questaoProgramacao)
        );
      });
    }

    return objetos;
  }

  get pk(){
    return this.primary_key;
  }

  get nomeCurto() {
    return this.questao.nomeCurto + ' (Correção)';
  }

  objectToDocument() {
    let objeto = { primary_key: this.primary_key, ordem:this.sequencia };

    if (this.questao != null && this.questao.pk != null) {
      objeto['questaoId'] = this.questao.pk;
    }

    return objeto;
  }

  getSubmissaoComErro(estudante: Usuario) {
    return new Observable((observer) => {
      if (this.questao != null) {
        Submissao.getAll(new Query('questaoId', '==', this.questao.pk)).subscribe((submisses) => {
          // TODO: filtrar pelo cache
          let submissoesComProblema = Submissao.filtrarSubmissoesConclusao(submisses, true);

          // Não pode ser uma submissão do próprio aluno

          let submissaoSelecionada;
          submissoesComProblema.forEach((submissao) => {
            if (submissao['estudanteId'] != estudante.pk) {
              if (submissaoSelecionada == null) {
                submissaoSelecionada = submissao;
              } else {
                if (submissaoSelecionada.codigo.length < submissao.codigo.length) {
                  // A escolha da questão se dá atualmente pela quantidade de caracteres
                  // TODO: identificar as falhas dos estudantes e selecionar
                  submissaoSelecionada = submissao;
                }
              }
            }
          });

          // TODO: incluir o ID da submissão no storage. Pesquisar lá antes de ir no banco.
          observer.next(submissaoSelecionada);
          observer.complete();
        });
      }
    });
  }

  static isFinalizada(questao: QuestaoProgramacaoCorrecao, usuario) {
    return new Observable((observer) => {
      RespostaQuestaoCorrecaoAlgoritmo.getRecentePorQuestao(questao, usuario).subscribe(
        (correcao) => {
          if (correcao != null) {
            observer.next(correcao.submissao.isFinalizada());
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
        let consultas = {};

        questoes.forEach((questao) => {
          consultas[questao.pk] = QuestaoProgramacaoCorrecao.isFinalizada(questao, estudante);
        });

        forkJoin(consultas).subscribe((statusConclusaoQuestoes) => {
          questoes.forEach((questao) => {
            if (statusConclusaoQuestoes[questao.pk] != null) {
              questao.respondida = statusConclusaoQuestoes[questao.pk];
              questao.percentualResposta = questao.respondida == true ? 100 : 0;
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

  isRespostaCorreta(resposta:RespostaQuestaoCorrecaoAlgoritmo){
    if(resposta != null && resposta.submissao != null){
      return resposta.submissao.isFinalizada();
    }

    return false;
  }

  /* static filtrarSubmissoesCorrecao(submissoes:Submissao[], estudante:Usuario){
      return new Observable(observer=>{
        CorrecaoAlgoritmo.getAll(new Query("estudanteId", "==", estudante.pk)).subscribe(correcoes=>{
            let intersection = submissoes.filter(x => correcoes.some((y, i, arr)=>{
                return x.pk() == y.pk();
            }));

            observer.next(intersection);
            observer.complete();
        })
      })


  } */
}
