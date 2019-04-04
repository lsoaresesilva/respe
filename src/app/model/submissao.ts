import Estudante from './estudante';
import { Questao } from './questao';
import Codigo from './codigo';

export default class Submissao{
    id;
    codigo:Codigo;
    estudante:Estudante;
    questao:Questao;

    constructor(codigo, estudante, questao){
        this.codigo = codigo;
        this.estudante = estudante;
        this.questao = questao;
    }

    objectToDocument(){
        return {algoritmo:this.codigo.algoritmo, estudanteId:this.estudante.id, questaoId:this.questao.id}
    }
}