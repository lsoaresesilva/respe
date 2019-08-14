import Usuario from './usuario';
import { Assunto } from './assunto';
import Estudante from './estudante';
import { Document, Collection } from './firestore/document';
import { Dificuldade } from './dificuldade';
import { Questao } from './questao';

@Collection("autoInstrucao")
export class AutoInstrucao extends Document{
    estudante:Usuario;
    questao:Questao;
    problema;
    variaveis;
    condicoes;
    repeticoes;
    funcoes;
    vetores;

    constructor(id, estudante, questao, problema, variaveis, condicoes, repeticoes, funcoes, vetores){
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

    objectToDocument(){
        let document = super.objectToDocument()
        document["estudanteId"] = this.estudante.pk();
        document["questaoId"] = this.questao.id; // TODO: incluir também o assuntoID
        return document;
    }

}