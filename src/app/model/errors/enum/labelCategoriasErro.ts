import { CategoriaErro } from './categoriasErro';

export enum LabelCategoriasErros{
    nameError = "NameError",
    syntaxError = "SyntaxError",
    typeError = "TypeError",
    indentationError = "IndentationError"


}

export function getLabelPorCategoriaNumero(categoria){
    if(categoria == CategoriaErro.nameError){
        return LabelCategoriasErros.nameError;
    }else if(categoria == CategoriaErro.syntaxError){
        return LabelCategoriasErros.syntaxError;
    }else if(categoria == CategoriaErro.typeError){
        return LabelCategoriasErros.typeError;
    }else if(categoria == CategoriaErro.indentationError){
        return LabelCategoriasErros.indentationError;
    }
}