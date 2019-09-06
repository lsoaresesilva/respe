import Usuario from './usuario';
import { Assunto } from './assunto';
import { Document, Collection, ignore } from './firestore/document';
import { Dificuldade } from './dificuldade';
import { Observable, forkJoin } from 'rxjs';
import AutoReflexao from './autoReflexao';
import Estudante from './estudante';
import Query from './firestore/query';
import { Util } from './util';

@Collection("planejamentos")
export class Planejamento extends Document {
  estudante: Usuario;
  assunto: Assunto;
  tempoEstudo;
  importanciaAssunto;
  dificuldadeConteudo: Dificuldade;
  estrategiaRealizacaoEstudo;
  @ignore()
  percentualConclusao;

  constructor(id, estudante, assunto, tempoEstudo, importanciaAssunto, dificuldadeConteudo, estrategiaRealizacaoEstudo, public status, public autoReflexao) {
    super(id);
    this.estudante = estudante;
    this.assunto = assunto;
    this.tempoEstudo = tempoEstudo;
    this.importanciaAssunto = importanciaAssunto;
    this.dificuldadeConteudo = dificuldadeConteudo;
    this.estrategiaRealizacaoEstudo = estrategiaRealizacaoEstudo;
  }

  objectToDocument() {
    let document = super.objectToDocument()
    document["estudanteId"] = this.estudante.pk();
    document["assuntoId"] = this.assunto.pk();
    if (this.autoReflexao != null) {
      document["autoReflexao"] = this.autoReflexao.objectToDocument();
    }

    return document;
  }

  validar() {

    return new Observable(observer => {
      if (this.assunto == null || this.dificuldadeConteudo == 0 || this.estrategiaRealizacaoEstudo == "" || this.importanciaAssunto == "") {
        observer.error(new Error("É preciso preencher todos os campos."))
      } else {
        Planejamento.getAll([new Query("estudanteId", "==", this.estudante.pk()), new Query("assuntoId", "==", this.assunto.pk())]).subscribe(planejamento=>{
          if(planejamento.length == 0){
            observer.next(true);
            observer.complete();
          }else{
            observer.error(new Error("Já existe um planejamento cadastrado para este assunto."));
          }
        })
        
      }
    });


  }



  static getAll(query): Observable<any[]> {
    return new Observable(observer => {
      super.getAll(query).subscribe(planejamentos => {
        let consultas: any = {};
        planejamentos.forEach(planejamento => {

          planejamento["estudante"] = new Estudante(planejamento["estudanteId"], null);
          planejamento["autoReflexao"] = new AutoReflexao(planejamento["estudanteId"], null, null, null);

          if (planejamento["assuntoId"] != undefined && consultas[planejamento["assuntoId"]] == undefined) {

            consultas[planejamento["assuntoId"]] = Assunto.get(planejamento["assuntoId"]);
          }
        })

        if( !Util.isObjectEmpty(consultas) ){
          forkJoin(consultas).subscribe(assuntos => {
            for (let id in assuntos) {
              planejamentos.forEach(planejamento => {
                if (planejamento["assuntoId"] == id) {
                  planejamento.assunto = assuntos[id];
                }
              });
  
            }
  
            observer.next(planejamentos);
            observer.complete();
          }, err => {
            observer.error(err);
          })
        }else{
          observer.next(planejamentos);
          observer.complete();
        }

        
      }, err => {
        observer.error(err);
      })
    })
  }

  static get(id): Observable<any> {
    return new Observable(observer => {
      super.get(id).subscribe(planejamento => {

        planejamento["estudante"] = new Estudante(planejamento["estudanteId"], null);

        if (planejamento["assuntoId"] != undefined) {

          Assunto.get(planejamento["assuntoId"]).subscribe(assunto => {
            planejamento["assunto"] = assunto;
            observer.next(planejamento);
            observer.complete();
          }, err => {
            observer.error(err);
          })
        } else {
          observer.error(new Error("Não é possível carregar um planejamento sem assunto."))
        }




      }, err => {
        observer.error(err);
      })
    });

  }

}