import { ErroCompilacao } from './erroCompilacao';

import NameError from './nameError';
import { CategoriaErro } from '../enum/categoriasErro';

export default class ErroCompilacaoFactory{

    public static construir(traceback, submissao){

        let objeto;

        switch(ErroCompilacao.getCategoria(traceback)){
            case CategoriaErro.nameError:
                objeto = new NameError(null, traceback, submissao);
                break;
        }

        return objeto;
    }

}