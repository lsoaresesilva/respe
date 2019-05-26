import { Document, Collection } from './firestore/document';
import { Questao } from './questao';
import Submissao from './submissao';
import RespostaPedidoAjuda from './respostaPedidoAjuda';

@Collection("pedidosAjuda")
export default class PedidoAjuda extends Document{

    constructor(id, public submissao:Submissao, public duvida:String = "", public quantidadeDeRespostas:number, public respostas:RespostaPedidoAjuda[]){
        super(id);
    }
    validar() {
        if (this.submissao == null || this.duvida == null || this.duvida == "") {
    
          return false;
    
        } else {
          return true;
        }
      }
}