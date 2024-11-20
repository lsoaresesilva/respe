import { Collection, Document, date } from '../../database/document';
import Usuario from '../../usuario';
import Query from '../../database/query';
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

  /* static getAll(query): Observable<RespostaQuestaoFechada[]> {
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
  } */

  /*
    Recupera os exercícios em que o estudante trabalhou na última semana.
    Para isso são analisadas as submissões que ele realizou.
  */
  static getAtividadesTrabalhadasUltimaSemana(estudante: Usuario) {
    return new Observable((observer) => {
      RespostaQuestaoFechada.getAll(new Query('estudanteId', '==', estudante.pk)).subscribe(
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
    document['estudante_id'] = this.estudante.pk;
    document['questao'] = this.questao.pk;
    document['alternativa'] = this.alternativa.pk;
    return document;
  }

  static dataToObject(data) {
  const respQuestaoFechada:RespostaQuestaoFechada = new RespostaQuestaoFechada(data.primary_key, data.estudante, data.alternativa, QuestaoFechada.dataToObject(data.questao));
    return respQuestaoFechada;
  }
  

  static getRespostaQuestaoEstudante(questao): Observable<RespostaQuestaoFechada> {
    return new Observable((observer) => {
      RespostaQuestaoFechada.getByQuery([
        new Query('questao_id', '==', questao.pk),
      ]).subscribe((respostaSalva: RespostaQuestaoFechada) => {
        observer.next(respostaSalva);
        observer.complete();
      });
    });
  }

  getTodasRespostasQuestoesFechadasEstudante(usuario) {
    return new Observable((observer) => {
      RespostaQuestaoFechada.getAll(new Query('estudanteId', '==', usuario.pk)).subscribe(
        (respostas) => {
          observer.next(respostas);
          observer.complete();
        }
      );
    });
  }

  isCorreta() {
    const alternativaCerta = this.questao.getAlternativaCerta();

    if (this.alternativa.pk == alternativaCerta.pk) {
      return true;
    } else {
      return false;
    }
  }
}
