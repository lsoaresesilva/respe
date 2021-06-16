import ErroSintaxe from './erroSintaxe';
import Erro from '../erro';
import ErroSintaxeCondicional from './erroSintaxeCondiconal';
import ErroSintaxeFuncao from './erroSintaxeFuncao';
import ErroPreCompilacao from './erroPrecompilacao';
import { TipoErro } from './enum/tipoErro';
import { ErrosVariaveis } from './enum/errosVariaveis';
import { TiposErrosVariaveis } from './enum/tiposErrosVariaveis';

/**
 * Incluir:
 * 1. Verificação de booleano com true e false com a primeira letra minúscula
 * 2. Detectar True ou False entre aspas
 * 2. Verificação de variáveis declaradas fora de escopo.
 */
export default class ErroSintaxeVariavel extends ErroSintaxe {
  static erros(algoritmo): ErroPreCompilacao[] {
    let erros: ErroPreCompilacao[] = [];

    for (let i = 0; i < algoritmo.length; i++) {
      let numeroLinha = i + 1;
      let linhaCodigo = algoritmo[i];

      if (ErroSintaxeVariavel.isString(linhaCodigo)) {
        if (ErroSintaxeVariavel.faltaAspas(linhaCodigo)) {
          erros.push(
            new ErroPreCompilacao(
              numeroLinha,
              ErrosVariaveis.stringSemAspas,
              TiposErrosVariaveis.stringSemAspas
            )
          );
        }
      }

      if (ErroSintaxeVariavel.numeroDecimalComVirgula(linhaCodigo)) {
        erros.push(
          new ErroPreCompilacao(
            numeroLinha,
            ErrosVariaveis.numeroDecimalComVirgula,
            TiposErrosVariaveis.numeroDecimalComVirgula
          )
        );
      }

      if (ErroSintaxeVariavel.variavelDeclaradaComDoisIguais(linhaCodigo)) {
        erros.push(
          new ErroPreCompilacao(
            numeroLinha,
            ErrosVariaveis.declaracaoVariavelComDoisIguais,
            TiposErrosVariaveis.declaracaoVariavelComDoisIguais
          )
        );
      }

      if (ErroSintaxeVariavel.nomeVariavelComEspaco(linhaCodigo)) {
        erros.push(
          new ErroPreCompilacao(
            numeroLinha,
            ErrosVariaveis.espacoNomeVariavel,
            TiposErrosVariaveis.espacoNoNomeVariavel
          )
        );
      }
    }

    let variaveisNaoDeclaradas = ErroSintaxeVariavel.variaveisNaoDeclaradas(algoritmo);
    if (variaveisNaoDeclaradas.length > 0) {
      variaveisNaoDeclaradas.forEach(v=>{
        erros.push(
          new ErroPreCompilacao(
            v.linha,
            ErrosVariaveis.variavelNAoDeclarada,
            TiposErrosVariaveis.variavelNaoDeclarada
          )
        );
      })
     
    }
    /* variaveisNaoDeclaradas.forEach(variavel => {
            
        }) */

    return erros;
  }

  static numeroDecimalComVirgula(linha) {
    if (this.isLinhaProgramacaoValida(linha)) {
      // ([a-zA-Z])*.*=[\s.]*[^\"\'a-zA-Z]([0-9,])*
      let regex = /([a-zA-Z0-9])*\s*=\s*([0-9]+,[0-9]*)*/g;
      let resultado = regex.exec(linha);
      if (resultado != undefined && resultado.length == 3 && resultado[2] != undefined) {
        return true;
      }

      return false;
    }

    return false;
  }

  static variavelDeclaradaComDoisIguais(linha) {
    if (this.isLinhaProgramacaoValida(linha)) {
      //(?<!\bif)==
      let regex = /^((?!if).)*={2}.*$/g;
      let resultado = regex.exec(linha);
      if (resultado != null && resultado.length > 0) {
        return true;
      }

      return false;
    }

    return false;
  }

