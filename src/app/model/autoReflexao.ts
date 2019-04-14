import { Document, Collection } from './firestore/document';
import { Assunto } from './assunto';
import Estudante from './estudante';

@Collection("autoReflexoes")
export default class AutoReflexao extends Document {

    estudante: Estudante;
    assunto: Assunto;
    acoesSucesso: string;
    acoesFracasso: string;
    isValido: boolean = false;

    constructor(id, estudante, assunto, acoesSucesso, acoesFracasso) {
        super(id);
        this.estudante = estudante;
        this.assunto = assunto;
        this.acoesSucesso = acoesSucesso;
        this.acoesFracasso = acoesFracasso;
    }

    objectToDocument() {
        let document = super.objectToDocument()
        document["estudanteId"] = this.estudante.pk();
        //document["assuntoId"] = this.assunto.pk();
        return document;
    }
    validar() {
        if (this.acoesSucesso != "" || this.acoesFracasso != "") {
            this.isValido = true;
        } else {
            this.isValido = false;
        }
    }
}