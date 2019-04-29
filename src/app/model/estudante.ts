import { Document, Collection } from './firestore/document';
import ResultadoTestCase from './resultadoTestCase';
import Query from './firestore/query';
import { Observable } from 'rxjs';

@Collection("estudantes")
export default class Estudante extends Document{
    nome;

    constructor(id, nome){
        super(id);
        this.nome = nome;
    }

    
    
}