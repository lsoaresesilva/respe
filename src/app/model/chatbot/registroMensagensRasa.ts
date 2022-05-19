import { Collection, date, Document } from "../firestore/document";

@Collection('registroMensagensRasa')
export default class RegistroMensagensRasa extends Document {

    @date()
    data;

    constructor(id, public estudanteId, public conversa) {
        super(id);
    }

    objectToDocument() {
        const document = super.objectToDocument();
        document['estudanteId'] = this.estudanteId;
        document['conversa'] = this.conversa;
        return document;
    }
}