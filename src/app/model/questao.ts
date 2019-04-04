import { Assunto } from './assunto';

export class Questao{
  id;
  textoCurto: string;
  assuntos:Assunto[];

  constructor(){
    this.assuntos = [];
  }

}