import { ErroCompilacao } from './erroCompilacao';

export class TypeError extends ErroCompilacao{
    
    // TypeError: unsupported operand type(s) for Sub: 'int' and 'str' on line 3

    constructor(id, erro, submissao){
        super(id, erro, submissao);
    }

    getMensagem() {
        return "Você tentou realizar uma operação matemática em duas variáveis de tipos diferentes, na linha "+this.linha;
    }

    

    


}
