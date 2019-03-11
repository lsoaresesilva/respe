import { Error } from './error';

export class ParseError extends Error{
    
    constructor(erro){
        super(erro);
    }
    
    mensagemErro() {
        return this.texto;
    }
}