import { Document, Collection } from './firestore/document';
import { Questao } from './questao';
import Submissao from './submissao';
import RespostaPedidoAjuda from './respostaPedidoAjuda';

@Collection("pedidosAjuda")
export default class PedidoAjuda extends Document{

    constructor(public id, public submissao:Submissao, public duvida:String = "", public respostas:RespostaPedidoAjuda[]){
        super(id);
    }

    objectToDocument(){
        let document = super.objectToDocument();
        document["questaoId"] = this.submissao["questaoId"]; // TODO: mudar para objeto questao. mas precisa alterar o get de submissão para carregar questão do banco.
        if (this.respostas != null && this.respostas.length > 0) {
            let respostas = [];
            this.respostas.forEach(resposta => {
                respostas.push(resposta.id); // TODO: erro aqui
            })
      
            document["respostas"] = respostas;
          }

        return document;
    }

    validar() {
        if (this.submissao == null || typeof this.submissao.pk != "function" || this.duvida == null || this.duvida == "") {
          return false;
        } else {
          return true;
        }
      }
}