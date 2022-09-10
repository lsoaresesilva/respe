import { Observable } from 'rxjs';
import { Assunto } from './assunto';
import { MaterialAprendizagem } from '../materialAprendizagem';
import { RespostaQuestaoProgramacaoRegex } from './respostaQuestaoProgramacaoRegex';
import { Util } from '../../util';
import Conceito from './conceito';
import QuestaoBase from './questaoBase';
import { Dificuldade } from './enum/dificuldade';

export class QuestaoProgramacaoRegex extends QuestaoBase {


  constructor(public id, public nomeCurto,
    public enunciado, public ordem, public regex: string[],
    public conceitos:Conceito[], public dificuldade:Dificuldade) {
    super(id);
  }

  assunto: Assunto;

  static construir(questoesProgramacaoRegex: any[]) {
    const objetos: QuestaoProgramacaoRegex[] = [];

    if (questoesProgramacaoRegex != null && Array.isArray(questoesProgramacaoRegex)) {
      questoesProgramacaoRegex.forEach((questaoProgramacaoRegex) => {
        objetos.push(
          new QuestaoProgramacaoRegex(
            questaoProgramacaoRegex.id,
            questaoProgramacaoRegex.nomeCurto,
            questaoProgramacaoRegex.enunciado,
            questaoProgramacaoRegex.ordem,
            questaoProgramacaoRegex.regex,
            Conceito.construir(questaoProgramacaoRegex.conceitos),
            questaoProgramacaoRegex.dificuldade
          )
        );
      });
    }

    return objetos;
  }

  static verificarQuestoesRespondidas(estudante, questoes) {
    return new Observable((observer) => {
      if (Array.isArray(questoes) && questoes.length > 0) {
        questoes.forEach((questao) => {
          questao.percentualResposta = 0;

          RespostaQuestaoProgramacaoRegex.getRecentePorQuestao(questao, estudante).subscribe(
            (resposta) => {
              if (resposta != null) {
                questao.respondida = resposta.isRespostaCorreta;
                questao.percentualResposta = questao.respondida == true ? 100 : 0;
              }
            }
          );
        });

        observer.next(questoes);
        observer.complete();
      } else {
        observer.next(questoes);
        observer.complete();
      }
    });
  }

  executar(algoritmo: string[]) {
    if (Array.isArray(this.regex) && Array.isArray(algoritmo)) {
      for (let i = 0; i < this.regex.length; i++) {
        if (algoritmo[i] == null) {
          return { resultado: false, linha: i + 1 };
        } else {
          let regex = new RegExp(this.regex[i]);
          let match = regex.exec(algoritmo[i]);
          if (match == null) {
            return { resultado: false, linha: i + 1 };
          }
        }
      }

      return { resultado: true };
    }

    return { resultado: false };
  }

  objectToDocument(){
    const document = super.objectToDocument();
    document['regex'] = this.regex;

    return document;
  }

  possuiCodigoNoEnunciado() {
    if (this.enunciado != null) {
      return this.enunciado.search("'''python") != -1 ? true : false;
    }
  }

  validar() {
    let resultado = false;

    if(Array.isArray(this.regex) && this.regex.length > 0){
      resultado = true;
    }

    return super.validar() && resultado;
  }

  isRespostaCorreta() {
    return false;
  }
}
