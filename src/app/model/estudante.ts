import { Document, Collection } from './firestore/document';
import ResultadoTestCase from './resultadoTestCase';
import Query from './firestore/query';
import { Observable } from 'rxjs';

@Collection("estudantes")
export default class Estudante extends Document{
    id;
    nome: string;
    email: string;;
    senha: string;;
    usuario: string;

    constructor(id, nome, email, senha, usuario){
        super(id);
        this.nome = nome;
        this.email=email;
        this.senha=senha;
        this.usuario=usuario;
        
      
        
    }
    
    
}