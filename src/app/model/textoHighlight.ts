import { Document, Collection } from './firestore/document';
import Estudante from './estudante';

@Collection("textosHighlight")
export default class TextoHighlight extends Document{


    constructor(id, private estudante:Estudante, private texto:string){
        super(id);
    }
}