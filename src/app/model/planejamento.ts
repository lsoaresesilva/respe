import Usuario from './usuario';
import { Assunto } from './assunto';
import { Document, Collection } from './firestore/document';
import { Dificuldade } from './dificuldade';
import { Observable, forkJoin } from 'rxjs';
import AutoReflexao from './autoReflexao';
import Estudante from './estudante';

@Collection("planejamentos")
export class Planejamento extends Document {
  estudante: Usuario;
  assunto: Assunto;
  tempoEstudo;
  importanciaAssunto;
  dificuldadeConteudo: Dificuldade;
  estrategiaRealizacaoEstudo;

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
    if(this.autoReflexao != null){
      document["autoReflexao"] = this.autoReflexao.objectToDocument();
    }

    return document;
  }

  validar() {
    if (this.assunto == null || this.dificuldadeConteudo == 0 || this.estrategiaRealizacaoEstudo == "" || this.importanciaAssunto == "") {

      return false;

    } else {
      return true;
    }
  }

  

  static getAll(query): Observable<any[]> {
    return new Observable(observer => {
      super.getAll(query).subscribe(planejamentos => {
        let consultas: any = {};
        planejamentos.forEach(planejamento => {

          planejamento["estudante"] = new Usuario(planejamento["estudanteId"], null, null,null);
          planejamento["autoReflexao"] = new AutoReflexao(planejamento["estudanteId"], null, null, null);

          if (planejamento["assuntoId"] != undefined && consultas[planejamento["assuntoId"]] == undefined) {

            consultas[planejamento["assuntoId"]] = Assunto.get(planejamento["assuntoId"]);
          }
        })

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
      }, err => {
        observer.error(err);
      })
    })
  }

  static get(id): Observable<any> {
    return new Observable(observer => {
      super.get(id).subscribe(planejamento => {

        planejamento["estudante"] = new Usuario(planejamento["estudanteId"], null, null, null);

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