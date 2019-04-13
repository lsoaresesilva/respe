import Estudante from './estudante';
import { Questao } from './questao';
import Codigo from './codigo';
import { Document, Collection } from './firestore/document';

@Collection("submissoes")
export default class Submissao extends Document{

    codigo:Codigo;
    estudante:Estudante;
    questao:Questao;

    constructor(id, codigo, estudante, questao){
        super(id);
        this.codigo = codigo;
        this.estudante = estudante;
        this.questao = questao;
    }

    objectToDocument(){
        return {algoritmo:this.codigo.algoritmo, estudanteId:this.estudante.pk(), questaoId:this.questao.pk()}
    }
}