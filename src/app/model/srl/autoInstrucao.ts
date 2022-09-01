import Usuario from '../usuario';
import { Document, Collection } from '../firestore/document';
import { Observable } from 'rxjs';
import Query from '../firestore/query';
import { Assuntos } from '../enums/assuntos';
import { QuestaoProgramacao } from '../questoes/questaoProgramacao';
import { Dificuldade } from '../questoes/enum/dificuldade';

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

  static exibirAutoInstrucao(questao:QuestaoProgramacao){
    if(questao != null && questao.dificuldade >= Dificuldade.medio){
      return true;
    }

    return false;
  }

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

  validar(assuntoPrincipal) {
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
      (this.problema != undefined && this.problema.length < 20) ||
      this.variaveis == undefined ||
      this.variaveis == '' ||
      (this.variaveis != undefined && this.variaveis.length < 20) ||
      (condicoes == true && (this.condicoes == undefined || this.condicoes == '' || (this.condicoes != null && this.condicoes.length < 20))) ||
      (funcoes == true && (this.funcoes == undefined || this.funcoes == '' || (this.funcoes != null && this.funcoes.length < 20))) ||
      (repeticoes == true && (this.repeticoes == undefined || this.repeticoes == '' || (this.repeticoes != null && this.repeticoes.length < 20))) ||
      (vetores == true && (this.vetores == undefined || this.vetores == '' || (this.vetores != null &&  this.vetores.length < 20)))
    ) {
      isValido = false;
    }

    return isValido;
  }


}
