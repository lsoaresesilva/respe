import Usuario from '../usuario';
import { Observable } from 'rxjs';
import { Collection, date, Document } from '../firestore/document';
import Query from '../firestore/query';

@Collection('tempoOnline')
export default class TempoOnline extends Document {
  @date()
  data;

  constructor(id, public segundos, public estudante) {
    super(id);
  }

  static getTempoOnlineUltimaSemana(estudante: Usuario) {
    return new Observable((observer) => {
      TempoOnline.getAll(new Query('estudanteId', '==', estudante.pk())).subscribe(
        (registrosTempo) => {
          // Filtrar apenas da ultima semana
          const semanaAtras = new Date();
          semanaAtras.setDate(new Date().getDate() - 7);

          const registrosTempoFiltrados = this.filterDocumentsByDate(
            registrosTempo,
            'data',
            new Date(),
            semanaAtras
          );

          let totalTempoUltimasemana = 0;

          registrosTempoFiltrados.forEach((tempo) => {
            totalTempoUltimasemana += tempo.segundos;
          });

          observer.next(registrosTempoFiltrados);
          observer.complete();
          // Verificar das submissoes quantas questões foram trabalhadas
        }
      );
    });
  }

  static filterDocumentsByDate(a, b, c, d){
    return [];
  }

  objectToDocument() {
    const document = super.objectToDocument();
    if (this.estudante != null && this.estudante.pk != null) {
      document['estudanteId'] = this.estudante.pk();
    }

    return document;
  }

  atualizarTempo(usuario: Usuario) {}
}
