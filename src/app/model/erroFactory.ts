import { Error } from './error';
import { NameError } from './nameErro';
import { ParseError } from './parseError';
import { TypeError } from './typeError';

export default class ErroFactory{

 
    static create(erro):Error {
        let e;
        let tipoErro = Error.getTipoErro(erro);
        if(tipoErro == "NameError"){
            e = new NameError(erro);
        }else if(tipoErro == "ParseError"){
            e = new ParseError(erro);
        }else if(tipoErro == "TypeError"){
            e = new TypeError(erro);
        }

        return e;
    }
}