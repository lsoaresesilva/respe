import Usuario from './usuario';
import { Assunto } from './assunto';
import Estudante from './estudante';
import { Document, Collection } from './firestore/document';
import { Dificuldade } from './dificuldade';

@Collection("planejamento")
export class Planejamento extends Document{
    estudante:Estudante;
    assunto:Assunto;
    tempoEstudo;
    importanciaAssunto;
    dificuldadeConteudo:Dificuldade;
    estrategiaRealizacaoEstudo;

    constructor(id, estudante, assunto, tempoEstudo, importanciaAssunto, dificuldadeConteudo, estrategiaRealizacaoEstudo){
        super(id);
        this.estudante = estudante;
        this.assunto = assunto;
        this.tempoEstudo = tempoEstudo;
        this.importanciaAssunto = importanciaAssunto;
        this.dificuldadeConteudo = dificuldadeConteudo;
        this.estrategiaRealizacaoEstudo = estrategiaRealizacaoEstudo;
    }

    objectToDocument(){
        let document = super.objectToDocument()
        document["estudanteId"] = this.estudante.pk();
        document["assuntoId"] = this.assunto.pk();
        return document;
    }

}