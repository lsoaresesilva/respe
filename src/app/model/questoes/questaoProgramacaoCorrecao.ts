
import { forkJoin, Observable } from 'rxjs';
import RespostaQuestaoCorrecaoAlgoritmo from '../correcao-algoritmo/correcaoAlgoritmo';
import Query from '../firestore/query';
import Submissao from '../submissao';
import Usuario from '../usuario';
import { Util } from '../util';
import { Assunto } from './assunto';
import { QuestaoProgramacao } from './questaoProgramacao';

export default class QuestaoProgramacaoCorrecao{


  constructor(public id, public ordem, public questao: QuestaoProgramacao) {
    if (id == null) {
      this.id = Util.uuidv4();
    } else {
      this.id = id;
    }
  }
  assunto: Assunto;

  static construir(questoes: any[], assunto) {
    const objetos: QuestaoProgramacaoCorrecao[] = [];

    if (questoes != null) {
      questoes.forEach((questao) => {
        let questaoProgramacao = assunto.getQuestaoProgramacaoById(questao.questaoId);
        objetos.push(
          new QuestaoProgramacaoCorrecao(questao.id, questao.ordem, questaoProgramacao)
        );
      });
    }

    return objetos;
  }

  get nomeCurto() {
    return this.questao.nomeCurto + ' (Correção)';
  }

  objectToDocument() {
    let objeto = { id: this.id, ordem:this.ordem };

    if (this.questao != null && this.questao.id != null) {
      objeto['questaoId'] = this.questao.id;
    }

    return objeto;
  }

  getSubmissaoComErro(estudante: Usuario) {
    return new Observable((observer) => {
      if (this.questao != null) {
        Submissao.getAll(new Query('questaoId', '==', this.questao.id)).subscribe((submisses) => {
          // TODO: filtrar pelo cache
          let submissoesComProblema = Submissao.filtrarSubmissoesConclusao(submisses, true);

          // Não pode ser uma submissão do próprio aluno

          let submissaoSelecionada;
          submissoesComProblema.forEach((submissao) => {
            if (submissao['estudanteId'] != estudante.pk()) {
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
          consultas[questao.id] = QuestaoProgramacaoCorrecao.isFinalizada(questao, estudante);
        });

        forkJoin(consultas).subscribe((statusConclusaoQuestoes) => {
          questoes.forEach((questao) => {
            if (statusConclusaoQuestoes[questao.id] != null) {
              questao.respondida = statusConclusaoQuestoes[questao.id];
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
        CorrecaoAlgoritmo.getAll(new Query("estudanteId", "==", estudante.pk())).subscribe(correcoes=>{
            let intersection = submissoes.filter(x => correcoes.some((y, i, arr)=>{
                return x.pk() == y.pk();
            }));

            observer.next(intersection);
            observer.complete();
        })
      })


  } */
}
