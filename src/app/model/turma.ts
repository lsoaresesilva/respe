import { Document, Collection } from './firestore/document';

@Collection("turmas")
export default class Turma extends Document{

    constructor(id, public nome){
        super(id);
    }

}