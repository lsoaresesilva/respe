import { Document, Collection } from '../firestore/document';

@Collection("textos")
export default class Texto extends Document{

    constructor(id, conteudo){
        super(id);
    }
}