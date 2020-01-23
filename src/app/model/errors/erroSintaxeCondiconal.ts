import ErroSintaxe from './erroSintaxe';
import Erro from './erro';
import { TipoErro } from '../tipoErro';
import Submissao from '../submissao';
import ErroSintaxeVariavel from './erroSintaxeVariavel';

export default class ErroSintaxeCondicional extends ErroSintaxe {

    static erros(submissao: Submissao): Erro[] {
        let erros: Erro[] = [];
        let linhasCodigo = submissao.linhasAlgoritmo();

        for (let i = 0; i < linhasCodigo.length; i++) {
            let numeroLinha = i + 1;
            let linhaCodigo = linhasCodigo[i];

            // Se tiver mais de um operador matemático, então não deve fazer essa verificação

            if (ErroSintaxeCondicional.apenasUmaComparacao(linhaCodigo)) {
                erros.push(new Erro(null, numeroLinha, "Em uma condição é preciso comparar um par de informações, mas você escreveu apenas um dado. Erro na linha: " + numeroLinha, TipoErro.parDadosComparacao, submissao));
            }

            if (ErroSintaxeCondicional.comparacaoCondicaoApenasUmaIgualdade(linhaCodigo)) {
                erros.push(new Erro(null, numeroLinha, "A comparação de uma condição deve ser feita com dois sinais de == (igualdade), mas você utilizou apenas um =. Erro na linha: " + numeroLinha, TipoErro.comparacaoApenasUmaIgualdade, submissao));
            }

            if (ErroSintaxeCondicional.ausenciaDeDoisPontos(linhaCodigo)) {
                erros.push(new Erro(null, numeroLinha, "Em uma condição é preciso incluir : (dois pontos) ao término da instrução. Por exemplo: if idade > 18: . Erro na linha: " + numeroLinha, TipoErro.faltaDoisPontosCondicao, submissao));
            }
        }

        return erros;
    }

    // TODO: verificar se a comparação envolve uma variável que não foi declarada

    static ausenciaDeDoisPontos(linha) {
        if (ErroSintaxe.isLinhaProgramacaoValida(linha)) {
            if (ErroSintaxe.isConditional(linha)) {
                return ErroSintaxe.faltaDoisPontos(linha);
            }
        }

        return false;
    }

    static isIfOuElif(linha) {
        return ((linha.match(/if|elif/g) || []).length == 0 ? false : true);
    }

    static isParComparacao(linha) {

        return linha.search(/\s*(?:\+|\-|\*|\\|){1} *\w* *(?:={2}|>|>=|<|<=|!=|\=)+ *(?:[a-zA-Z0-9\"\',]+) */) == -1 ? false : true;
    }

    static getVariaveisCondicao(linha) {
        let variaveis = [];

        if (!this.hasAndOr(linha)) {
            linha = linha.split(/={2}|>|>=|<|<=|!=|\=/)
            if (linha != null && linha.length > 0) {
                // Há um bug no regex que quebra a string em 3 partes quando há >= ou <= ou ==
                // O código abaixo define quando acessar a variável corretamente
                let pos = 1;
                if (linha.length == 3)
                    pos = 2;

                linha[0] = linha[0].replace(/(if|elif)\s/, "");
                linha[0] = linha[0].replace(/ /g, "");
                linha[pos] = linha[pos].replace(/\:|\s/, "").replace(/ /g, "");
                if(ErroSintaxeVariavel.isOperacaoMatematica(linha[0])){
                    let variaveisSeparadas = ErroSintaxeVariavel.getVariaveisMatematicas(linha[0]);
                    variaveisSeparadas.forEach(variavel=>{
                        if(ErroSintaxeVariavel.isVariavelValida(variavel) && !ErroSintaxeVariavel.isVariavelIncluida(variavel, variaveis))
                            variaveis.push(variavel)
                    })
                }else{
                    if(ErroSintaxeVariavel.isVariavelValida(linha[0]))
                        variaveis.push(linha[0])
                }

                if(ErroSintaxeVariavel.isOperacaoMatematica(linha[1])){
                    let variaveisSeparadas = ErroSintaxeVariavel.getVariaveisMatematicas(linha[1]);
                    variaveisSeparadas.forEach(variavel=>{
                        if(ErroSintaxeVariavel.isVariavelValida(variavel) && !ErroSintaxeVariavel.isVariavelIncluida(variavel, variaveis))
                            variaveis.push(variavel)
                    })
                }else{
                    if(ErroSintaxeVariavel.isVariavelValida(linha[1]) && !ErroSintaxeVariavel.isVariavelIncluida(linha[1], variaveis))
                        variaveis.push(linha[1])
                }

           
            }
        }



        return variaveis;
    }

    static hasAndOr(linha) {
        return linha.search(/(\sand\s|\sor\s)/) == -1?false:true;
    }

    static apenasUmaComparacao(linha) {
        if (ErroSintaxe.isLinhaProgramacaoValida(linha)) {
            if (linha.match(/if|elif/g) || [].length > 0) {


                // quebrar a string em lado esquerdo e lado direito
                // Se em um dos lados estiver vazio, então resultar em erro


                // Verificar se é um if simples, sem AND e/ou OR
                if (!this.hasAndOr(linha)) {
                    linha = linha.split(/={2}|>|>=|<|<=|!=|\=/)
                    if (linha != null && linha.length > 0) {
                        // Há um bug no regex que quebra a string em 3 partes quando há >= ou <= ou ==
                        // O código abaixo define quando acessar a variável corretamente
                        let pos = 1;
                        if (linha.length == 3)
                            pos = 2;

                        linha[0] = linha[0].replace(/if|elif|\s/, "").replace(/ /g, "");
                        linha[pos] = linha[pos].replace(/\:|\s/, "").replace(/ /g, "");
                        if (linha[0].search(/^$|^\s+/) == 0 || linha[pos].search(/^$|^\s+/) == 0)
                            return true;
                    }

                    return false;
                    // Verifica se o IF/ELIF está correto
                    // TODO: substituir por isParComparacao
                    // TODO: if(a+b > c): <==== essa comparação está caindo nessa verificação
                    //    return linha.search(/(?:\bif|\belif)+(?: |\()(?:\w)+\s*(?:\+|\-|\*|\\|){1} *\w* *(?:={2}|>|>=|<|<=|!=|\=)+ *(?:[a-zA-Z0-9\"\',]+) */) == 0?false:true
                } else {
                    // TODO: fazer isso para quando tiver operação com and e/ou OR
                    // quebrar cada parte com and ou or
                    let comparacoes = linha.split(/and|or/)
                    let resultados = [];
                    comparacoes.forEach(comparacao => {
                        resultados.push(this.isParComparacao(comparacao));
                    });

                    return resultados.includes(false);
                }
            }


        }

        return false;
    }

    static comparacaoCondicaoApenasUmaIgualdade(linha) {
        if (this.isLinhaProgramacaoValida(linha)) {
            // verificar se é uma condição
            if (this.isConditional(linha)) {
                let regex = /[a-zA-Z\s]=[a-zA-Z\s]/g
                let resultado = regex.exec(linha)
                if (resultado != null && resultado.length > 0) {
                    return true;
                }

                return false;
            }

            return false;
        }

        return false;


    }
}