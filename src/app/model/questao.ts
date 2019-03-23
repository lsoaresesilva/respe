import { Assunto } from './assunto';

export class Questao{
  textoCurto: string;
  assuntos:Assunto[];

  constructor(){
    this.assuntos = [];
  }

}