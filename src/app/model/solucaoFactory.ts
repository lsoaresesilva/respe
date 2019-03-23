import { Error } from './error';
import Codigo from './codigo';
import Solucao from './solucao';
import SolucaoNameError from './solucaoNameError';
import SolucaoParseError from './solucaoParseError';

export default class SolucaoFactory{

    

    private constructor(){
        
        
    }

    static check(erro:Error, codigo:Codigo):Solucao{
        if(erro.tipo == "NameError"){
            return new SolucaoNameError(erro, codigo);
        }else if(erro.tipo == "ParseError"){
            return new SolucaoParseError(erro, codigo);
        }
    }

}