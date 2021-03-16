import { CategoriaErro, getCategoriaPorInstancia } from '../enum/categoriasErro';
import { Util } from '../../util';

import * as firebase from 'firebase';
import FrequenciaErro from './frequenciaErro';
import { getLabelPorCategoriaNumero } from '../enum/labelCategoriasErro';

export abstract class ErroCompilacao {
  protected constructor(id, public traceback) {
    if (id == null) {
      this.id = Util.uuidv4();
    } else {
      this.id = id;
    }
    this.linha = ErroCompilacao.getLinha(traceback);
    this.categoria = ErroCompilacao.getCategoria(traceback);
  }

  id;
  data;
  linha;
  categoria;

  static getLinha(traceback) {
    if (traceback != null) {
      const padrao = /line ([0-9]+)/;
      const consulta = traceback.match(padrao);

      if (consulta != null) {
        return consulta[1];
      }
    }

    return null;
  }

  static isErro(traceback) {
    if (traceback != null) {
      const padrao = /([a-zA-Z]+)Error:/;
      const consulta = traceback.match(padrao);
      if (consulta != null) {
        return true;
      }
    }
    return false;
  }

  /**
   * Retorna a categoria do erro cometido pelo estudante a partir do traceback de sua submissão.
   * @param traceback
   */
  static getCategoria(traceback) {
    if (traceback != null) {
      const padrao = /([a-zA-Z]+Erro[a-z]+):/;
      const consulta = traceback.match(padrao);

      if (consulta != null) {
        if (consulta[1] == 'NameError') {
          return CategoriaErro.nameError;
        } else if (consulta[1] == 'SyntaxError') {
          return CategoriaErro.syntaxError;
        } else if (consulta[1] == 'TypeError') {
          return CategoriaErro.typeError;
        } else if (consulta[1] == 'IndentationError') {
          return CategoriaErro.identationError;
        } else if (consulta[1] == 'TimedoutError') {
          return CategoriaErro.timedoutError;
        }
      }
    }

    return null;
  }

  static getCorErro(categoria) {
    /**
     * Referência: https://stackoverflow.com/questions/1484506/random-color-generator?page=1&tab=votes#tab-top
     */
    function getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    switch (categoria) {
      case CategoriaErro.nameError:
        return '#FFBF00';
      case CategoriaErro.identationError:
        return '#80FF00';
      case CategoriaErro.syntaxError:
        return '#A9F5F2';
      case CategoriaErro.typeError:
        return '#08298A';

      default:
        return getRandomColor();
    }
  }

  /**
   * Extrai todos os erros cometidos pelo estudante em suas submissões.
   * @param submissoes
   */
  static getAllErros(submissoes) {
    const erros = [];
    submissoes.forEach((submissao) => {
      if (submissao.erro != null && submissao.erro instanceof ErroCompilacao) {
        erros.push(submissao.erro);
      }
    });

    return erros;
  }

  objectToDocument() {
    return {
      id: this.id,
      traceback: this.traceback,
      data: firebase.firestore.FieldValue.serverTimestamp(),
    };
  }

  abstract getMensagem();
}
