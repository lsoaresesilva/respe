import { ErroCompilacao } from './erroCompilacao';
import { ignore } from '../../firestore/document';

export default class IndentationError extends ErroCompilacao{
    
  
    @ignore()
    nomeVariavel;

    constructor(id, traceback, submissao){
        super(id, traceback, submissao);
    }

    
    
    getMensagem() {
        return "Há um problema no seu código na linha "+this.linha+". O código desta linha pertence ao escopo de uma condição, repetição ou função, mas não está identado (com 4 espaços antes do código)."
    }

}