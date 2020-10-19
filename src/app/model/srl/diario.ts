import { Document, Collection, date } from '../firestore/document';
import { Observable } from 'rxjs';
import Query from '../firestore/query';
import Usuario from '../usuario';

@Collection('diarios')
export default class Diario extends Document {
  constructor(id, public reflexao, public planejamento, public estudante) {
    super(id);
  }
  @date()
  data;

  static possuiDiarioAtualizado(estudante: Usuario) {
    return new Observable((observer) => {
      if (estudante != null) {
        // Pegar todos os diários

        super.getAll(new Query('estudanteId', '==', estudante.pk())).subscribe(
          (diarios) => {
            if (diarios != null) {
              // Verificar se a data do último foi de 7 dias atrás
              const diarioRecente = Diario.getRecente(diarios);
              const semanaAtras = new Date();
              //semanaAtras.setDate(semanaAtras.getDate() - 7);
              const diffTime = semanaAtras.getTime() - diarioRecente['data'].toDate().getTime();
              const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));
              if (diffDays >= 7) {
                observer.next(false);
              } else {
                observer.next(true);
              }
            } else {
              observer.next(false);
            }
            observer.complete();
          },
          (err) => {
            observer.error(err);
          }
        );
      }
    });
  }

  static getRecente(diarios) {
    let recente = null;
    if (Array.isArray(diarios) && diarios.length > 0) {
      recente = diarios.sort((a, b) => b.data - a.data);
      if (recente.length > 0) {
        return recente[0];
      }
    }

    return recente;
  }

  objectToDocument() {
    const document = super.objectToDocument();
    document['estudanteId'] = this.estudante.pk();

    return document;
  }

  validar() {
    if (
      this.reflexao != null &&
      this.reflexao !== '' &&
      this.planejamento != null &&
      this.planejamento !== ''
    ) {
      return true;
    }

    return false;
  }
}
