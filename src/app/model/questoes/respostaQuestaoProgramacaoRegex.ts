import { Observable } from "rxjs";
import { Collection, date, Document } from "../../firestore/document";
import Query from "../../firestore/query";
import Usuario from "../../usuario";
import { QuestaoProgramacaoRegex } from "./questaoProgramacaoRegex";

@Collection('respostaQuestaoProgramacaoRegex')
export class RespostaQuestaoProgramacaoRegex extends Document {
  @date()
  data;

  constructor(public id, public estudante, public algoritmo, public isRespostaCorreta, public questao) {
    super(id);
  }

  objectToDocument() {
    const document = super.objectToDocument();
    document['estudanteId'] = this.estudante.pk();
    document['questaoId'] = this.questao.id;
    document['algoritmo'] = this.algoritmo
    document['isRespostaCorreta'] = this.isRespostaCorreta
    return document;
  }

  static _orderByDate(respostas: RespostaQuestaoProgramacaoRegex[]) {
    respostas.sort((s1, s2) => {
      if (s1.data != null && s2.data != null) {
        if (s1.data.toDate().getTime() < s2.data.toDate().getTime()) {
          return -1;
        } else if (s1.data.toDate().getTime() > s2.data.toDate().getTime()) {
          return 1;
        } else {
          return 0;
        }
      }
      return 0;
    });
  }

  static filtrarRecente(respostas = []) {
    RespostaQuestaoProgramacaoRegex._orderByDate(respostas);

    let respostaRecente = null;
    if (respostas.length != 0) {
      if (respostas.length == 1) {
        respostaRecente = respostas[0];
      } else {
        respostas.forEach((resposta) => {
          if (respostaRecente == null) {
            respostaRecente = resposta;
          } else {

            if (respostaRecente.data != null && resposta.data != null) {
              if (respostaRecente.data.toDate().getTime() <= resposta.data.toDate().getTime()) {
                respostaRecente = resposta;
              }
            }
          }
        });
      }
    }

    return respostaRecente;
  }

  static getRecentePorQuestao(questao: QuestaoProgramacaoRegex, estudante: Usuario):Observable<RespostaQuestaoProgramacaoRegex> {
    return new Observable((observer) => {
      this.getPorQuestao(questao, estudante).subscribe((respostas) => {
        const respostaRecente = this.filtrarRecente(respostas);

        observer.next(respostaRecente);
        observer.complete();
      });
    });
  }

  /**
   * Recupera as submissões para uma questão.
   */
   static getPorQuestao(questao: QuestaoProgramacaoRegex, estudante: Usuario): Observable<any[]> {
    return new Observable((observer) => {
      if (
        questao == null ||
        typeof questao.id == null ||
        estudante == null ||
        typeof estudante.pk != 'function'
      ) {
        observer.error(new Error('Questão ou estudante não podem ser vazios'));
      } else {
        RespostaQuestaoProgramacaoRegex.getAll([
          new Query('estudanteId', '==', estudante.pk()),
          new Query('questaoId', '==', questao.id),
        ]).subscribe((submissoes) => {
          observer.next(submissoes);
          observer.complete();
        });
      }
    });
  }

}