
import Turma from './turma';
import { Document, Collection } from './firestore/document';
import Usuario from './usuario';

@Collection("estudantesTurmas")
export default class EstudanteTurma extends Document{

    constructor(id, public estudante:Usuario, public turma:Turma){
        super(id);
    }

    objectToDocument(){
        if(this.estudante == undefined){
            throw new Error("Estudante não pode ser undefined");
        }

        if(this.turma == undefined){
            throw new Error("Turma não pode ser undefined");
        }

        let document = super.objectToDocument();
        document["estudanteId"] = this.estudante.pk();
        document["turmaId"] = this.turma.codigo;
        
        return document;
    }
}