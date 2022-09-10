import { Assunto } from "./questoes/assunto";
import Conceito from './questoes/conceito';

export interface MaterialAprendizagem{
    id;
    assunto:Assunto;
    ordem:number;
    nomeCurto;
    conceitos:Conceito[];
}
