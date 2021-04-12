import Submissao from '../../submissao';
import { ErrosRepeticoes } from './enum/errosRepeticoes';
import { TiposErrosRepeticoes } from './enum/tiposErrosRepeticoes';
import ErroPreCompilacao from './erroPrecompilacao';
import ErroSintaxe from './erroSintaxe';

/**
 * Pendentes:
 * 1. while numero <> 0
 * 2. for numero1 and numero2 in range(numero1,numero2):
 * 3. while x=0
 */
export default class ErroSintaxeRepeticao extends ErroSintaxe {
  static erros(submissao: Submissao): ErroPreCompilacao[] {
    let erros: ErroPreCompilacao[] = [];
    let linhasCodigo = submissao.linhasAlgoritmo();

    for (let i = 0; i < linhasCodigo.length; i++) {
      let numeroLinha = i + 1;
      let linhaCodigo = linhasCodigo[i];

      if (ErroSintaxeRepeticao.sintaxeWhileInvalida(linhaCodigo)) {
        erros.push(
          new ErroPreCompilacao(
            numeroLinha,
            ErrosRepeticoes.sintaxeWhileInvalida,
            TiposErrosRepeticoes.sintaxeWhileInvalida
          )
        );
      }

      if (ErroSintaxeRepeticao.isRepeticao(linhaCodigo)) {
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

        if(ErroSintaxe.faltaParentese(linhaCodigo)){
          erros.push(
            new ErroPreCompilacao(
              numeroLinha,
              ErrosRepeticoes.faltaParentesis,
              TiposErrosRepeticoes.faltaParentesis
            )
          );
        }

        if (ErroSintaxe.ausenciaDeDoisPontos(linhaCodigo)) {
          erros.push(
            new ErroPreCompilacao(
              numeroLinha,
              ErrosRepeticoes.faltaDoisPontos,
              TiposErrosRepeticoes.faltaDoisPontos
            )
          );
        }

        

        if (ErroSintaxeRepeticao.isWhile(linhaCodigo)) {
          if (ErroSintaxe.apenasUmaComparacao(linhaCodigo)) {
            erros.push(
              new ErroPreCompilacao(
                numeroLinha,
                ErrosRepeticoes.apenasUmParComparacao,
                TiposErrosRepeticoes.apenasUmParComparacao
              )
            );
          }

          if (ErroSintaxe.semComparacao(linhaCodigo)) {
            erros.push(
              new ErroPreCompilacao(
                numeroLinha,
                ErrosRepeticoes.semComparacao,
                TiposErrosRepeticoes.semComparacao
              )
            );
          }

          if (ErroSintaxe.andOrMaiusculo(linhaCodigo)) {
            erros.push(
              new ErroPreCompilacao(
                numeroLinha,
                ErrosRepeticoes.andOrMaiusculo,
                TiposErrosRepeticoes.andOrMaiusculo
              )
            );
          }


          if (ErroSintaxe.comparacaoApenasUmaIgualdade(linhaCodigo)) {
            erros.push(
              new ErroPreCompilacao(
                numeroLinha,
                ErrosRepeticoes.comparacaoApenasUmaIgualdade,
                TiposErrosRepeticoes.comparacaoApenasUmaIgualdade
              )
            );
          }
        }

        if(ErroSintaxeRepeticao.isFor(linhaCodigo)){
          if (!ErroSintaxe.hasOperadorIn(linhaCodigo)) {
            erros.push(
              new ErroPreCompilacao(
                numeroLinha,
                ErrosRepeticoes.faltaOperadorIn,
                TiposErrosRepeticoes.faltaOperadorIn
              )
            );
          }else{
            if (!ErroSintaxeRepeticao.isParDadosIn(linhaCodigo)) {
              erros.push(
                new ErroPreCompilacao(
                  numeroLinha,
                  ErrosRepeticoes.semParDadosIn,
                  TiposErrosRepeticoes.semParDadosIn
                )
              );
            }
          }
        }
      }

    }
    return erros;
  }

  static isParDadosIn(linha) {
    return linha.search(
      /\s*(?:\+|\-|\*|\\|){1} *\w* *(?:in)+ *(?:[(a-zA-Z0-9\"\',)]+) */
    ) == -1
      ? false
      : true;
  }

  static sintaxeWhileInvalida(linha) {
    return (linha.match(/while:/g) || []).length == 0 ? false : true;
  }

  static isRepeticao(linha) {
    return (linha.match(/for\s|while\s/g) || []).length == 0 ? false : true;
  }

  static isWhile(linha) {
    return (linha.match(/while\s/g) || []).length == 0 ? false : true;
  }

  static isFor(linha) {
    return (linha.match(/for\s/g) || []).length == 0 ? false : true;
  }


}
