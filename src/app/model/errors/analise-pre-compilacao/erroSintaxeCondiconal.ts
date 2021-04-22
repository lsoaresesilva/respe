import ErroSintaxe from './erroSintaxe';
import Erro from '../erro';
import { TipoErro } from './enum/tipoErro';
import ErroSintaxeVariavel from './erroSintaxeVariavel';
import ErroPreCompilacao from './erroPrecompilacao';
import { ErrosCondicoes } from './enum/errosCondicoes';
import { TiposErrosCondicoes } from './enum/tiposErrosCondicoes';

import * as jsonexport from "jsonexport/dist"

/**
 * A fazer:
 * 1. Códigos fora da identação entre o if e o else (prioridade média)
 * 2. elif True: ou if is_negativo: # comparações booleanas
 */
export default class ErroSintaxeCondicional extends ErroSintaxe {
  static erros(algoritmo): ErroPreCompilacao[] {
    let erros: ErroPreCompilacao[] = [];

    for (let i = 0; i < algoritmo.length; i++) {
      let numeroLinha = i + 1;
      let linhaCodigo = algoritmo[i];

      // Se tiver mais de um operador matemático, então não deve fazer essa verificação

      if (ErroSintaxeCondicional.isIfElseOuElif(linhaCodigo)) {
        if (ErroSintaxe.hasComentario(linhaCodigo)) {
          if (ErroSintaxe.comentarioInicioLinha(linhaCodigo)) {
            continue;
          } else {
            linhaCodigo = ErroSintaxe.splitComentario(linhaCodigo);
          }

          if (linhaCodigo == null) {
            let x = 2;
          }
        }

        erros = erros.concat(ErroSintaxeCondicional._errosLinha(numeroLinha, linhaCodigo));
      }
    }

    return erros;
  }

  static _errosLinha(numeroLinha, linhaCodigo){
    let erros = [];

    if (ErroSintaxeCondicional.isElse(linhaCodigo)) {
      if (ErroSintaxeCondicional.hasComparacaoNoElse(linhaCodigo)) {
        erros.push(
          new ErroPreCompilacao(
            numeroLinha,
            ErrosCondicoes.comparacaoElse,
            TiposErrosCondicoes.comparacaoElse
          )
        );
      }
    }

    if (ErroSintaxeCondicional.isIfOuElif(linhaCodigo)) {
      if (ErroSintaxe.semComparacao(linhaCodigo)) {
        erros.push(
          new ErroPreCompilacao(
            numeroLinha,
            ErrosCondicoes.semComparacao,
            TiposErrosCondicoes.semComparacao
          )
        );
      }

      if (ErroSintaxe.andOrMaiusculo(linhaCodigo)) {
        erros.push(
          new ErroPreCompilacao(
            numeroLinha,
            ErrosCondicoes.andOrMaiusculo,
            TiposErrosCondicoes.andOrMaiusculo
          )
        );
      }

      if (ErroSintaxe.apenasUmaComparacao(linhaCodigo)) {
        erros.push(
          new ErroPreCompilacao(
            numeroLinha,
            ErrosCondicoes.apenasUmParComparacao,
            TiposErrosCondicoes.apenasUmParComparacao
          )
        );
      }

      if (ErroSintaxe.comparacaoApenasUmaIgualdade(linhaCodigo)) {
        erros.push(
          new ErroPreCompilacao(
            numeroLinha,
            ErrosCondicoes.comparacaoApenasUmaIgualdade,
            TiposErrosCondicoes.comparacaoApenasUmaIgualdade
          )
        );
      }
    }

    if (ErroSintaxe.ausenciaDeDoisPontos(linhaCodigo)) {
      erros.push(
        new ErroPreCompilacao(
          numeroLinha,
          ErrosCondicoes.ausenciaDoisPontos,
          TiposErrosCondicoes.faltaDoisPontosCondicao
        )
      );
    }

    return erros;
  }

  // TODO: verificar se a comparação envolve uma variável que não foi declarada

  

  static isIfOuElif(linha) {
    return (linha.match(/if\s|elif\:|if\:|elif\s/g) || []).length == 0 ? false : true;
  }

  static isIfElseOuElif(linha) {
    let ifOuElif = ErroSintaxeCondicional.isIfOuElif(linha);
    let isElse = (linha.match(/else/g) || []).length == 0 ? false : true;
    if (ifOuElif || isElse) {
      return true;
    }

    return false;
  }

  
  

  

  static isElse(linha) {
    return (linha.match(/else/g) || []).length == 0 ? false : true;
  }

  static hasComparacaoNoElse(linha) {
    let resultado = linha.match(/={2}|>|>=|<|<=|!=|\sin\s|\=/);
    if (resultado != undefined && resultado.length > 0) {
      return true;
    }

    return false;
  }



  

  

  
}
