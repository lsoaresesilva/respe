import Usuario from './usuario';
import { Assunto } from './assunto';
import { Document, Collection, ignore } from './firestore/document';
import { Dificuldade } from './enums/dificuldade';
import { Observable, forkJoin } from 'rxjs';
import AutoReflexao from './autoReflexao';
import Query from './firestore/query';
import { Util } from './util';
import { ConsoleComponent } from '../juiz/editor/console/console.component';

@Collection('planejamentos')
export class Planejamento extends Document {

  constructor(id, estudante, tempoEstudo, importanciaAssunto, estrategiaRealizacaoEstudo, public status, public autoReflexao) {
    super(id);
    this.estudante = estudante;
    this.tempoEstudo = tempoEstudo;
    this.importanciaAssunto = importanciaAssunto;
    this.estrategiaRealizacaoEstudo = estrategiaRealizacaoEstudo;
  }

  estudante: Usuario;
  tempoEstudo;
  importanciaAssunto;
  estrategiaRealizacaoEstudo;
  motivacao;
  @ignore()
  percentualConclusao;



  static getAll(query): Observable<any[]> {
    return new Observable(observer => {
      super.getAll(query).subscribe(planejamentos => {
        const consultas: any = {};
        planejamentos.forEach(planejamento => {

          planejamento['estudante'] = new Usuario(planejamento['estudanteId'], null, null, null, null);
          planejamento['autoReflexao'] = new AutoReflexao(planejamento['estudanteId'], null, null, null);
        });

        if ( !Util.isObjectEmpty(consultas) ) {
          forkJoin(consultas).subscribe(assuntos => {
            for (const id in assuntos) {
              planejamentos.forEach(planejamento => {
                if (planejamento['assuntoId'] == id) {
                  planejamento.assunto = assuntos[id];
                }
              });

            }

            observer.next(planejamentos);
            observer.complete();
          }, err => {
            observer.error(err);
          });
        } else {
          observer.next(planejamentos);
          observer.complete();
        }


      }, err => {
        observer.error(err);
      });
    });
  }

  static get(id): Observable<any> {
    return new Observable(observer => {
      super.get(id).subscribe(planejamento => {

        planejamento['estudante'] = new Usuario(planejamento['estudanteId'], null, null, null, null);

        if (planejamento['assuntoId'] != undefined) {

          Assunto.get(planejamento['assuntoId']).subscribe(assunto => {
            planejamento['assunto'] = assunto;
            observer.next(planejamento);
            observer.complete();
          }, err => {
            observer.error(err);
          });
        } else {
          observer.error(new Error('Não é possível carregar um planejamento sem assunto.'));
        }




      }, err => {
        observer.error(err);
      });
    });

  }

  static getByAssunto(assunto: Assunto, usuario: Usuario) {
    return new Observable(observer => {
      if (assunto != null && usuario != null) {
        this.getAll([new Query('assuntoId', '==', assunto.pk()), new Query('estudanteId', '==', usuario.pk())]).subscribe(planejamento => {
          if (planejamento.length > 0) {
            observer.next(planejamento[0]);
          } else {
            observer.next(planejamento);

          }

          observer.complete();
        });
      } else {
        observer.error(new Error('É preciso informar o assunto e usuário.'));
      }

    });

  }

  objectToDocument() {
    const document = super.objectToDocument();
    document['estudanteId'] = this.estudante.pk();
    if (this.autoReflexao != null) {
      document['autoReflexao'] = this.autoReflexao.objectToDocument();
    }

    return document;
  }

  validar() {
    return new Observable(observer => {
      if (this.estrategiaRealizacaoEstudo == '' || this.importanciaAssunto == '' || this.motivacao == 0) {
        observer.error(new Error('É preciso preencher todos os campos.'));
      } else {
        Planejamento.getAll([new Query('estudanteId', '==', this.estudante.pk()), new Query('assuntoId', '==', this.assunto.pk())]).subscribe(planejamento => {
          if (planejamento.length == 0) {
            observer.next(true);
            observer.complete();
          } else if (this.pk() == planejamento[0].id) {
            observer.next(true);
            observer.complete();
          } else {
            observer.error(new Error('Já existe um planejamento cadastrado para este assunto.'));
          }
        });

      }
    });


  }

}
