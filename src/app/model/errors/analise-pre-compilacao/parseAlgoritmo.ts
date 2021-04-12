import ErroSintaxeCondicional from './erroSintaxeCondiconal';
import ErroSintaxeFuncao from './erroSintaxeFuncao';
import ErroSintaxeVariavel from './erroSintaxeVariavel';

/**
 * Analisa o algoritmo do estudante a procura de erros.
 */
export default class ParseAlgoritmo {
    
  erros;

  constructor(private submissao) {}

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
}
