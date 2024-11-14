import { Observable } from 'rxjs';
import { Collection, date, Document } from '../../firestore/document';
import Query from '../../firestore/query';
import QuestaoParsonProblem from './questaoParsonProblem';
import Usuario from '../../usuario';

@Collection('respostaquestaoparson')
export class RespostaQuestaoParson extends Document {
  constructor(
    public id,
    public estudante: Usuario,
    public algoritmo,
    public questao: QuestaoParsonProblem
  ) {
    super(id);
  }
  @date()
  data;

  static getRespostaQuestaoEstudante(questao): Observable<RespostaQuestaoParson> {
    return new Observable((observer) => {
      RespostaQuestaoParson.getByQuery([
        new Query('questaoId', '==', questao.pk),
      ]).subscribe((respostaSalva: RespostaQuestaoParson) => {
        observer.next(respostaSalva);
        observer.complete();
      });
    });
  }

  objectToDocument() {
    const document = super.objectToDocument();
    document['questao_id'] = this.questao.pk;

    if (Array.isArray(this.algoritmo)) {
      document['segmentos'] = this.algoritmo.map((segmento) => {
        return { segmento_id: segmento.id, sequencia: segmento.sequencia };
      });
    }

    return document;
  }
}
