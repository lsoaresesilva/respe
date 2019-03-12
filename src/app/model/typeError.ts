import { Error } from './error';

export class TypeError extends Error{
    
    // TypeError: unsupported operand type(s) for Sub: 'int' and 'str' on line 3

    constructor(erro){
        super(erro);
    }

    mensagem() {
        return "Você tentou realizar uma operação matemática em duas variáveis incompatíveis, na linha "+this.linha;
    }

    

    


}
