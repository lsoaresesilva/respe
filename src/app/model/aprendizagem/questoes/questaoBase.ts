import { Observable, forkJoin } from 'rxjs';
import { ignore } from '../../firestore/document';
import { Util } from '../../util';
import { MaterialAprendizagem } from '../materialAprendizagem';
import { Assunto } from './assunto';
import Conceito from './conceito';
import conceito from './conceito';
import { Dificuldade } from './enum/dificuldade';
import RespostaBase from './respostaBase';

export default abstract class QuestaoBase implements MaterialAprendizagem {
  assunto: Assunto;
  ordem: number;
  nomeCurto: string;
  enunciado: string;
  conceitos: conceito[];
  dificuldade: Dificuldade;

  @ignore()
  percentualResposta;

  constructor(public id) {
    if (id == null) {
      this.id = Util.uuidv4();
    } else {
      this.id = id;
    }
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
      this.ordem > 0) {
      return true;
    }

    return false;
  }

  objectToDocument() {
    const document = {};
    document['id'] = this.id;
    document['nomeCurto'] = this.nomeCurto;
    document['enunciado'] = this.enunciado;
    document['ordem'] = this.ordem;
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
}
