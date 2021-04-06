import { Observable } from 'rxjs';
import { Assunto } from '../assunto';
import { PerfilUsuario } from '../enums/perfilUsuario';
import { Collection, date, Document } from '../firestore/document';
import Query from '../firestore/query';
import { QuestaoProgramacao } from '../questoes/questaoProgramacao';
import QuestaoProgramacaoCorrecao from '../questoes/questaoProgramacaoCorrecao';
import Submissao from '../submissao';
import Usuario from '../usuario';

@Collection('correcoesAlgoritmos')
export default class CorrecaoAlgoritmo extends Document {
  @date()
  data;

  constructor(id, public submissao: Submissao, public estudante, public assunto, public questao) {
    super(id);
  }


  static getAll(query = null, orderBy = null): Observable<CorrecaoAlgoritmo[]> {
    return new Observable(observer=>{
        super.getAll(query, orderBy).subscribe(correcoes=>{
            correcoes.forEach(correcao=>{
                correcao.submissao = Submissao.documentToObject(correcao.submissao);//new Submissao(correcao.submissao.id, correcao.submissao.codigo, new Usuario(correcao.submissao.estudanteId, "", "", PerfilUsuario.estudante, 0, ""), new Assunto(correcao.submissao.assuntoId, ""), null);
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

    if (this.estudante != null && this.estudante.pk() != null) {
      object['estudanteId'] = this.estudante.pk();
    }

    if (this.assunto != null && this.assunto.pk() != null) {
      object['assuntoId'] = this.assunto.pk();
    }

    if (this.questao != null && this.questao.id != null) {
      object['questaoCorrecaoId'] = this.questao.id;
    }

    return object;
  }

  static agruparPorQuestao(correcoes: CorrecaoAlgoritmo[]) {
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
    return CorrecaoAlgoritmo.getAll([
      new Query('estudanteId', '==', estudante.pk()),
      new Query('questaoCorrecaoId', '==', questao.id),
    ]);
  }

  /**
   * Recupera a submissão mais recente de um estudante para uma questão.
   */
  static getRecentePorQuestao(questao: QuestaoProgramacaoCorrecao, estudante: Usuario):Observable<CorrecaoAlgoritmo> {
    return new Observable((observer) => {
      this.getPorQuestao(questao, estudante).subscribe((correcoes) => {
        
        const correcaoRecente = this.filtrarRecente(correcoes);
        
        observer.next(correcaoRecente);
        observer.complete();
        
      });
    });
  }

  static filtrarRecente(correcoes: CorrecaoAlgoritmo[]): CorrecaoAlgoritmo {
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
