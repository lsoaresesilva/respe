import { Document, Collection } from './firestore/document';

@Collection("assuntosConteudos")
export default class AssuntoConteudo extends Document{

    idConteudo;
    idAssunto;
    sequencia:number;


    constructor(id, idConteudo, idAssunto,sequencia){
        super(id);
        this.idConteudo = idConteudo;
        this.idAssunto = idAssunto;
        this.sequencia = sequencia;
    }
}