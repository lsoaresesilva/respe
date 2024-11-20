import { Observable } from 'rxjs';
import { Assunto } from '../aprendizagem/questoes/assunto';
import { PerfilUsuario } from '../enums/perfilUsuario';
import { Collection, date, Document } from '../database/document';
import Query from '../database/query';
import Submissao from '../aprendizagem/questoes/respostaQuestaoProgramacao';
import Usuario from '../usuario';
import QuestaoProgramacaoCorrecao from '../aprendizagem/questoes/questaoProgramacaoCorrecao';
import RespostaQuestaoProgramacao from '../aprendizagem/questoes/respostaQuestaoProgramacao';

@Collection('correcoesAlgoritmos')
export default class RespostaQuestaoCorrecaoAlgoritmo extends Document {
  @date()
  data;

  constructor(id, public submissao: RespostaQuestaoProgramacao, public estudante, public assunto, public questao) {
    super(id);
  }


  static getAll(query = null, orderBy = null): Observable<RespostaQuestaoCorrecaoAlgoritmo[]> {
    return new Observable(observer=>{
        super.getAll(query, orderBy).subscribe(correcoes=>{
            correcoes.forEach(correcao=>{
                correcao.submissao = RespostaQuestaoProgramacao.documentToObject(correcao.submissao);//new RespostaQuestaoProgramacao(correcao.submissao.id, correcao.submissao.codigo, new Usuario(correcao.submissao.estudanteId, "", "", PerfilUsuario.estudante, 0, ""), new Assunto(correcao.submissao.assuntoId, ""), null);
            })

            observer.next(correcoes);
            observer.complete();
        })
    })
  }

  objectToDocument() {
    let object = super.objectToDocument();
    if (this.submissao != null) {
      object['submissao'] = this.submissao.objectToDocument();
    }

    if (this.estudante != null && this.estudante.pk != null) {
      object['estudanteId'] = this.estudante.pk;
    }

    if (this.assunto != null && this.assunto.pk != null) {
      object['assuntoId'] = this.assunto.pk;
    }

    if (this.questao != null && this.questao.pk != null) {
      object['questaoCorrecaoId'] = this.questao.pk;
    }

    return object;
  }

  static agruparPorQuestao(correcoes: RespostaQuestaoCorrecaoAlgoritmo[]) {
    const correcoesAgrupadas = new Map();
    correcoes.forEach((correcao) => {
      if (correcoesAgrupadas.get(correcao['questaoCorrecaoId']) === undefined) {
        correcoesAgrupadas.set(correcao['questaoCorrecaoId'], []);
      }

      correcoesAgrupadas.get(correcao['questaoCorrecaoId']).push(correcao);
    });

    return correcoesAgrupadas;
  }

  static getPorQuestao(questao, estudante) {
    return RespostaQuestaoCorrecaoAlgoritmo.getAll([
      new Query('estudanteId', '==', estudante.pk),
      new Query('questaoCorrecaoId', '==', questao.pk),
    ]);
  }

  /**
   * Recupera a submissão mais recente de um estudante para uma questão.
   */
  static getRecentePorQuestao(questao: QuestaoProgramacaoCorrecao, estudante: Usuario):Observable<RespostaQuestaoCorrecaoAlgoritmo> {
    return new Observable((observer) => {
      this.getPorQuestao(questao, estudante).subscribe((correcoes) => {

        const correcaoRecente = this.filtrarRecente(correcoes);

        observer.next(correcaoRecente);
        observer.complete();

      });
    });
  }

  static filtrarRecente(correcoes: RespostaQuestaoCorrecaoAlgoritmo[]): RespostaQuestaoCorrecaoAlgoritmo {
    let correcaoRecente = null;
    if (correcoes.length != 0) {
      if (correcoes.length == 1) {
        correcaoRecente = correcoes[0];
      } else {
        correcoes.forEach((correcao) => {
          if (correcaoRecente == null) {
            correcaoRecente = correcao;
          } else {
            if (correcaoRecente.data.toDate().getTime() <= correcao.data.toDate().getTime()) {
              correcaoRecente = correcao;
            }
          }
        });
      }
    }

    return correcaoRecente;
  }


}
