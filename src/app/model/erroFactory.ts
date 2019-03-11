import { Error } from './error';
import { NameError } from './nameErro';
import { ParseError } from './parseError';

export default class ErroFactory{


    static create(erro) {
        let e;
        if(Error.getTipoErro(erro) == "NameError"){
            e = new NameError(erro);
        }else if(Error.getTipoErro(erro) == "ParseError"){
            e = new ParseError(erro);
        }

        return e;
    }
}