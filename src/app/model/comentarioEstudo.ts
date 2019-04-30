import { Collection, Document, oneToOne } from './firestore/document';
import Usuario from './usuario';
import { MaterialEstudo } from './materialEstudo';

@Collection("comentariosEstudos")
export default class ComentarioEstudo extends Document{

   @oneToOne({property:"materialEstudoId", type:MaterialEstudo})
   materialEstudo:MaterialEstudo

    constructor(id, usuario:Usuario, public comentario, public texto){
        super(id);
    }



    

}