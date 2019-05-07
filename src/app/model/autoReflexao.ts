import { Document, Collection } from './firestore/document';
import { Assunto } from './assunto';
import Usuario from './usuario';
import { NivelConfianca } from './nivelConfianca';

@Collection("autoReflexoes")
export default class AutoReflexao extends Document {

    estudante: Usuario;
    nivelConfianca:NivelConfianca;

    constructor(id, public assunto, nivelConfianca, public dificuldades, public acoesSucesso, public acoesFracasso) {
        super(id);
        this.estudante = Usuario.getUsuarioLogado();
        this.nivelConfianca = nivelConfianca;
    }

    objectToDocument() {
        let document = super.objectToDocument()
        document["estudanteId"] = this.estudante.pk();
        document["assuntoId"] = this.assunto.pk();
        return document;
    }
    validar() {
        if (this.acoesSucesso != "" || this.acoesFracasso != "" || this.dificuldades != "" || this.nivelConfianca > 0) {
            return true;
        } else {
            return false;
        }
    }
}