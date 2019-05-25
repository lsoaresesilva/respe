import { Document, Collection } from './firestore/document';
import { Assunto } from './assunto';
import Usuario from './usuario';
import { NivelConfianca } from './nivelConfianca';

@Collection("autoReflexoes")
export default class AutoReflexao {

    nivelConfianca:NivelConfianca;

    constructor(nivelConfianca, public dificuldades, public acoesSucesso, public acoesFracasso) {
        this.nivelConfianca = nivelConfianca;
    }

    objectToDocument(){
        return {
            nivelConfiaca:this.nivelConfianca,
            dificuldades:this.dificuldades,
            acoesSucesso:this.acoesSucesso,
            acoesFracasso:this.acoesFracasso
        }
    }

    validar() {
        if (this.acoesSucesso != "" || this.acoesFracasso != "" || this.dificuldades != "" || this.nivelConfianca > 0) {
            return true;
        } else {
            return false;
        }
    }
}