  // TODO: não está funcionando
  static nomeVariavelComEspaco(linha) {
    // pegar variáveis da linha
    // (.*)\=|\s\=

    return false; // TODO: regex não suportado!
    /*if (this.isLinhaProgramacaoValida(linha)) {
            // (?<=[a-zA-Z]*\s)(\w)*\s*=
            let regex =  /\n/ // /(?<=\w+\s+\w+\s*)=/g
            let resultado = regex.exec(linha)
            if (resultado != null && resultado.length > 0) {
                return true;
            }

            return false;
        }

        return false;*/
  }

  /**
   * Verifica se uma variável já está incluída em um array de variáveis que foram declaradas.
   * @param variavel
   * @param variaveis
   */
  static isVariavelIncluida(variavel, variaveis) {
    if (variavel == null) {
      return true;
    }

    if (Array.isArray(variaveis)) {
      for (let i = 0; i < variaveis.length; i++) {
        if (variavel == variaveis[i].nome) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Adiciona uma variável à uma lista específica de variáveis.
   * @param variavel
   * @param linha
   * @param variaveis
   */
  static incluirVariavel(variavel: string, linha, variaveis) {
    // Limpar a variável
    variavel = variavel.trim();
    variaveis.push({ nome: variavel, linha: linha });
  }

  static isVariavelNumerica(variavel) {
    let regex = /[0-9]+/g;
    if (regex.exec(variavel) == null) {
      // não é um número
      return false;
    }

    return true;
  }

  /**
   * Uma variável é considerada válida quando ela não é uma string, número ou sinal matemático.
   * @param variavel
   */
  static isVariavelValida(variavel) {
    if (
      variavel != undefined &&
      variavel.search(/\+|\-|\*|\//) == -1 &&
      !this.isString(variavel) &&
      !this.isVariavelNumerica(variavel) &&
      variavel.search(/\s/) == -1 &&
      variavel.search(/""/) == -1
    )
      return true;

    return false;
  }

  static isString(variavel) {
    let resultado = variavel.match(/\"|\'/);
    if (resultado != undefined && resultado.length > 0) {
      return true;
    }

    return false;
  }

  static removerEspacosVariavel(variavel) {
    // verificar se não é uma string
    if (!this.isString(variavel)) {
      variavel = variavel.replace(' ', '');
    }

    return variavel;
  }

  static isOperacaoMatematica(linha) {
    let resultado = linha.match(/={2}|>|>=|<|<=|!=|%|\=|\+|\-|\/|\*/);
    if (resultado != undefined && resultado.length > 0) return true;
    return false;
  }

  static getVariaveisCondicao(linha) {
    let variaveis = [];

    if (ErroSintaxeCondicional._errosLinha(null, linha).length == 0) {
      if (!ErroSintaxe.hasAndOr(linha)) {

        linha = linha.replace(/(if|elif)\s/, '');
        if(!ErroSintaxeCondicional.hasOperadorIn(linha)){
          linha = linha.replace(/ /g, '');
          linha = linha.replace(/\:|\s/g, '').replace(/ /g, '');
  
          if (ErroSintaxeVariavel.isOperacaoMatematica(linha)) {
            let variaveisSeparadas = ErroSintaxeVariavel.getVariaveisMatematicas(linha);
            variaveisSeparadas.forEach((variavel) => {
              if (
                ErroSintaxeVariavel.isVariavelValida(variavel) &&
                !ErroSintaxeVariavel.isVariavelIncluida(variavel, variaveis)
              )
                variaveis.push(variavel);
            });
          } else {
            if (ErroSintaxeVariavel.isVariavelValida(linha)) variaveis.push(linha);
          }
        }else{
          linha = linha.split(/\sin\s/);
          if(Array.isArray(linha) && linha.length > 0){
            if (
              ErroSintaxeVariavel.isVariavelValida(linha[0]) &&
              !ErroSintaxeVariavel.isVariavelIncluida(linha[0], variaveis)
            )
              variaveis.push(linha[0]);
          }
        }
        
        
        
        }else{
          linha = linha.split(/\sand\s|\sor\s/g);
          if(linha.length > 0){
            linha.forEach(parteCondicao => {
              parteCondicao = parteCondicao.replace(/(if|elif)\s/, '');
              parteCondicao = parteCondicao.replace(/ /g, '');
              parteCondicao = parteCondicao.replace(/\:|\s/g, '').replace(/ /g, '');
              if (ErroSintaxeVariavel.isOperacaoMatematica(parteCondicao)) {
                let variaveisSeparadas = ErroSintaxeVariavel.getVariaveisMatematicas(parteCondicao);
                variaveisSeparadas.forEach((variavel) => {
                  if (
                    ErroSintaxeVariavel.isVariavelValida(variavel) &&
                    !ErroSintaxeVariavel.isVariavelIncluida(variavel, variaveis)
                  )
                    variaveis.push(variavel);
                });
              } else {
                if (ErroSintaxeVariavel.isVariavelValida(parteCondicao)) variaveis.push(parteCondicao);
              }
              
            });
            
          }
        }
      
    }

    return variaveis;
  }

  /**
   * Retorna uma lista de variáveis a partir de uma operação matemática.
   * Por exemplo:
   * x+y
   * Retornará as variáveis x e y.
   * TODO: Incrementos realizados com += -= *= ou /= não são identificados como variáveis que estão sendo utilizadas
   * @param linha
   */
  static getVariaveisMatematicas(linha) {
    let variaveis = [];
    
      let resultado = linha.match(/([\w'"]+)\s*(?:\(|\+|\-|\/|\*|>|%|>=|<|<=|!=|==)+\s*([\w'"]+)/);
      if (resultado != null && resultado.length > 0) {
        let pos = 1;
        if (resultado.length == 3) pos = 2;
        resultado[1] = resultado[1].replace(/(if|elif)\s/, '');
        resultado[1] = resultado[1].replace(/ /g, '');
        if (resultado[pos] != null) {
          resultado[pos] = resultado[pos].replace(/\:|\s/g, '').replace(/ /g, '');
        } 

        for (let i = 1; i < resultado.length; i++) {
          if (!this.isVariavelNumerica(resultado[i])) {
            // TODO: se for uma variável matemática, recursivar aqui
            if (this.isOperacaoMatematica(resultado[i])) {
              let variaveisIdentificadas = this.getVariaveisMatematicas(resultado[i]);
              variaveisIdentificadas.forEach((variavel) => {
                if (!variaveis.includes(variavel)) variaveis.push(variavel);
              });
            } else {
              resultado[i] = this.removerEspacosVariavel(resultado[i]);
              if (!variaveis.includes(resultado[i])) variaveis.push(resultado[i]);
            }
          }
        }
      }
    

    return variaveis;
  }

  /**
   * Retorna uma lista de variáveis em uma linha que contenha uma declaração/atribuicao de varíavel.
   * Por exemplo:
   * x = y+2
   * Retornará a variável y
   * @param linha
   */
  // TODO: Não está pegando variável da divisão: (notaUm+notaDois)/x <- não está pegando x
  static getVariaveisOperacaoMatematica(linha) {
    let variaveis = [];
    let resultado = linha.match(/=[\s]*.*(\(|\+|\-|\/|\*)+/); // Verifica se é uma linha com operação matemática
    if (resultado != undefined && resultado.length > 0) {
      let atribuicao = linha.match(/=[\s]*(.*)/);
      if (atribuicao != undefined && atribuicao.length == 2) {
        // SE tiver () ou os sinais de operação então deve removê-los para restar apenas as variáveis
        // deve remover os (
        atribuicao[1] = atribuicao[1].replace(/\(/g, '');
        atribuicao[1] = atribuicao[1].replace(/\)/g, '');
        atribuicao[1] = atribuicao[1].replace(/\+/, '_____');
        atribuicao[1] = atribuicao[1].replace(/\-/, '_____');
        atribuicao[1] = atribuicao[1].replace(/\*/, '_____');
        atribuicao[1] = atribuicao[1].replace(/\//, '_____');
        atribuicao[1] = atribuicao[1].split('_____');

        atribuicao[1].forEach((variavel) => {
          if (!this.isVariavelNumerica(variavel)) {
            variavel = this.removerEspacosVariavel(variavel);
            if (!variaveis.includes(variavel)) variaveis.push(variavel);
          }
        });
      }
    }

    return variaveis;
  }

  static isInput(linha) {
    return linha.search(/input\(/) == -1 ? false : true;
  }

  static getVariaveisAtribuicaoSimples(linha) {
    let variaveis = [];
    let resultado = linha.match(/=[\s]*(?![0-9\"\',\[\()])[a-zA-z0-9(]*/);

    if (resultado != undefined && resultado.length > 0 && resultado[0].replace(/=\s*/, '') != '') {
      resultado[0] = resultado[0].replace(/=\s*/, '');
      //resultado[0].forEach(variavel => {
      if (!this.isVariavelNumerica(resultado[0])) {
        let variavel = this.removerEspacosVariavel(resultado[0]);
        if (!variaveis.includes(variavel)) variaveis.push(variavel);
      }
      //})
    }

    return variaveis;
  }

  static faltaAspas(linhaCodigo) {
    return (linhaCodigo.match(/"\s*[a-zA-Z\-\'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏàáâãäåæçèéêëìíîïÐÑÒÓÔÕÖØÙÚÛÜÝÞßðñòóôõöøùúûüýþÿ]+\s*"|'\s*[a-zA-Z\-\'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏàáâãäåæçèéêëìíîïÐÑÒÓÔÕÖØÙÚÛÜÝÞßðñòóôõöøùúûüýþÿ]+\s*'|\("\s*[a-zA-Z\-\'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏàáâãäåæçèéêëìíîïÐÑÒÓÔÕÖØÙÚÛÜÝÞßðñòóôõöøùúûüýþÿ]+\s*"\)|\('\s*[a-zA-Z\-\'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏàáâãäåæçèéêëìíîïÐÑÒÓÔÕÖØÙÚÛÜÝÞßðñòóôõöøùúûüýþÿ]+\s*'\)/g) || []).length == 0
      ? true
      : false;
  }

  static identificarVariaveisUtilizadas(algoritmo) {

    let variaveisUtilizadas = [];

    for (let i = 0; i < algoritmo.length; i++) {
      if (!this.isInput(algoritmo[i])) {
        /*if (this.isInput(linhasCodigo[i])) {
                    let variavel = this.getVariavel(linhasCodigo[i])
                    if (!this.isVariavelIncluida(variavel, variaveisUtilizadas)) {
                        this.incluirVariavel(variavel, i + 1, variaveisUtilizadas);
                    }
                }// Verifica as variáveis usadas em uma condição   (apenas para if e elif)
                else*/

        // Se for uma linha que tem comentário, então separa a parte com e sem comentário
        if (
          ErroSintaxe.hasComentario(algoritmo[i]) &&
          !ErroSintaxe.comentarioInicioLinha(algoritmo[i])
        ) {
          algoritmo[i] = ErroSintaxe.splitComentario(algoritmo[i]);
        }

        if (!ErroSintaxe.comentarioInicioLinha(algoritmo[i])) {
          if (ErroSintaxeCondicional.isIfOuElif(algoritmo[i])) {
            let variaveis = this.getVariaveisCondicao(algoritmo[i]);
            variaveis.forEach((variavel) => {
              if (!this.isVariavelIncluida(variavel, variaveisUtilizadas)) {
                this.incluirVariavel(variavel, i + 1, variaveisUtilizadas);
              }
            });
          } else if (ErroSintaxe.isChamadaFunction(algoritmo[i])) {
            // Verifica as variáveis usadas em uma função
            let variaveis = ErroSintaxeFuncao.getParametros(algoritmo[i]);
            variaveis.forEach((variavel) => {
              if (!this.isVariavelIncluida(variavel, variaveisUtilizadas)) {
                this.incluirVariavel(variavel, i + 1, variaveisUtilizadas);
              }
            });
            let funcaoUtilizada = ErroSintaxeVariavel.getFuncaoUtilizada(algoritmo[i]);
            if (!this.isVariavelIncluida(funcaoUtilizada, variaveisUtilizadas)) {
              this.incluirVariavel(funcaoUtilizada, i + 1, variaveisUtilizadas);
            }
          } else {
            // SE tiver sinais de operação +, -, * e / deve dividir a setença
            let variaveis = this.getVariaveisOperacaoMatematica(algoritmo[i]);
            variaveis.forEach((variavel) => {
              if (!this.isVariavelIncluida(variavel, variaveisUtilizadas)) {
                this.incluirVariavel(variavel, i + 1, variaveisUtilizadas);
              }
            });

            variaveis = this.getVariaveisAtribuicaoSimples(algoritmo[i]);
            variaveis.forEach((variavel) => {
              if (!this.isVariavelIncluida(variavel, variaveisUtilizadas)) {
                this.incluirVariavel(variavel, i + 1, variaveisUtilizadas);
              }
            });
          }
        }
      }
    }

    return variaveisUtilizadas;
  }

  private static getVariavel(linha) {
    // REGEX: ([a-zA-Z])*.*= // TODO: está pegando apenas variáveis que não tem números
    let resultado = linha.match(/([a-zA-Z])*.*=/);

    if (resultado != undefined && resultado.length > 0) {
      let nomeVariavel = resultado[0].replace(/\s*(|\+|\-|\*|\\)=/, '').trim();
      return nomeVariavel;
    }

    return null;
  }

  private static getFuncaoUtilizada(linha) {
    // Não é uma declaração de função
    if (!ErroSintaxeFuncao.isDeclaracaoFuncao(linha)) {
      // Tem = ?
      let hasIgualdade = linha.match(/\=/);
      let regex;
      if (hasIgualdade != undefined && hasIgualdade.length > 0) {
        // Se tiver, pegar o que tiver depois da igualdade
        regex = /=.*([A-Za-z])\w+\(/;
      } else {
        regex = /([A-Za-z])\w+\(/;
      }

      // Se não tiver, pegar o que estiver no começo da linha
      if (regex != null) {
        let resultado = linha.match(regex);
        if (resultado != undefined && resultado.length > 0) {
          let nomeVariavel = resultado[0].replace('(', ''); // Está capturando com (, então deve remover isso.
          if (hasIgualdade != null) {
            nomeVariavel = nomeVariavel.replace('=', '').trim();
          }

          if (!ErroSintaxeFuncao.funcoesReservadas.includes(nomeVariavel)) return nomeVariavel;
        }
      }
    }

    return null;
  }

  private static identificarVariaveisDeclaradas(algoritmo) {

    let variaveisDeclaradas = [];

    for (let i = 0; i < algoritmo.length; i++) {
      // REGEX: ([a-zA-Z])*.*= // TODO: está pegando apenas variáveis que não tem números
      /*let resultado = linhasCodigo[i].match(/([a-zA-Z])*.*=/);

            if (resultado != undefined && resultado.length > 0) {
                let nomeVariavel = resultado[0].replace(/\s*=/, "");
                // SE variável não estiver em variaveisUtilizadas ENTÃO adicione ao array variaveisUtilizadas
                if (!variaveisDeclaradas.includes(nomeVariavel)) {
                    variaveisDeclaradas.push({ nome: nomeVariavel, linha: i + 1 });
                }
            }*/

      let variavel = this.getVariavel(algoritmo[i]);
      if (variavel != null) {
        if (!this.isVariavelIncluida(variavel, variaveisDeclaradas)) {
          variaveisDeclaradas.push({ nome: variavel, linha: i + 1 });
        }
      }
    }

    return variaveisDeclaradas;
  }

  static variaveisNaoDeclaradas(algoritmo) {
    let variaveisNaoDeclaradas = [];

    let variaveisUtilizadas = this.identificarVariaveisUtilizadas(algoritmo);
    let variaveisDeclaradas = this.identificarVariaveisDeclaradas(algoritmo);

    variaveisUtilizadas.forEach((variavel) => {
      let utilizada = false;
      for (let i = 0; i < variaveisDeclaradas.length; i++) {
        if (
          variaveisDeclaradas[i].nome == variavel.nome &&
          variaveisDeclaradas[i].linha < variavel.linha
        ) {
          utilizada = true;
          break;
        }
      }

      if (!utilizada) variaveisNaoDeclaradas.push(variavel);
    });

    return variaveisNaoDeclaradas;
  }
}
