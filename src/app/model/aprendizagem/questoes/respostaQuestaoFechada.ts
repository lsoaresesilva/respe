import { Collection, Document, date } from '../../firestore/document';
import Usuario from '../../usuario';
import Query from '../../firestore/query';
import Alternativa from './alternativa';
import { Observable } from 'rxjs';
import QuestaoFechada from './questaoFechada';

@Collection('respostaQuestaoFechada')
export class RespostaQuestaoFechada extends Document {
  @date()
  data;
  estudante: Usuario;
  alternativa: Alternativa;
  questao: QuestaoFechada;

  constructor(public id, estudante, alternativa, questao) {
    super(id);

    this.estudante = estudante;
    this.alternativa = alternativa;
    this.questao = questao;
  }

  static getAll(query): Observable<RespostaQuestaoFechada[]> {
    return new Observable((observer) => {
      super.getAll(query).subscribe(
        (respostas) => {
          const respostasQuestoesFechadas: RespostaQuestaoFechada[] = [];
          respostas.forEach((resposta) => {
            const respQuestaoFechada:RespostaQuestaoFechada = new RespostaQuestaoFechada(resposta.id,
              resposta.estudanteId, new Alternativa(resposta['alternativaId'], null, null),
              new QuestaoFechada(resposta.questaoId, null, null, null, null, null, null, null, null));
              respostasQuestoesFechadas.push(respQuestaoFechada);
          });

          observer.next(respostasQuestoesFechadas);
          observer.complete();
        },
        (err) => {
          observer.error(err);
        }
      );
    });
  }

  /*
    Recupera os exercícios em que o estudante trabalhou na última semana.
    Para isso são analisadas as submissões que ele realizou.
  */
  static getAtividadesTrabalhadasUltimaSemana(estudante: Usuario) {
    return new Observable((observer) => {
      RespostaQuestaoFechada.getAll(new Query('estudanteId', '==', estudante.pk())).subscribe(
        (submissoes) => {
          // Filtrar apenas da ultima semana
          const semanaAtras = new Date();
          semanaAtras.setDate(new Date().getDate() - 7);
          const atividadesFiltradas = RespostaQuestaoFechada.filterDocumentsByDate(
            submissoes,
            'data',
            new Date(),
            semanaAtras
          );

          observer.next(atividadesFiltradas);
          observer.complete();
        }
      );
    });
  }

  objectToDocument() {
    const document = super.objectToDocument();
    document['estudanteId'] = this.estudante.pk();
    document['questaoId'] = this.questao.id;
    document['alternativaId'] = this.alternativa.id;
    return document;
  }

  

  static getRespostaQuestaoEstudante(questao, usuario): Observable<RespostaQuestaoFechada> {
    return new Observable((observer) => {
      RespostaQuestaoFechada.getByQuery([
        new Query('estudanteId', '==', usuario.pk()),
        new Query('questaoId', '==', questao.id),
      ]).subscribe((respostaSalva: RespostaQuestaoFechada) => {
        observer.next(respostaSalva);
        observer.complete();
      });
    });
  }

  getTodasRespostasQuestoesFechadasEstudante(usuario) {
    return new Observable((observer) => {
      RespostaQuestaoFechada.getAll(new Query('estudanteId', '==', usuario.pk())).subscribe(
        (respostas) => {
          observer.next(respostas);
          observer.complete();
        }
      );
    });
  }

  isCorreta() {
    const alternativaCerta = this.questao.getAlternativaCerta();

    if (this.alternativa.id == alternativaCerta.id) {
      return true;
    } else {
      return false;
    }
  }
}
