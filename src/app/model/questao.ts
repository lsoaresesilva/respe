import { Assunto } from './assunto';
import { Document, Collection } from './firestore/document';
import { Observable, forkJoin } from 'rxjs';
import { Dificuldade } from "./dificuldade"
import Query from './firestore/query';
import AssuntoQuestao from './assuntoQuestao';
import TestCase from './testCase';
import ResultadoTestCase from './resultadoTestCase';

import Submissao from './submissao';
import Usuario from './usuario';
import { Util } from './util';

@Collection("questoes")
export class Questao {

  nomeCurto: string;
  enunciado: string;
  dificuldade: Dificuldade;
  assuntos: Assunto[];
  //assuntoPrincipal: Assunto;
  sequencia: number;
  testsCases: TestCase[];


  constructor(public id, nomeCurto, enunciado, dificuldade, sequencia, assuntos, testsCases) {
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
    //this.assuntoPrincipal = assuntoPrincipal;
    this.testsCases = testsCases;
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

    if (this.testsCases != null && this.testsCases.length > 0) {
      let ts = [];
      this.testsCases.forEach(testCase => {
        ts.push(testCase.objectToDocument());
      })
      document["testsCases"] = ts;
    }

    return document;
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
          assuntos.push(new Assunto(assunto, null, null));
        })

        questao.assuntos = assuntos;
      }

      questao.testsCases = TestCase.construir(questao.testsCases);

      objetosQuestoes.push(new Questao(questao.id, questao.nomeCurto, questao.enunciado, questao.dificuldade, questao.sequencia, questao.assuntos, questao.testsCases));
    })
  }



  return objetosQuestoes;
}



/*static get(id) {
  return new Observable(observer => {
    super.get(id).subscribe(questao => {
      let consultas = {}
      let questaoId = questao["id"];
      consultas["assuntosQuestao_" + questaoId] = this.getAssuntos(questao);
      if (questao["assuntoPrincipalId"] != null && questao["assuntoPrincipalId"] != "")
        consultas["assuntoPrincipal_" + questaoId] = Assunto.get(questao["assuntoPrincipalId"]);
      questao["testsCases"] = TestCase.construir(questao["testsCases"]);
      if (Object.entries(consultas).length === 0 && consultas.constructor === Object) {
        observer.next(questao);
        observer.complete();
      } else {
        forkJoin(consultas).subscribe(resultados => {
          let assuntosQuestaoKey = "assuntosQuestao_" + questaoId;
          let assuntoPrincipalKey = "assuntoPrincipal_" + questaoId;
          questao["assuntos"] = resultados[assuntosQuestaoKey]
          questao["assuntoPrincipal"] = resultados[assuntoPrincipalKey]
        }, err => {
          observer.error(err);
        }, () => {
          observer.next(questao);
          observer.complete();
        })
      }
    });
  });
}
static getAll(query: Query = null): Observable<any[]> {
  console.log("get all de questão")
  return new Observable(observer => {
    super.getAll(query).subscribe(questoes => {
      let consultas = {}
      let counter = 0;
      questoes.forEach(questao => {
        counter++;
        let questaoId = questao.id;
        consultas["assuntosQuestao_" + questaoId] = this.getAssuntos(questao);
        if (questao.assuntoPrincipalId != null && questao.assuntoPrincipalId != "")
          consultas["assuntoPrincipal_" + questaoId] = Assunto.get(questao.assuntoPrincipalId);
        questao.testsCases = TestCase.construir(questao.testsCases);
      })
      if (counter > 0)
        forkJoin(consultas).subscribe(resultados => {
          questoes.forEach(questao => {
            let assuntosQuestaoKey = "assuntosQuestao_" + questao.pk();
            let assuntoPrincipalKey = "assuntoPrincipal_" + questao.pk();
            questao.assuntos = resultados[assuntosQuestaoKey]
            questao.assuntoPrincipal = resultados[assuntoPrincipalKey]
          });
        }, err => {
          observer.error(err);
        }, () => {
          observer.next(questoes);
          observer.complete();
        })
      else {
        observer.next(questoes);
        observer.complete();
      }
    })
  });
}
private static getAssuntos(questao) {
  return new Observable(observer => {
    let assuntos = []
    AssuntoQuestao.getAll(new Query("questaoId", "==", questao.id)).subscribe(assuntosQuestao => {
      let consultaAssuntos = [];
      try {
        assuntosQuestao.forEach(assuntoQuestao => {
          consultaAssuntos.push(Assunto.get(assuntoQuestao.assuntoId));
        })
        if (consultaAssuntos.length > 0) {
          forkJoin(consultaAssuntos).subscribe(assuntosLocalizados => {
            assuntos = assuntosLocalizados;
            observer.next(assuntos);
            observer.complete();
          }, err => {
            observer.error(err);
          })
        } else {
          observer.next(assuntos);
          observer.complete();
        }
      } catch (e) {
        observer.error(e);
      }
    })
  })
}*/

validar() {
  if (this.nomeCurto == null || this.nomeCurto == "" ||
    this.enunciado == null || this.enunciado == "" || this.dificuldade == null ||
     this.sequencia == null || this.sequencia < 1 || this.testsCases == undefined ||
      this.testsCases.length == 0 || TestCase.validarTestsCases(this.testsCases)==false) {
    return false;
  }
  return true;

}


  // validarSequencia(sequencia:Number){
  //   return new Observable(observer => {
  //     Questao.getAll(new Query("QuestaoSequencia", "==", sequencia)).subscribe(questoes => {

  //       if(questoes == null || questoes == undefined){
  //         console.log("realmente não existe essa sequencia")
  //         console.log(questoes);
  //         return true;
  //       }
  //       else{
  //         alert("A questão"+questoes[0].nome+ "já será exibida nesse sequencia,por favor coloque outro número");
  //         console.log(questoes);
  //         return false;
  //       }
  //     }, err => {
  //       observer.error(err);

  //     })
  //   })
  // }

  // TODO: fazer deletar para apagar os testscases




}
