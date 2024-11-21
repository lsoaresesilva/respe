import { Observable, forkJoin } from 'rxjs';
import { Document, ignore } from '../../database/document';
import { Util } from '../../util';
import { MaterialAprendizagem } from '../materialAprendizagem';
import { Assunto } from './assunto';
import Conceito from './conceito';
import conceito from './conceito';
import { Dificuldade } from './enum/dificuldade';
import RespostaBase from './respostaBase';

export default abstract class QuestaoBase extends Document implements MaterialAprendizagem {
  assunto: Assunto;
  sequencia: number;
  nomeCurto: string;
  enunciado: string;
  conceitos: conceito[];
  dificuldade: Dificuldade;

  respostaEstudante;

  @ignore()
  percentualResposta;

  constructor(public primary_key) {
    super(primary_key);
  }

  carregarConceitos() {
    const consultas: Observable<Conceito>[]  = [];
    if(Array.isArray(this.conceitos)){
      this.conceitos.forEach(conceito => {
        consultas.push(Conceito.get(conceito));
      });

      forkJoin(consultas).subscribe(conceitos => {
        this.conceitos = conceitos;
      });
    }

  }

  validar() {
    if (this.conceitos != null && this.dificuldade != null && this.enunciado != null && this.nomeCurto != null &&
      (Array.isArray(this.conceitos) && this.conceitos.length > 0) &&
      this.dificuldade > 0 &&
      this.enunciado !== '' &&
      this.nomeCurto !== '' &&
      this.sequencia > 0) {
      return true;
    }

    return false;
  }

  objectToDocument() {
    const document = {};
    document['primary_key'] = this.primary_key;
    document['nomeCurto'] = this.nomeCurto;
    document['enunciado'] = this.enunciado;
    document['ordem'] = this.sequencia;
    document['dificuldade'] = this.dificuldade ?? '';

    const conceitos = [];

    if (Array.isArray(this.conceitos) && this.conceitos.length > 0) {

      this.conceitos.forEach((conceito) => {
        if (typeof conceito.pk === 'function') {
          conceitos.push(conceito.pk());
        }else if(conceito != null){
          conceitos.push(conceito);
        }
      });

      document['conceitos'] = conceitos;
    }


    return document;
  }

  abstract isRespostaCorreta(resposta:RespostaBase): boolean;
  static get(id, lazy=true): Observable<QuestaoBase> {
    return new Observable<QuestaoBase>((observer) => {
      
      super.get(id, lazy).subscribe(
        (questao) => {
          questao = this.dataToObject(questao);
          observer.next(questao);
          observer.complete();
        },
        (err) => {
          observer.error(err);
        }
      )
    });
  }
}
