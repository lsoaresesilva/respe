import { ErroCompilacao } from './erroCompilacao';

/**
 * Ocorre quando a execução do algoritmo não é completada em um tempo razoável. 
 * O principal motivo deve ser pelo uso a mais de inputs no código.
 */
export default class TimedoutError extends ErroCompilacao {
  // TypeError: unsupported operand type(s) for Sub: 'int' and 'str' on line 3

  constructor(id, erro) {
    super(id, erro);
  }

  getMensagem() {
    return (
      'Há um problema no seu código. Tentamos executá-lo, mas ele demorou mais que o esperado. <br><br>Uma das causas para esse problema é quando você utiliza mais inputs do que as entradas dos tests cases.'
    );
  }
}
