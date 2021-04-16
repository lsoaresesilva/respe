import Erro from '../erro';
import Submissao from '../../submissao';
import ErroPreCompilacao from './erroPrecompilacao';
import { TipoErro } from './enum/tipoErro';

export default abstract class ErroSintaxe {
  static erros(submissao: Submissao): ErroPreCompilacao[] {
    return [];
  }

  static isLinhaProgramacaoValida(linha) {
    if (linha != undefined && linha != null && linha != '' && typeof linha == 'string') return true;

    return false;
  }

  /**
   * Exemplo:
   * if x == :
   * @param linha
   * @returns
   */
  static apenasUmaComparacao(linha) {
    if (ErroSintaxe.isLinhaProgramacaoValida(linha)) {
      // quebrar a string em lado esquerdo e lado direito
      // Se em um dos lados estiver vazio, então resultar em erro

      // Verificar se é um if simples, sem AND e/ou OR
      if (!this.hasAndOr(linha)) {
        linha = linha.split(/={2}|>|>=|<|<=|!=|\sin\s|\=/);
        if (linha != null && linha.length > 0) {
          // Há um bug no regex que quebra a string em 3 partes quando há >= ou <= ou ==
          // O código abaixo define quando acessar a variável corretamente
          let pos = 1;
          if (linha.length == 3) pos = 2;

          if (linha[0] != null && linha[pos] != null) {
            linha[0] = linha[0].replace(/if\s|elif\s|while|\s/, '').replace(/ /g, '');
            linha[pos] = linha[pos].replace(/\:|\s/, '').replace(/ /g, '');
            if (linha[0].search(/^$|^\s+/) == 0 || linha[pos].search(/^$|^\s+/) == 0) return true;
          } else {
            return false;
          }
        }

        return false;
        // Verifica se o IF/ELIF está correto
        // TODO: substituir por isParComparacao
        // TODO: if(a+b > c): <==== essa comparação está caindo nessa verificação
        //    return linha.search(/(?:\bif|\belif)+(?: |\()(?:\w)+\s*(?:\+|\-|\*|\\|){1} *\w* *(?:={2}|>|>=|<|<=|!=|\=)+ *(?:[a-zA-Z0-9\"\',]+) */) == 0?false:true
      } else {
        // TODO: fazer isso para quando tiver operação com and e/ou OR
        // quebrar cada parte com and ou or
        let comparacoes = linha.split(/\sand\s|\sor\s/);
        let resultados = [];
        comparacoes.forEach((comparacao) => {
          resultados.push(this.isParComparacao(comparacao));
        });

        return resultados.includes(false);
      }
    }

    return false;
  }

  static semComparacao(linha) {
    if (ErroSintaxe.isLinhaProgramacaoValida(linha)) {
      if (!ErroSintaxe.hasOperadorComparacao(linha) && !ErroSintaxe.hasOperadorIn(linha)) {
        return true;
      }
    }

    return false;
  }

  static andOrMaiusculo(linha) {
    return linha.search(/(\sAND\s|\sOR\s)/) == -1 ? false : true; // TODO: incluir também a verificação de quando apenas uma letra é maiúscula.
  }

  static hasOperadorComparacao(linha) {
    let resultado = linha.match(/={2}|>|>=|<|<=|!=|\sin\s|\=/);
    if (resultado != undefined && resultado.length > 0) {
      return true;
    }

    return false;
  }

  static hasOperadorIn(linha) {
    if (linha.match(/\sin\s/g) || [].length > 0) {
      return true;
    }

    return false;
  }

  static hasAndOr(linha) {
    return linha.search(/(\sand\s|\sor\s)/) == -1 ? false : true;
  }

  static isParComparacao(linha) {
    return linha.search(
      /\s*(?:\+|\-|\*|\\|){1} *\w* *(?:={2}|>|>=|<|<=|!=|in|\=)+ *(?:[(a-zA-Z0-9\"\',)]+) */
    ) == -1
      ? false
      : true;
  }

  static hasComentario(linha) {
    let resultado = linha.match(/\#/);
    if (resultado != undefined && resultado.length > 0) {
      return true;
    }

    return false;
  }

  static splitComentario(linha) {
    let resultado = linha.match(/([A-Za-z])\w+.*\#/);

    if (resultado != undefined && resultado.length > 0) {
      let nomeVariavel = resultado[0].replace('#', '');
      return nomeVariavel;
    }

    return null;
  }

  static comentarioInicioLinha(linha) {
    let resultado = linha.match(/^\#|^\s+\#/); // Considera no início da linha ou com espaços e depois vir o comentário.
    if (resultado != undefined && resultado.length > 0) {
      return true;
    }

    return false;
  }

  static isFunction(linha) {
    return (linha.match(/def/g) || []).length == 0 ? false : true;
  }

  static isChamadaFunction(linha) {
    return (linha.match(/\w+\(.*\)/g) || []).length == 0 ? false : true;
  }

  static isConditional(linha) {
    return (linha.match(/if|else|elif/g) || []).length == 0 ? false : true;
  }

  static ausenciaDeDoisPontos(linha) {
    if (ErroSintaxe.isLinhaProgramacaoValida(linha)) {
      if (this.isLinhaProgramacaoValida(linha)) {
        linha = linha.trim();
        return (linha.match(/\:$/g) || []).length == 0 ? true : false;
      }
    }

    return false;
  }

  static faltaParentese(linha) {
    if (ErroSintaxe.isLinhaProgramacaoValida(linha)) {
      let quantidadeParentesesAbertura = (linha.match(/\(/g) || []).length;
      let quantidadeParentesesFechamento = (linha.match(/\)/g) || []).length;

      if (quantidadeParentesesAbertura != quantidadeParentesesFechamento) {
        return true;
      }
      return false;
    }

    return false;
  }

  static comparacaoApenasUmaIgualdade(linha) {
    if (this.isLinhaProgramacaoValida(linha)) {
      // verificar se é uma condição

      let regex = /["'a-zA-Z0-9]\s*=\s*["'a-zA-Z0-9]/g;
      let resultado = regex.exec(linha);
      if (resultado != null && resultado.length > 0) {
        return true;
      }
    }

    return false;
  }

  static getMainError(traceback) {
    if (
      traceback.search('if') != -1 ||
      traceback.search('elif') != -1 ||
      traceback.search('else') != -1
    ) {
      return TipoErro.condicao;
    } else if (
      (traceback.search('for') != -1 || traceback.search('while') != -1) &&
      traceback.search('while parsing') == -1
    ) {
      return TipoErro.repeticao;
    }else{
      return TipoErro.funcao;
    }
  }

  static exportar(erros: any) {
    if (Array.isArray(erros)) {
      let arrayFiltrado = [];
      erros.forEach((errosAlgoritmo) => {
        errosAlgoritmo.forEach((erro) => {
          arrayFiltrado.push(erro.tipoErro);
        });
      });

      return arrayFiltrado;
    }
  }
}
