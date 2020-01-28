import { ErroCompilacao } from './erroCompilacao';

import NameError from './nameError';
import SyntaxError from './syntaxError';
import TypeError from './typeError';
import { CategoriaErro } from '../enum/categoriasErro';
import IndentationError from './indentationError';
import DefaultError from './defaultError';

export default class ErroCompilacaoFactory{

    public static construir(traceback, submissao){

        let objeto;

        switch(ErroCompilacao.getCategoria(traceback)){
            case CategoriaErro.nameError:
                objeto = new NameError(null, traceback, submissao);
                break;
            case CategoriaErro.syntaxError:
                objeto = new SyntaxError(null, traceback, submissao);
                break;
            case CategoriaErro.typeError:
                objeto = new TypeError(null, traceback, submissao);
                break;
            case CategoriaErro.indentationError:
                objeto = new IndentationError(null, traceback, submissao);
                break;
            default: // TODO: erro genérico
                objeto = new DefaultError(null, traceback, submissao);
                break;

        }

        return objeto;
    }

}