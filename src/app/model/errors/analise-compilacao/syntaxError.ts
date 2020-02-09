import { ErroCompilacao } from './erroCompilacao';
import { ignore } from '../../firestore/document';

export default class SyntaxError extends ErroCompilacao{
    
    constructor(id, traceback){
        super(id, traceback);
        
    }

    
    
    getMensagem() {
        return "Há um problema no seu código na linha "+this.linha+". As possíveis causas podem ser:<br/><br/>1) Você utilizou uma condição e está comparando as variáveis/valores com apenas uma igualdade.; ou <br/>2) Você utilizou uma condição e não informou a variável/valor em uma comparação.; ou <br/>3) Você não incluiu o sinal de comparação (>, <, >=, <=, == ou !=) na condição. ou <br/> 4) Você escreveu uma condição, repetição ou função e não incluiu os : (dois pontos). ou <br/> 5) Você escreveu uma função ou a chamada à uma função e não colocou o parêntesis de abertura e/ou fechamento ()."
    }

}