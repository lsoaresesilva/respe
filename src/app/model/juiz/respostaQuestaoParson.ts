import { Observable } from 'rxjs';
import { Collection, date, Document } from '../firestore/document';
import Query from '../firestore/query';
import QuestaoParsonProblem from '../questoes/questaoParsonProblem';
import Usuario from '../usuario';

@Collection('respostaQuestaoParson')
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

  static getRespostaQuestaoEstudante(questao, usuario): Observable<RespostaQuestaoParson> {
    return new Observable((observer) => {
      RespostaQuestaoParson.getByQuery([
        new Query('estudanteId', '==', usuario.pk()),
        new Query('questaoId', '==', questao.id),
      ]).subscribe((respostaSalva: RespostaQuestaoParson) => {
        observer.next(respostaSalva);
        observer.complete();
      });
    });
  }

  objectToDocument() {
    const document = super.objectToDocument();
    document['estudanteId'] = this.estudante.pk();
    document['questaoId'] = this.questao.id;

    if (Array.isArray(this.algoritmo)) {
      document['algoritmo'] = this.algoritmo.map((segmento) => {
        return { id: segmento.id, conteudo: segmento.conteudo, sequencia: segmento.sequencia };
      });
    }

    return document;
  }
}
