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

@Collection("questoes")
export class Questao extends Document {

  nomeCurto: string;
  enunciado: string;
  dificuldade: Dificuldade;
  assuntos: Assunto[];
  assuntoPrincipal: Assunto;
  sequencia: number;
  testsCases: TestCase[];


  constructor(id, nomeCurto, enunciado, dificuldade, sequencia, assuntoPrincipal, assuntos, testsCases) {
    super(id);
    this.nomeCurto = nomeCurto;
    this.enunciado = enunciado;
    this.dificuldade = dificuldade;
    this.sequencia = sequencia;
    this.assuntos = assuntos;
    this.assuntoPrincipal = assuntoPrincipal;
    this.testsCases = testsCases;
  }

  objectToDocument() {
    let document = super.objectToDocument();
    if (this.assuntoPrincipal != null && typeof this.assuntoPrincipal.pk === "function")
      document["assuntoPrincipalId"] = this.assuntoPrincipal.pk();

    if (this.testsCases != null && this.testsCases.length > 0) {
      let ts = [];
      this.testsCases.forEach(testCase=>{
        ts.push(testCase.objectToDocument());
      })
      document["testsCases"] = ts;
    }

    return document;
  }

  static isFinalizada(questao) {
    return new Observable(observer => {
      Submissao.getRecentePorQuestao(questao, Usuario.getUsuarioLogado()).subscribe(submissao => {
        if (submissao != null) {
          let consultas = [];
          questao.testsCases.forEach(testCase => {
            consultas.push(ResultadoTestCase.getRecentePorSubmissaoTestCase(testCase, submissao));
          })

          if (consultas.length > 0) {
            forkJoin(consultas).subscribe(resultadosTestCase => {
              let totalTestCase = questao.testsCases.length;
              let totalRespondidasSucesso = 0;
              resultadosTestCase.forEach(resultado => {

                if (resultado != null && resultado["status"] == true)
                  totalRespondidasSucesso++;
              })

              let percentual = (totalRespondidasSucesso / totalTestCase) * 100;
              observer.next(percentual);
              observer.complete();
            }, err => {
              observer.error(err);
            })
          } else {
            observer.next(0);
            observer.complete();
          }



        } else {
          observer.next(0);
          observer.complete();
        }

      }, err => {
        observer.error(err);
      })
    })

  }

  save() {
    return new Observable(observer => {

      if (this.validar()) {
        super.save().subscribe(questao => {

          let operacoesFirestore = [];

          this.assuntos.forEach(assunto => {
            let operacaoSave = new AssuntoQuestao(null, questao, assunto).save();
            operacoesFirestore.push(operacaoSave);
          })

          forkJoin(operacoesFirestore).subscribe(resultados => {
            observer.next(questao)
            observer.complete();
          }, err => {
            observer.error(new Error("Falha ao salvar os assuntos/testscases de uma questão.: " + err));
          })

        })
      } else {
        observer.error(new Error("Objeto questão é inválido."));
      }


    })

  }

  static get(id) {
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

  }

  validar() {
    if (this.assuntos == undefined || this.assuntos == null || this.assuntoPrincipal == null || this.assuntoPrincipal == undefined ||
      this.assuntos.length == 0 || this.nomeCurto == null || this.nomeCurto == "" ||
      this.enunciado == null || this.enunciado == "" || this.dificuldade == null || this.sequencia == null || this.sequencia < 1 || this.testsCases == undefined || this.testsCases.length == 0) {
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