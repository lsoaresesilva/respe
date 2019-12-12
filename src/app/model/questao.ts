import { Assunto } from './assunto';
import { Document, Collection } from './firestore/document';
import { Observable, forkJoin } from 'rxjs';
import { Dificuldade } from "./enums/dificuldade"
import TestCase from './testCase';

import Submissao from './submissao';
import Usuario from './usuario';
import { Util } from './util';

@Collection("questoes")
export class Questao {

  nomeCurto: string;
  enunciado: string;
  dificuldade: Dificuldade;
  assuntos: any[];
  sequencia: number;
  testsCases: TestCase[];
  respostaUsuario: String;

  constructor(public id, nomeCurto, enunciado, dificuldade, sequencia, assuntos, testsCases, respostaUsuario) {
    if (id == null)
      this.id = Util.uuidv4();
    else {
      this.id = id;
    }
    this.nomeCurto = nomeCurto;
    this.enunciado = enunciado;
    this.dificuldade = dificuldade;
    this.sequencia = sequencia;
    this.assuntos = assuntos;
    this.testsCases = testsCases;
    this.respostaUsuario = respostaUsuario;
  }

  objectToDocument() {
    let document = {}

    document["id"] = this.id;
    document["nomeCurto"] = this.nomeCurto;
    document["enunciado"] = this.enunciado;
    document["dificuldade"] = this.dificuldade;


    if (this.assuntos != null && this.assuntos.length > 0) {
      let assuntos = [];
      this.assuntos.forEach(assunto => {
        assuntos.push(assunto.pk()); // TODO: erro aqui
      })

      document["assuntos"] = assuntos;
    }

    document["sequencia"] = this.sequencia;
    document["respostaUsuario"] = this.respostaUsuario;

    if (this.testsCases != null && this.testsCases.length > 0) {
      let ts = [];
      this.testsCases.forEach(testCase => {
        ts.push(testCase.objectToDocument());
      })
      document["testsCases"] = ts;

    }

    return document;
  }

  toJson(){
    let ts = []

    if (this.testsCases != null && this.testsCases.length > 0) {
      this.testsCases.forEach(testCase => {
        ts.push(testCase.objectToDocument());
      })
    }

    return {
      testsCases:ts
    }
  }

  buscarAssuntos(assuntoPrincipal): Observable<any[]> {
    return new Observable(observer => {
      let consultaAssuntos = [];
      let assuntosQuestao = [];

      assuntosQuestao.push(assuntoPrincipal); //incluindo o assunto principal à lista de questões

      if (this.assuntos != null) {
        this.assuntos.forEach(assunto => {
          if( assunto.id != undefined)
            consultaAssuntos.push(Assunto.get(assunto.id));
        });
      }

      if (consultaAssuntos.length > 0) {
        forkJoin(consultaAssuntos).subscribe(assuntosRecuperados => {
          assuntosQuestao.concat(assuntosRecuperados);
          observer.next(assuntosQuestao);
          observer.complete();
        }, err => {
          observer.error(err);
        })
      } else {
        observer.next(assuntosQuestao);
        observer.complete();
      }
    })
  }

  static isFinalizada(questao, usuario) {
    return new Observable(observer => {
      Submissao.getRecentePorQuestao(questao, usuario).subscribe(submissao => {
        if (submissao != null && submissao["resultadosTestsCases"] != null) {

          let totalTestCase = questao.testsCases.length;
          let totalRespondidasSucesso = 0;

          submissao["resultadosTestsCases"].forEach(resultado => {

            if (resultado != null && resultado["status"] == true)
              totalRespondidasSucesso++;
          })

          let percentual = (totalRespondidasSucesso / totalTestCase) * 100;
          observer.next(percentual);
          observer.complete();
        } else {
          observer.next(0);
          observer.complete();
        }



      }, err => {
        observer.error(err);
      })
    })

  }

  /**
     * Constrói objetos TestsCases a partir do atributo testsCases de uma questão (que é um array)
     * @param testsCases 
     */
  static construir(questoes: any[]) {
    let objetosQuestoes: Questao[] = [];

    if (questoes != null) {
      questoes.forEach(questao => {
        let assuntos = [];
        if (questao.assuntos != null && questao.assuntos.length > 0) {
          questao.assuntos.forEach(assunto => {
            assuntos.push(new Assunto(assunto, null));
          })

          questao.assuntos = assuntos;
        }

        questao.testsCases = TestCase.construir(questao.testsCases);

        objetosQuestoes.push(new Questao(questao.id, questao.nomeCurto, questao.enunciado, questao.dificuldade, questao.sequencia, questao.assuntos, questao.testsCases, questao.respostaUsuario));
      })
    }

    return objetosQuestoes;
  }

  validar() {
    if (this.nomeCurto == null || this.nomeCurto == "" ||
      this.enunciado == null || this.enunciado == "" || this.dificuldade == null ||
      this.sequencia == null || this.sequencia < 1 || this.testsCases == undefined ||
      this.testsCases.length == 0 || TestCase.validarTestsCases(this.testsCases) == false) {
      return false;
    }
    return true;
  }

  static getByAssuntoQuestao(assuntoQuestao) {
    return new Observable(observer => {
      assuntoQuestao = assuntoQuestao.split("/");
      let assuntoId = assuntoQuestao[0];
      let questaoId = assuntoQuestao[1];
      if (assuntoId != null && questaoId != null) {
        Assunto.get(assuntoId).subscribe(assunto => {
          let questao = assunto["getQuestaoProgramacaoById"](questaoId);
          observer.next(questao);
          observer.complete();
        }, err=>{
          observer.error(err);
        })
      }else{
        observer.error(new Error("É preciso informar um assunto e questão no formato: assunto-id/questao-id"));
      }
    })

  }
}