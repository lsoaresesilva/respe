import { ErroCompilacao } from '../errors/analise-compilacao/erroCompilacao';
import Submissao from '../submissao';
import Mensagem from './mensagem';
import Observavel from './observavel';

export default class ChatBot {
  mensagens: Mensagem[];

  /* Mantém um registro das submissões do estudante.
  Utilizado para avaliar eventuais problemas que o estudante está passando. */
  submissoes: Submissao[];

  constructor() {
    this.submissoes = [];
    this.iniciarChat();
  }

  addSubmissao(submissao: Submissao) {
    this.submissoes.push(submissao);
    this.analisarNecessidadeAjuda();
  }

  /* Verifica se o estudante está precisando de ajuda.
  Analisa as três últimas submissões e verifica se há erros. */
  analisarNecessidadeAjuda() {
    let topErro = null;
    const erros = ErroCompilacao.getAllErros(this.submissoes);
    erros.forEach((erro) => {
      if (topErro == null) {
        topErro = erro.categoria;
      }
    });
  }

  enviarMensagemAjuda() {
    this.mensagens.push(
      new Mensagem(
        'Olá, parece que você está precisando de uma ajudinha. Posso lhe ajudar (responda sim ou não)?',
        null
      )
    );
  }

  receberMensagem() {}

  iniciarChat() {}
}
