import { Document, Collection } from './firestore/document';
import { QuestaoProgramacao } from './questoes/questaoProgramacao';
import Submissao from './submissao';
import RespostaPedidoAjuda from './respostaPedidoAjuda';

@Collection('pedidosAjuda')
export default class PedidoAjuda extends Document {
  constructor(
    public id,
    public submissao: Submissao,
    public duvida: String = '',
    public respostas: RespostaPedidoAjuda[]
  ) {
    super(id);
  }

  objectToDocument() {
    let document = super.objectToDocument();
    document['submissaoId'] = this.submissao.pk(); // TODO: mudar para objeto questao. mas precisa alterar o get de submissão para carregar questão do banco.
    // TODO: pegar a submissão mais recente do BD ao carregar um pedido de ajuda.
    if (this.respostas != null && this.respostas.length > 0) {
      let respostas = [];
      this.respostas.forEach((resposta) => {
        respostas.push(resposta.id); // TODO: erro aqui
      });

      document['respostas'] = respostas;
    }

    return document;
  }

  validar() {
    if (
      this.submissao == null ||
      typeof this.submissao.pk != 'function' ||
      this.duvida == null ||
      this.duvida == ''
    ) {
      return false;
    } else {
      return true;
    }
  }
}
