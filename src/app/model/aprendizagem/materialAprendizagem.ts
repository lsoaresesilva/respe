import { Assunto } from "./questoes/assunto";
import Conceito from './questoes/conceito';

export interface MaterialAprendizagem{
    primary_key;
    assunto:Assunto;
    sequencia:number;
    nomeCurto;
    conceitos:Conceito[];
   
}
