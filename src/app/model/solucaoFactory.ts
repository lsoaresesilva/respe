import { Error } from './error';
import Codigo from './codigo';
import StringSimilarity from '../util/stringSimilarity';
import Solucao from './solucao';
import SolucaoNameError from './solucaoNameError';

export default class SolucaoFactory{

    

    private constructor(){
        
        
    }

    static check(codigo:Codigo, erro:Error):Solucao{
        if(erro.tipo == "NameError"){
            return new SolucaoNameError(codigo, erro);
        }
    }

    private localizarSolucao(){
        
    }

    


}