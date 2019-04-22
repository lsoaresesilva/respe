import { Document, Collection } from './firestore/document';

@Collection("assuntos")
export class Assunto extends Document{
 

    constructor(id, private nome, private preRequisitos:Assunto[], private objetivosEducacionais){
        super(id);
    }
}