import Submissao from '../../submissao';
import ErroCompilacaoFactory from '../analise-compilacao/erroCompilacaoFactory';
import NameError from '../analise-compilacao/nameError';
import SyntaxError from '../analise-compilacao/syntaxError';
import { TipoErro } from './enum/tipoErro';
import ErroSintaxe from './erroSintaxe';
import ErroSintaxeCondicional from './erroSintaxeCondiconal';
import ErroSintaxeFuncao from './erroSintaxeFuncao';
import ErroSintaxeRepeticao from './erroSintaxeRepeticao';
import ErroSintaxeVariavel from './erroSintaxeVariavel';


/**
 * Analisa o algoritmo do estudante a procura de erros.
 */
export default class ParseAlgoritmo {

  erros;

  constructor(private algoritmo) {}

  /* analisarErros() { TODO: Utilizar para fazer análise dos erros durante a digitação
    this.erros = [];
    this.erros = this.erros.concat(ErroSintaxeVariavel.erros(this.submissao));
    this.erros = this.erros.concat(ErroSintaxeCondicional.erros(this.submissao));
    this.erros = this.erros.concat(ErroSintaxeFuncao.erros(this.submissao));
  } */

  hasErrors() {
    if (this.erros.length > 0) {
      return true;
    }

    return false;
  }

  // Obtém a indicação do erro mais provável de estar acontecendo a partir do traceback
  getHint(traceback){
    // TODO: Deve considerar o traceback para indicar dos erros qual o mais apropriado para mostrar
    if(traceback != null){
      let categoria = ErroCompilacaoFactory.construir(traceback);
      if(categoria instanceof NameError){
        return ErroSintaxeVariavel.erros(this.algoritmo);
      }else if(categoria instanceof SyntaxError){ // TODO: Modificar para coletar todos os erros no código e apontá-los
        let principalErro = ErroSintaxe.getMainError(traceback);
        if( principalErro == TipoErro.condicao){
          return ErroSintaxeCondicional.erros(this.algoritmo);
        }else if(principalErro == TipoErro.repeticao){
          return ErroSintaxeRepeticao.erros(this.algoritmo);
        }else{
          return ErroSintaxeFuncao.erros(this.algoritmo);
        }
      }
    }

    return null;
  }

  /**
   * Usado para identificar o tipo de erro e a mensagem
   * @param traceback
   * @returns
   */
  getMainError(traceback){
    if(traceback != null){
      let categoria = ErroCompilacaoFactory.construir(traceback);
      if(categoria instanceof NameError){
        return {contexto:TipoErro.variavel, mensagem:ErroSintaxeVariavel.erros(this.algoritmo)[0].tipoErro }
      }else if(categoria instanceof SyntaxError){ // TODO: Modificar para coletar todos os erros no código e apontá-los
        let principalErro = ErroSintaxe.getMainError(traceback);
        if( principalErro == TipoErro.condicao){
          return {contexto:TipoErro.condicao, mensagem:ErroSintaxeCondicional.erros(this.algoritmo)[0].tipoErro }
        }else if(principalErro == TipoErro.repeticao){
          return {contexto:TipoErro.repeticao, mensagem:ErroSintaxeRepeticao.erros(this.algoritmo)[0].tipoErro }
        }else{
          return {contexto:TipoErro.funcao, mensagem:ErroSintaxeFuncao.erros(this.algoritmo)[0].tipoErro }
        }
      }
    }

    return null;
  }
}
