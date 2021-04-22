import ErroSintaxe from './erroSintaxe';
import Erro from '../erro';
import Submissao from '../../submissao';
import ErroSintaxeVariavel from './erroSintaxeVariavel';
import ErroPreCompilacao from './erroPrecompilacao';
import { ErrosFuncoes } from './enum/errosFuncoes';
import { TipoErrosFuncoes } from './enum/tiposErrosFuncoes';

/**
 * Falta fazer: while True:
 */
export default class ErroSintaxeFuncao extends ErroSintaxe {

    static funcoesReservadas = ["print", "int", "float", "input"]

    static erros(algoritmo): ErroPreCompilacao[] {
        let erros: ErroPreCompilacao[] = [];

        for (let i = 0; i < algoritmo.length; i++) {
            let numeroLinha = i + 1;
            let linhaCodigo = algoritmo[i];


            if (ErroSintaxeFuncao.faltaParentese(linhaCodigo)) {
                erros.push(new ErroPreCompilacao(numeroLinha, ErrosFuncoes.faltaParentesis, TipoErrosFuncoes.faltaParentesis));
            }

            if (ErroSintaxeFuncao.faltaVirgula(linhaCodigo)) {
                erros.push(new ErroPreCompilacao(numeroLinha, ErrosFuncoes.faltaVirgula, TipoErrosFuncoes.faltaVirgula));
            }

            if (ErroSintaxeFuncao.faltaDoisPontos(linhaCodigo)) {
                erros.push(new ErroPreCompilacao(numeroLinha, ErrosFuncoes.ausenciaDeDoisPontos, TipoErrosFuncoes.faltaDoisPontosFuncao));
            }


        }

        return erros;
    }

    static faltaDoisPontos(linha) {
        if (ErroSintaxe.isLinhaProgramacaoValida(linha)) {
            if (ErroSintaxe.isFunction(linha)) {
                return ErroSintaxe.ausenciaDeDoisPontos(linha);
            }
        }

        return false;
    }

    static isDeclaracaoFuncao(linha){
        let resultado = linha.match(/def\s/);

        if (resultado != undefined && resultado.length > 0) {
            return true;
        }

        return false;
    }

    /**
     * Retorna uma lista de parâmetros para uma chamada de uma função contida na string linha.
     * Serão retornadas apenas variáveis, strings e números serão ignorados
     * @param linha 
     */
    static getParametros(linha) {
        // quebrar as vírgulas

        let parametros = this.obterParametros(linha);
        if (parametros.length > 0) {
            parametros = parametros[0].replace(/\(/, "")
            parametros = parametros.replace(/\)/, "")
            parametros = parametros.split(",");
            // remover espaços
            parametros = parametros.map(parametro => {
                return parametro.replace(" ", "");
            })
            
            // remover números
            parametros = parametros.filter(parametro => {
                return (parametro.search(/^[0-9]+$/) == - 1?true:false);
            })

            // remover strings
            parametros = parametros.filter(parametro => {
                return (parametro.search(/^(\"|\')/) == - 1?true:false);
            })

            // Verificar se há operações matemáticas, se houver, quebrar
            let variaveis = [];
            parametros = parametros.filter(parametro => {
                if( ErroSintaxeVariavel.isOperacaoMatematica(parametro)){
                    variaveis = variaveis.concat(ErroSintaxeVariavel.getVariaveisMatematicas(parametro));
                    return false;
                }

                return true;
            });

            parametros = parametros.concat(variaveis);
            

            return parametros;

        }
    }

    

    static obterParametros(linha) {
        return linha.match(/\(([^)]*)\)/g);
    }

    static faltaVirgula(linha) {
        if (ErroSintaxe.isLinhaProgramacaoValida(linha)) {
            if (ErroSintaxe.isFunction(linha)) {

                // descobrir total de parâmetros
                // se tiver um espaço após dele tem de vir uma , ou )
                let parametros = this.obterParametros(linha);
                if (parametros != null && parametros.length > 0)
                    return ((parametros[0].match(/[a-zA-Z-_]+ [a-zA-Z-_]/g) || []).length == 0 ? false : true); // se tiver qualquer coisa após um texto e um espaço que seja outro texto significa que esqueceu de virgula

            }

            return false;
        }

        return false;

    }

}