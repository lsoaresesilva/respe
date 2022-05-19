import { Observable } from "rxjs";
import { Assunto } from "./assunto";
import { MaterialAprendizagem } from "../sistema-aprendizagem/materialAprendizagem";
import { RespostaQuestaoProgramacaoRegex } from "./respostaQuestaoProgramacaoRegex";
import { Util } from "../util";

export class QuestaoProgramacaoRegex implements MaterialAprendizagem{

  assunto: Assunto;


  constructor(public id, public nomeCurto, public enunciado, public ordem, public regex: string[]) {
    if (id == null) {
      this.id = Util.uuidv4();
    } else {
      this.id = id;
    }
  }


  executar(algoritmo:string[]){
      if(Array.isArray(this.regex) && Array.isArray(algoritmo)){

        for(let i = 0; i < this.regex.length; i++){
            if(algoritmo[i] == null){
                return {resultado:false, linha:i+1};
            }else{
              let regex = new RegExp(this.regex[i]);
              let match = regex.exec(algoritmo[i]);
              if(match == null){
                return {resultado:false, linha:i+1};
              }
            }
        }

        return {resultado:true};
      }

      return {resultado:false};
  }

  objectToDocument() {
    const document = {};
    document['id'] = this.id;
    document['nomeCurto'] = this.nomeCurto;
    document['enunciado'] = this.enunciado;
    document['ordem'] = this.ordem;
    document['regex'] = this.regex;

    return document;
  }

  possuiCodigoNoEnunciado() {
    if (this.enunciado != null) {
      return this.enunciado.search("'''python") != -1 ? true : false;
    }
  }


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
            questaoProgramacaoRegex.regex
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

            RespostaQuestaoProgramacaoRegex.getRecentePorQuestao(questao, estudante).subscribe(resposta=>{
              if(resposta != null){
                questao.respondida = resposta.isRespostaCorreta
                questao.percentualResposta = questao.respondida == true?100:0;
              }

            })
        });

        observer.next(questoes);
        observer.complete();


      } else {
        observer.next(questoes);
        observer.complete();
      }
    });
  }
}
