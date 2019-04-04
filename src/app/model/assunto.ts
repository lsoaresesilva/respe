import { Document, Collection } from './firestore/document';

@Collection("assuntos")
export class Assunto extends Document{
    nome;

    constructor(id){
        super(id);
    }
}