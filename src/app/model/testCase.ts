import {Document, Collection} from './firestore/document'

@Collection("testsCases")
export default class TestCase extends Document{
    entradas:String [];
    saida:String;

    constructor(id, entradas, saida){
        super(id);
        this.entradas = entradas;
        this.saida = saida;
    }
}