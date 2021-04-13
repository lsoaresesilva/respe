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

  constructor(private submissao:Submissao) {}

  analisarErros() {
    this.erros = [];
    this.erros = this.erros.concat(ErroSintaxeVariavel.erros(this.submissao));
    this.erros = this.erros.concat(ErroSintaxeCondicional.erros(this.submissao));
    this.erros = this.erros.concat(ErroSintaxeFuncao.erros(this.submissao));
  }

  hasErrors() {
    if (this.erros.length > 0) {
      return true;
    }

    return false;
  }

  getHint(){
    if(this.submissao.erro.traceback != null){
      let categoria = ErroCompilacaoFactory.construir(this.submissao.erro.traceback);
      if(categoria instanceof NameError){
        return ErroSintaxeVariavel.erros(this.submissao);
      }else if(categoria instanceof SyntaxError){
        if( ErroSintaxe.getMainError(this.submissao.erro.traceback) == TipoErro.condicao){
          return ErroSintaxeCondicional.erros(this.submissao);
        }else{
          return ErroSintaxeRepeticao.erros(this.submissao);
        }
      }
    }

    return null;
  }
}
