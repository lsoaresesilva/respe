import { ErroCompilacao } from '../analise-compilacao/erroCompilacao';
import { LabelCategoriasErros } from './labelCategoriasErro';

export enum CategoriaErro {
    nameError = "1",
    syntaxError = "2",
    typeError = "3",
    indentationError = "4"
}

export function getCategoriaPorInstancia(erro:ErroCompilacao){
    if(erro != null){
        if(erro.constructor.name == LabelCategoriasErros.nameError){
            return CategoriaErro.nameError;
        }else if(erro.constructor.name == LabelCategoriasErros.syntaxError){
            return CategoriaErro.syntaxError;
        }else if(erro.constructor.name == LabelCategoriasErros.indentationError){
            return CategoriaErro.indentationError;
        }else if(erro.constructor.name == LabelCategoriasErros.typeError){
            return CategoriaErro.typeError;
        }
    }

    return null;
}