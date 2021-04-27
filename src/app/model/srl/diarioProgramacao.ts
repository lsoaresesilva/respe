import { Observable } from 'rxjs';
import { Collection, date, Document } from '../firestore/document';
import Query from '../firestore/query';
import Usuario from '../usuario';
import { TipoDiarioProgramacao } from './enum/tipoDiarioProgramacao';

@Collection('diariosProgramacao')
export default class DiarioProgramacao extends Document {
  @date()
  data;

  constructor(id, public texto, public estudante: Usuario, public tipo: TipoDiarioProgramacao) {
    super(id);
  }

  objectToDocument() {
    let document = super.objectToDocument();
    if (this.estudante != null && this.estudante.pk() != null) {
      document['estudanteId'] = this.estudante.pk();
    }

    return document;
  }

  static exibirDiario(estudante: Usuario, tipo: TipoDiarioProgramacao) {
    return new Observable((observer) => {
      DiarioProgramacao.getAll(new Query('estudanteId', '==', estudante.pk())).subscribe(
        (diarios) => {
          if (Array.isArray(diarios) && diarios.length > 0) {
            // Verificar se a data do último foi de 7 dias atrás
            const diarioRecente = this.getRecente(diarios, tipo);
            if( diarioRecente != null){
                const semanaAtras = new Date();
                const diffTime = semanaAtras.getTime() - diarioRecente.data.toDate().getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));
                if (diffDays >= 6) {
                  observer.next(true);
                } else {
                  observer.next(false);
                }
            }else{
                observer.next(true);
            }
            
          } else {
            observer.next(true);
          }

          observer.complete();
        }
      );
    });
  }

  // Planejamento deve ser apresentado a cada 7 dias

  // Monitoramento quando o error quotient for alto

  static getRecente(diarios, tipo: TipoDiarioProgramacao): DiarioProgramacao {
    let recente = null;
    let diariosFiltrados = diarios.filter((diario) => {
      return diario.tipo == tipo;
    });
    if (Array.isArray(diariosFiltrados) && diariosFiltrados.length > 0) {
      recente = diariosFiltrados.sort((a, b) => b.data - a.data);
      if (recente.length > 0) {
        return recente[0];
      }
    }

    return recente;
  }

  validar() {
    if (this.texto != '' && this.tipo != null && this.texto.length >= 50) {
      return true;
    }

    return false;
  }
}
