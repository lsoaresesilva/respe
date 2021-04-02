import { CategoriaErro } from './categoriasErro';

export enum LabelCategoriasErros {
  nameError = 'NameError',
  syntaxError = 'SyntaxError',
  typeError = 'TypeError',
  indentationError = 'IndentationError',
  timedoutError = 'TimedoutError',
  valueError = 'ValueError'
}

export function getLabelPorCategoriaNumero(categoria) {
  if (categoria == CategoriaErro.nameError) {
    return LabelCategoriasErros.nameError;
  } else if (categoria == CategoriaErro.syntaxError) {
    return LabelCategoriasErros.syntaxError;
  } else if (categoria == CategoriaErro.typeError) {
    return LabelCategoriasErros.typeError;
  } else if (categoria == CategoriaErro.identationError) {
    return LabelCategoriasErros.indentationError;
  }else if (categoria == CategoriaErro.timedoutError) {
    return LabelCategoriasErros.timedoutError;
  }else if (categoria == CategoriaErro.valueError) {
    return LabelCategoriasErros.valueError;
  }
}
