import { Collection, Document, oneToOne } from './firestore/document';
import Usuario from './usuario';

@Collection("comentariosConteudos")
export default class ComentarioConteudo extends Document{

    
   // TODO: incluir o obj conteudo


    constructor(id, usuario:Usuario, public comentario, public texto){
        super(id);
    }



    

}