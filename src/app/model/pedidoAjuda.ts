import { Document, Collection } from './firestore/document';
import Estudante from './estudante';
import { Questao } from './questao';

@Collection("pedidosAjuda")
export default class PedidoAjuda extends Document{

    constructor(id, public solicitante:Estudante, public questao:Questao){
        super(id);
    }

}