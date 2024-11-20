import { Document, Collection } from '../database/document';

@Collection("textos")
export default class Texto extends Document{

    constructor(id, conteudo){
        super(id);
    }
}