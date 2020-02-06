import { ErroCompilacao } from './erroCompilacao';

import NameError from './nameError';
import SyntaxError from './syntaxError';
import TypeError from './typeError';
import { CategoriaErro } from '../enum/categoriasErro';
import IndentationError from './indentationError';
import DefaultError from './defaultError';

export default class ErroCompilacaoFactory{

    public static construir(traceback){

        let objeto;

        switch(ErroCompilacao.getCategoria(traceback)){
            case CategoriaErro.nameError:
                objeto = new NameError(null, traceback);
                break;
            case CategoriaErro.syntaxError:
                objeto = new SyntaxError(null, traceback);
                break;
            case CategoriaErro.typeError:
                objeto = new TypeError(null, traceback);
                break;
            case CategoriaErro.indentationError:
                objeto = new IndentationError(null, traceback);
                break;
            default: // TODO: erro genérico
                objeto = new DefaultError(null, traceback);
                break;

        }

        return objeto;
    }

    /**
     * Constrói um erro de compilação a partir do dado que foi persistido no banco de dados.
     * @param traceback 
     * @param submissao 
     */
    public static construirPorDocument(document){
        if(this.isDocumentErroCompilacaoValido(document)){
            return this.construir(document["traceback"])
        }

        return null;
    }

    public static isDocumentErroCompilacaoValido(document){
        if(document != null && document["traceback"] != null && document["traceback"] != "")
            return true;

        return false;
    }
}