import { Collection, date, Document } from './firestore/document';
import Usuario from './usuario';

@Collection("registroLogin")
export default class RegistroLogin extends Document{
    @date()
    data;
    usuario:Usuario;

    constructor(id, usuario){
        super(id);
        this.usuario = usuario;
    }

    objectToDocument(){
        let document = super.objectToDocument();
        document["usuarioId"] = this.usuario.pk();

        return document;
    }
}