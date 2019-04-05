import { Document, Collection } from './firestore/document';
import { Assunto } from './assunto';
import Estudante from './estudante';
import { Observable } from 'rxjs';

@Collection("autoReflexoes")
export default class AutoReflexao extends Document{
    
    estudante:Estudante;
    assunto:Assunto;
    acoesSucesso:string;
    acoesFracasso:string;

    constructor(id, estudante, assunto, acoesSucesso, acoesFracasso){
        super(id);
        this.estudante = estudante;
        this.assunto = assunto;
        this.acoesSucesso = acoesSucesso;
        this.acoesFracasso = acoesFracasso;
    }

    objectToDocument(){
        let document = super.objectToDocument()
        document["estudanteId"] = this.estudante.pk();
        document["assuntoId"] = this.assunto.pk();
        return document;
    }

    

}