import { ErroCompilacao } from './erroCompilacao';
import { ignore } from '../../firestore/document';

export default class SyntaxError extends ErroCompilacao{
    
    constructor(id, traceback, submissao){
        super(id, traceback, submissao);
        
    }

    
    
    getMensagem() {
        return "Há um problema no seu código na linha "+this.linha+". As possíveis causas podem ser:<br/>1) Você utilizou uma condição e está comparando as variáveis/valores com apenas uma igualdade.; ou <br/>2) Você utilizou uma condição e não informou a variável/valor em uma comparação."
    }

}