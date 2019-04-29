import { Document, Collection, date } from './firestore/document';
import Estudante from './estudante';
import { database } from 'firebase';

@Collection("mensagensChat")
export default class MensagemChat extends Document{

    @date()
    data;

    constructor(id, private estudante:Estudante, private texto){
        super(id);
    }
}