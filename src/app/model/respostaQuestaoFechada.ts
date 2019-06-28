import { Collection, Document, date } from './firestore/document';
import Estudante from './estudante';
import { Util } from './util';
import Usuario from './usuario';


@Collection("respostaQuestaoFechada")
export class RespostaQuestaoFechada extends Document{

    usuario: Usuario;
    resposta :String;

    constructor(id, usuario, resposta){
        super(id);
        this.usuario = usuario;
        this.resposta = resposta;
       
    }

   objectToDocument(){
        let document = super.objectToDocument()
        document["usuarioId"] = this.usuario.pk();
        document["respostaId"] = this.resposta; 
        return document;
    }
}