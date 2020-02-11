import { Document, Collection, date } from './firestore/document';
import Usuario from './usuario';

@Collection("mensagensChat")
export default class MensagemChat extends Document{

    @date()
    data;

    constructor(id, private estudante:Usuario, private texto){
        super(id);
    }
}