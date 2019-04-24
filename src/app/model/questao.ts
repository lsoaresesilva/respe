import { Assunto } from './assunto';
import { Document, Collection } from './firestore/document';
import { Observable, forkJoin } from 'rxjs';
import { Dificuldade } from "./dificuldade"
import Query from './firestore/query';
import AssuntoQuestao from './assuntoQuestao';
import TestCase from './testCase';

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

    return document;
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

          this.testsCases.forEach(testCase => {

            operacoesFirestore.push(testCase.save());
          })



          forkJoin(operacoesFirestore).subscribe(resultados => {
            observer.next(questao)
            observer.complete();
          }, err => {
            observer.error(new Error("Falha ao salvar os assuntos de uma questão."));
          })

        })
      } else {
        observer.error(new Error("Objeto questão é inválido."));
      }


    })

  }

  /*static get(id){
    return new Observable(observer => {
      super.get(id).subscribe(questao=>{
        let assuntosQuestoes = []
        let assuntoPrincipal = [];
        if (assuntosQuestoes.length > 0) {
          forkJoin(assuntosQuestoes).subscribe(aQuestoes => {
            for (let i = 0; i < aQuestoes.length; i++) {
              //questoes[i].assuntos = aQuestoes[i];
            }
        }
      })
    });
  }*/

  static getAll(query: Query = null): Observable<any[]> {
    return new Observable(observer => {
      super.getAll(query).subscribe(questoes => {
        /*let assuntosQuestoes = {}
        let assuntosPrincipais = {};*/
        let consultas = {}
        let counter = 0;
        questoes.forEach(questao => {
          counter++;
          let questaoId = questao.id;
          consultas["assuntosQuestao_"+questaoId] = this.getAssuntos(questao);
          if (questao.assuntoPrincipalId != null && questao.assuntoPrincipalId != "")
            consultas["assuntoPrincipal_"+questaoId] = Assunto.get(questao.assuntoPrincipalId);
        })


        if(counter > 0 )
          forkJoin(consultas).subscribe(resultados => {

            questoes.forEach(questao => {
              let assuntosQuestaoKey = "assuntosQuestao_"+questao.id;
              let assuntoPrincipalKey = "assuntoPrincipal_"+questao.id;
              questao.assuntos = resultados[assuntosQuestaoKey]
              questao.assuntoPrincipal = resultados[assuntoPrincipalKey]

            });

            
          }, err => {
            observer.error(err);
          }, ()=>{
            observer.next(questoes);
            observer.complete();
          })
        else{
          observer.next(questoes);
          observer.complete();
        }
      })

    });
  }

  private static getAssuntos(questao) {
        return new Observable(observer => {
          let assuntos = []
          AssuntoQuestao.getAll(new Query("idQuestao", "==", questao.id)).subscribe(assuntosQuestao => {
            let consultaAssuntos = [];
            assuntosQuestao.forEach(assuntoQuestao => {

              consultaAssuntos.push(Assunto.get(assuntoQuestao.idAssunto));
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

          })
        })

      }

  validar() {
        if(this.assuntos == undefined || this.assuntos == null || this.assuntoPrincipal == null || this.assuntoPrincipal == undefined ||
          this.assuntos.length == 0 || this.nomeCurto == null || this.nomeCurto == "" ||
          this.enunciado == null || this.enunciado == "" || this.dificuldade == null || this.sequencia == null || this.sequencia < 1) {
      return false;
    }

    return true;
  }

  // TODO: fazer deletar para apagar os testscases





}