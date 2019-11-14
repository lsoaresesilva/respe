import { Document } from '../firestore/document';

export default class Secao extends Document{

    constructor(id, assunto, sequencia){
        super(id);
    }
}