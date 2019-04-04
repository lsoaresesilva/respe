import { Document, Collection } from './firestore/document';

@Collection("estudantes")
export default class Estudante extends Document{
    nome;

    constructor(id){
        super(id);
    }
    
}