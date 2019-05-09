import { Document, Collection } from './firestore/document';
import ResultadoTestCase from './resultadoTestCase';
import Query from './firestore/query';
import { Observable } from 'rxjs';
import Usuario from './usuario';

@Collection("estudantes")
export default class Estudante extends Document{
    id;

    constructor(id, public nome, public usuario:Usuario){
        super(id);
        this.nome = nome;
        this.usuario=usuario;
        
      
        
    }
    
    
}