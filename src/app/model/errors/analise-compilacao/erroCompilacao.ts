import { CategoriaErro, getCategoriaPorInstancia } from '../enum/categoriasErro';
import { Util } from '../../util';

import * as firebase from 'firebase';
import HistogramaErroData from './frequenciaErro';
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
          return CategoriaErro.indentationError;
        }
      }
    }

    return null;
  }

  static calcularFrequencia(erros: ErroCompilacao[]) {
    const frequencia = {};
    erros.forEach((erro) => {
      if (erro != null && erro instanceof ErroCompilacao) {
        if (frequencia[getLabelPorCategoriaNumero(erro.categoria)] == null) {
          frequencia[getLabelPorCategoriaNumero(erro.categoria)] = 1;
        } else {
          frequencia[getLabelPorCategoriaNumero(erro.categoria)] += 1;
        }
      }
    });

    return frequencia;
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
          resultados[mes][erro.categoria] = new HistogramaErroData(erro.categoria);
        }

        if (resultados[mes][erro.categoria] instanceof HistogramaErroData) {
          resultados[mes][erro.categoria].contagem += 1;
        }
      }
    });

    return resultados;
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
      case CategoriaErro.indentationError:
        return '#80FF00';
      case CategoriaErro.syntaxError:
        return '#A9F5F2';
      case CategoriaErro.typeError:
        return '#08298A';

      default:
        return getRandomColor();
    }
  }

  objectToDocument() {
    return {
      id: this.id,
      traceback: this.traceback,
      data: firebase.firestore.FieldValue.serverTimestamp(),
    };
  }

  abstract getMensagem();

  /**
     * Identifica o top 3 principais erros cometidos pelo estudante.

    static rankErros(dados){
        let ranking = {top1:{tipo:undefined, total:0}, top2:{tipo:undefined, total:0}, top3:{tipo:undefined, total:0}}
        if( dados != undefined){

            let top1 = {}
            let top2 = {}
            let top3 = {}

            for (let key in dados) {
                if(dados[key] != 0){
                    if(ranking.top1.total < dados[key]){

                        Erro.atualizarRank(ranking, "top1", {tipo:key, total:dados[key]})
                    }else if(ranking.top2.total < dados[key]){

                        Erro.atualizarRank(ranking, "top2", {tipo:key, total:dados[key]})
                    }else if(ranking.top3.total < dados[key]){
                        ranking.top3.total = dados[key];
                        ranking.top3.tipo = TipoErro[key];
                    }
                }
            }
        }

       return ranking;

    }

    */
}
