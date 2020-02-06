import { ErroCompilacao } from './erroCompilacao';

export default class TypeError extends ErroCompilacao{
    
    // TypeError: unsupported operand type(s) for Sub: 'int' and 'str' on line 3

    constructor(id, erro){
        super(id, erro);
    }

    getMensagem() {
        return "Há um problema no seu código na linha "+this.linha+". As possíveis causas, podem ser: 1) você tentou realizar uma operação matemática em duas variáveis de tipos diferentes";
    }

    

    


}
