import { Document, Collection } from './firestore/document';
import Estudante from './estudante';

@Collection("turmas")
export default class Turma extends Document{
    id;
    estudantes: Estudante[];

    constructor(id, public nome, estudantes){
        super(id);
        this.estudantes = estudantes;
    }

}