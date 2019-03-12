import { Error } from './error';
import Codigo from './codigo';
import StringSimilarity from '../util/stringSimilarity';
import Solucao from './solucao';
import SolucaoNameError from './solucaoNameError';
import SolucaoParseError from './solucaoParseError';

export default class SolucaoFactory{

    

    private constructor(){
        
        
    }

    static check(erro:Error):Solucao{
        if(erro.tipo == "NameError"){
            return new SolucaoNameError(erro);
        }else if(erro.tipo == "ParseError"){
            return new SolucaoParseError(erro);
        }
    }

}