import { Document, Collection } from './firestore/document';
import Usuario from './usuario';

@Collection("textosHighlight")
export default class TextoHighlight extends Document{


    constructor(id, private usuario:Usuario, public document, private texto:string){
        super(id);
    }
}