import ErroSintaxe from './erroSintaxe';
import Erro from './erro';
import { TipoErro } from '../tipoErro';
import Estudante from '../estudante';
import Submissao from '../submissao';
import ErroSintaxeVariavel from './erroSintaxeVariavel';

export default class ErroSintaxeFuncao extends ErroSintaxe {

    static erros(submissao: Submissao): Erro[] {
        let erros: Erro[] = [];
        let linhasCodigo = submissao.linhasAlgoritmo();

        for (let i = 0; i < linhasCodigo.length; i++) {
            let numeroLinha = i + 1;
            let linhaCodigo = linhasCodigo[i];


            if (ErroSintaxeFuncao.faltaParentese(linhaCodigo)) {
                erros.push(new Erro(null, numeroLinha, "Você esqueceu de um parêntesis na declaração/uso de uma função. Erro na linha: " + numeroLinha, TipoErro.faltaParentesis, submissao));
            }

            if (ErroSintaxeFuncao.faltaVirgula(linhaCodigo)) {
                erros.push(new Erro(null, numeroLinha, "Você esqueceu de uma , (vírgula) para separar os parâmetros de uma função. Erro na linha: " + numeroLinha, TipoErro.faltaVirgulaParametros, submissao));
            }

            if (ErroSintaxeFuncao.ausenciaDeDoisPontos(linhaCodigo)) {
                erros.push(new Erro(null, numeroLinha, "Ao criar uma função é preciso incluir : (dois pontos) ao término da instrução. Por exemplo: def nome-funcao(): . Erro na linha: " + numeroLinha, TipoErro.faltaDoisPontosFuncao, submissao));
            }


        }

        return erros;
    }

    static ausenciaDeDoisPontos(linha) {
        if (ErroSintaxe.isLinhaProgramacaoValida(linha)) {
            if (ErroSintaxe.isFunction(linha)) {
                return ErroSintaxe.faltaDoisPontos(linha);
            }
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