import { Document, Collection, date } from './firestore/document';
import Usuario from './usuario';

@Collection("mensagensChat")
export default class MensagemChat extends Document{

    @date()
    data;

    constructor(id, public estudante:Usuario, public texto){
        super(id);
    }

    objectToDocument(){
        let document = this.objectToDocument();
        document["estudanteId"] = this.estudante.pk();

        return document;
    }
}