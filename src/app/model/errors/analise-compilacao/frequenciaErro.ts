import { CategoriaErro } from '../enum/categoriasErro';
import { getLabelPorCategoriaNumero } from '../enum/labelCategoriasErro';
import { ErroCompilacao } from './erroCompilacao';

/**
 * Representa um dado do histograma de erros de compilação organizados por meses.
 */
export default class FrequenciaErro {
  constructor(public categoriaErro: CategoriaErro, public contagem = 0) {}

  /**
   * Retorna o número top de erros cometidos pelo estudante.
   * @param erros
   * @param top
   */
  static getTopErros(erros: FrequenciaErro[], top = 2) {
    if (erros != null && Array.isArray(erros)) {
      erros.sort(function (frequenciaA, frequenciaB) {
        return frequenciaB.contagem - frequenciaA.contagem;
      });

      return erros;
    }

    return null;
  }

  static calcularFrequenciaPorTipoErro(erros): any {
    let nameError = new FrequenciaErro(CategoriaErro.nameError);
    let syntaxError = new FrequenciaErro(CategoriaErro.syntaxError);
    let typeError = new FrequenciaErro(CategoriaErro.typeError);
    let indentationError = new FrequenciaErro(CategoriaErro.identationError);

    let resultados = [nameError, syntaxError, typeError, indentationError];

    erros.forEach((erro) => {
      if (erro.categoria == CategoriaErro.nameError) {
        nameError.contagem += 1;
      } else if (erro.categoria == CategoriaErro.syntaxError) {
        syntaxError.contagem += 1;
      } else if (erro.categoria == CategoriaErro.typeError) {
        typeError.contagem += 1;
      } else if (erro.categoria == CategoriaErro.identationError) {
        indentationError.contagem += 1;
      }
    });

    return resultados;
  }

  static calcularFrequencia(erros: ErroCompilacao[]) {
    const freqIdentationError = new FrequenciaErro(CategoriaErro.identationError);
    const freqNameError = new FrequenciaErro(CategoriaErro.nameError);
    const freqSyntaxError = new FrequenciaErro(CategoriaErro.syntaxError);
    const freqTypeError = new FrequenciaErro(CategoriaErro.typeError);

    const frequencia = [freqIdentationError, freqNameError, freqSyntaxError, freqTypeError];

    if (Array.isArray(erros)) {
      erros.forEach((erro) => {
        if (erro != null && erro instanceof ErroCompilacao) {
          if (erro.categoria == CategoriaErro.identationError) {
            freqIdentationError.contagem += 1;
          } else if (erro.categoria == CategoriaErro.nameError) {
            freqNameError.contagem += 1;
          } else if (erro.categoria == CategoriaErro.syntaxError) {
            freqSyntaxError.contagem += 1;
          } else if (erro.categoria == CategoriaErro.typeError) {
            freqTypeError.contagem += 1;
          }
        }
      });
    }

    return frequencia;
  }

  static identificarPrincipalErro(erros: FrequenciaErro[]): FrequenciaErro {
    if (Array.isArray(erros)) {
      let erroPrincipal = null;

      erros.forEach((erro: FrequenciaErro) => {
        if (erroPrincipal == null) {
          erroPrincipal = erro;
        } else {
          if (erroPrincipal.contagem < erro.contagem) {
            erroPrincipal = erro;
          }
        }
      });

      return erroPrincipal;
    } else {
      throw new Error('Não é possível calcular a frequência de erros para um array vazio.');
    }
  }

  static calcularFrequenciaPorMes(erros) {
    const resultados = [];
    erros.forEach((erro) => {
      if (erro != null && erro instanceof ErroCompilacao) {
        const data = erro.data.toDate();
        const mes = data.getMonth();

        if (resultados[mes] == undefined) {
          resultados[mes] = [];
        }

        if (resultados[mes][erro.categoria] == undefined) {
          resultados[mes][erro.categoria] = new FrequenciaErro(erro.categoria);
        }

        if (resultados[mes][erro.categoria] instanceof FrequenciaErro) {
          resultados[mes][erro.categoria].contagem += 1;
        }
      }
    });

    return resultados;
  }
}
