import Usuario from './usuario';
import { Document, Collection } from './firestore/document';
import { QuestaoProgramacao } from './questoes/questaoProgramacao';
import { Observable } from 'rxjs';
import Query from './firestore/query';
import { Assuntos } from './enums/assuntos';

@Collection('autoInstrucao')
export class AutoInstrucao extends Document {
  constructor(
    id,
    estudante,
    questao,
    problema,
    variaveis,
    condicoes,
    repeticoes,
    funcoes,
    vetores
  ) {
    super(id);
    this.estudante = estudante;
    this.questao = questao;
    this.problema = problema;
    this.variaveis = variaveis;
    this.condicoes = condicoes;
    this.repeticoes = repeticoes;
    this.funcoes = funcoes;
    this.vetores = vetores;
  }
  estudante: Usuario;
  questao: QuestaoProgramacao;
  problema;
  variaveis;
  condicoes;
  repeticoes;
  funcoes;
  vetores;

  static getByEstudanteQuestao(estudanteId, questaoId): Observable<AutoInstrucao> {
    return new Observable((observer) => {
      AutoInstrucao.getAll([
        new Query('estudanteId', '==', estudanteId),
        new Query('questaoId', '==', questaoId),
      ]).subscribe((autoInstrucoesEstudante) => {
        if (autoInstrucoesEstudante.length > 0) {
          autoInstrucoesEstudante[0].estudante = new Usuario(
            autoInstrucoesEstudante[0].estudanteId,
            null,
            null,
            null,
            null,
            null
          );
          observer.next(autoInstrucoesEstudante[0]);
        } else {
          observer.next(null);
        }
        observer.complete();
      });
    });
  }

  objectToDocument() {
    let document = super.objectToDocument();
    document['estudanteId'] = this.estudante.pk();
    document['questaoId'] = this.questao.id; // TODO: incluir também o assuntoID
    return document;
  }

  isValido(assuntoPrincipal) {
    if (!this.questao.validar()) {
      return false;
    }

    let condicoes;
    let funcoes;
    let repeticoes;
    let vetores;

    let assuntosRelacionados = [assuntoPrincipal];

    if (this.questao.assuntos != undefined && Array.isArray(this.questao.assuntos)) {
      this.questao.assuntos.forEach((assunto) => {
        if (assunto != null) {
          assuntosRelacionados.push(assunto);
        }
      });
    }

    assuntosRelacionados.forEach((assunto) => {
      switch (assunto.nome) {
        case Assuntos.repeticoes: {
          repeticoes = true;
          break;
        }
        case Assuntos.condicoes: {
          condicoes = true;
          break;
        }
        case Assuntos.funcoes: {
          funcoes = true;
          break;
        }
        case Assuntos.vetores: {
          vetores = true;
          break;
        }
      }
    });

    let isValido = true;

    if (
      this.problema == undefined ||
      this.problema == '' ||
      this.variaveis == undefined ||
      this.variaveis == '' ||
      (condicoes == true && (this.condicoes == undefined || this.condicoes == '')) ||
      (funcoes == true && (this.funcoes == undefined || this.funcoes == '')) ||
      (repeticoes == true && (this.repeticoes == undefined || this.repeticoes == '')) ||
      (vetores == true && (this.vetores == undefined || this.vetores == ''))
    ) {
      isValido = false;
    }

    return isValido;
  }
}
