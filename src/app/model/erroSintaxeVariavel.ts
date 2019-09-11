import ErroSintaxe from './erroSintaxe';
import Erro from './erro';
import Codigo from './codigo';
import { TipoErro } from './tipoErro';
import Estudante from './estudante';
import Submissao from './submissao';
import ErroSintaxeCondicional from './erroSintaxeCondiconal';
import ErroSintaxeFuncao from './erroSintaxeFuncao';
import { Util } from './util';

export default class ErroSintaxeVariavel extends ErroSintaxe {

    static erros(submissao: Submissao): Erro[] {
        let erros: Erro[] = [];
        let linhasCodigo = submissao.codigo.linhasAlgoritmo();

        for (let i = 0; i < linhasCodigo.length; i++) {
            let numeroLinha = i + 1;
            let linhaCodigo = linhasCodigo[i];



            if (ErroSintaxeVariavel.numeroDecimalComVirgula(linhaCodigo)) {
                erros.push(new Erro(null, numeroLinha, "Você declarou uma variável com número decimal e utilizou , (vírgula) quando deveria ter usado . (ponto). Erro na linha: " + numeroLinha, TipoErro.numeroDecimalComVirgula, submissao));
            }

            if (ErroSintaxeVariavel.variavelDeclaradaComDoisIguais(linhaCodigo)) {
                erros.push(new Erro(null, numeroLinha, "Você declarou uma variável com dois == (igualdades) quando deveria ter usado apenas um =. Erro na linha: " + numeroLinha, TipoErro.declaracaoVariavelComDoisIguais, submissao));
            }

            if (ErroSintaxeVariavel.nomeVariavelComEspaco(linhaCodigo)) {
                erros.push(new Erro(null, numeroLinha, "Você utilizou espaço no nome de uma variável e isso não é permitido. Erro na linha: " + numeroLinha, TipoErro.espacoNoNomeVariavel, submissao));
            }
        }

        let variaveisNaoDeclaradas = ErroSintaxeVariavel.variaveisNaoDeclaradas(submissao.codigo);
        variaveisNaoDeclaradas.forEach(variavel => {
            erros.push(new Erro(null, variavel.linha, "Você tentou utilizar a variável: '" + variavel.nome + "' que não foi criada. Erro na linha: " + variavel.linha, TipoErro.variavelNaoDeclarada, submissao));
        })


        return erros;
    }

    static numeroDecimalComVirgula(linha) {
        if (this.isLinhaProgramacaoValida(linha)) {
            // ([a-zA-Z])*.*=[\s.]*[^\"\'a-zA-Z]([0-9,])*
            let regex = /([a-zA-Z0-9])*\s*=\s*([0-9]+,[0-9]*)*/g
            let resultado = regex.exec(linha)
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
            let regex = /^((?!if).)*={2}.*$/g
            let resultado = regex.exec(linha)
            if (resultado != null && resultado.length > 0) {
                return true;
            }

            return false;
        }

        return false;
    }

    static getVariavel(linha) {

    }

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

        variaveis.forEach(variavelIncluida => {

            if (variavel == variavelIncluida.nome) {
                return true;
            }
        })


        return false;
    }

    /**
     * Adiciona uma variável à uma lista específica de variáveis.
     * @param variavel 
     * @param linha 
     * @param variaveis 
     */
    static incluirVariavel(variavel, linha, variaveis) {
        variaveis.push({ nome: variavel, linha: linha });
    }

    static isVariavelNumerica(variavel) {
        let regex = /[0-9]+/g;
        if (regex.exec(variavel) == null) { // não é um número 
            return false;
        }

        return true;
    }

    // Verificar o uso de variáveis em condições
    static getVariaveisCondicao(linha) {

        let variaveis = [];

        let regex = /\bif\s(\w*)\s*(?:={2}|>|>=|<|<=|!=)\s*([a-zA-Z0-9\"\',]+)\s*/g
        let consultaDeclaracaoCondicao = regex.exec(linha);
        if (consultaDeclaracaoCondicao != null && consultaDeclaracaoCondicao.length > 0) {
            for (let j = 1; j < consultaDeclaracaoCondicao.length; j++) {
                if (!this.isVariavelNumerica(consultaDeclaracaoCondicao[j])) {
                    if (!variaveis.includes(consultaDeclaracaoCondicao[j]))
                        variaveis.push(consultaDeclaracaoCondicao[j]);
                }
            }
        }

        return variaveis;
    }

    static isVariavelString(variavel) {
        let resultado = variavel.match(/\"|\'/)
        if (resultado != undefined && resultado.length > 0) {
            return true;
        }

        return false;
    }

    static removerEspacosVariavel(variavel) {
        // verificar se não é uma string
        if (!this.isVariavelString(variavel)) {
            variavel = variavel.replace(" ", "");
        }

        return variavel;
    }

    // Retorna uma lista de variáveis em uma linha que contenha uma declaração/atribuicao de varíavel
    // TODO: Não está pegando variável da divisão: (notaUm+notaDois)/x <- não está pegando x
    static getVariaveisOperacaoMatematica(linha) {
        let variaveis = [];
        let resultado = linha.match(/=[\s]*.*(\(|\+|\-|\/|\*)+/); // Verifica se é uma linha com operação matemática
        if (resultado != undefined && resultado.length > 0) {
            let atribuicao = linha.match(/=[\s]*(.*)/);
            if (atribuicao != undefined && atribuicao.length == 2) {
                // SE tiver () ou os sinais de operação então deve removê-los para restar apenas as variáveis
                // deve remover os (
                atribuicao[1] = atribuicao[1].replace(/\(/, "")
                atribuicao[1] = atribuicao[1].replace(/\)/, "")
                atribuicao[1] = atribuicao[1].replace(/\+/, "_____")
                atribuicao[1] = atribuicao[1].replace(/\-/, "_____")
                atribuicao[1] = atribuicao[1].replace(/\*/, "_____")
                atribuicao[1] = atribuicao[1].replace(/\//, "_____")
                atribuicao[1] = atribuicao[1].split("_____");

                atribuicao[1].forEach(variavel => {
                    if (!this.isVariavelNumerica(variavel)) {
                        variavel = this.removerEspacosVariavel(variavel);
                        if (!variaveis.includes(variavel))
                            variaveis.push(variavel);
                    }
                })


            }
        }

        return variaveis;
    }

    static isInput(linha){
        return linha.search(/input\(/) == -1?false:true;
    }

   

    static getVariaveisAtribuicaoSimples(linha) {
        let variaveis = [];
        let resultado = linha.match(/=[\s]*(?![0-9\"\',\[\()])[a-zA-z0-9(]*/);

        if (resultado != undefined && resultado.length > 0 && resultado[0].replace(/=\s*/, "") != "") {


            resultado[0] = resultado[0].replace(/=\s*/, "");
            //resultado[0].forEach(variavel => {
                if (!this.isVariavelNumerica(resultado[0])) {
                    
                    let variavel = this.removerEspacosVariavel(resultado[0]);
                    if (!variaveis.includes(variavel))
                        variaveis.push(variavel);
                }
            //})



        }

        return variaveis;
    }


    static identificarVariaveisUtilizadas(codigo) {

        let linhasCodigo = codigo.linhasAlgoritmo();

        let variaveisUtilizadas = [];

        for (let i = 0; i < linhasCodigo.length; i++) {
            // =[\s.]*[^0-9\"\'][a-zA-z0-9(]*
            let resultado = undefined

            // Verifica as variáveis usadas em uma condição
            if (ErroSintaxeCondicional.isConditional(linhasCodigo[i])) {
                let variavel = this.getVariaveisCondicao(linhasCodigo[i])
                if (!this.isVariavelIncluida(variavel, variaveisUtilizadas)) {
                    this.incluirVariavel(variavel, i + 1, variaveisUtilizadas);
                }
            }else if(ErroSintaxe.isChamadaFunction(linhasCodigo[i])) { // Verifica as variáveis usadas em uma função
                let variaveis = ErroSintaxeFuncao.getParametros(linhasCodigo[i]);
                variaveis.forEach(variavel => {
                    if (!this.isVariavelIncluida(variavel, variaveisUtilizadas)) {
                        this.incluirVariavel(variavel, i + 1, variaveisUtilizadas);
                    }
                });
            }else{
                    // SE tiver sinais de operação +, -, * e / deve dividir a setença
                let variaveis = this.getVariaveisOperacaoMatematica(linhasCodigo[i]);
                variaveis.forEach(variavel => {
                    if (!this.isVariavelIncluida(variavel, variaveisUtilizadas)) {
                        this.incluirVariavel(variavel, i + 1, variaveisUtilizadas);
                    }
                });

                variaveis = this.getVariaveisAtribuicaoSimples(linhasCodigo[i]);
                variaveis.forEach(variavel => {
                    if (!this.isVariavelIncluida(variavel, variaveisUtilizadas)) {
                        this.incluirVariavel(variavel, i + 1, variaveisUtilizadas);
                    }
                });
            }

        }
        return variaveisUtilizadas
    }

    private static identificarVariaveisDeclaradas(codigo) {

        let linhasCodigo = codigo.linhasAlgoritmo();

        let variaveisDeclaradas = [];

        for (let i = 0; i < linhasCodigo.length; i++) {
            // REGEX: ([a-zA-Z])*.*= // TODO: está pegando apenas variáveis que não tem números
            let resultado = linhasCodigo[i].match(/([a-zA-Z])*.*=/);

            if (resultado != undefined && resultado.length > 0) {
                let nomeVariavel = resultado[0].replace(/\s*=/, "");
                // SE variável não estiver em variaveisUtilizadas ENTÃO adicione ao array variaveisUtilizadas
                if (!variaveisDeclaradas.includes(nomeVariavel)) {
                    variaveisDeclaradas.push({ nome: nomeVariavel, linha: i + 1 });
                }
            }

        }

        return variaveisDeclaradas;
    }

    static variaveisNaoDeclaradas(codigo) {

        let variaveisNaoDeclaradas = [];

        let variaveisUtilizadas = this.identificarVariaveisUtilizadas(codigo);
        let variaveisDeclaradas = this.identificarVariaveisDeclaradas(codigo);

        variaveisUtilizadas.forEach(variavel => {
            let utilizada = false;
            for (let i = 0; i < variaveisDeclaradas.length; i++) {
                if (variaveisDeclaradas[i].nome == variavel.nome && variaveisDeclaradas[i].linha < variavel.linha) {
                    utilizada = true;
                    break;
                }
            }

            if (!utilizada)
                variaveisNaoDeclaradas.push(variavel);


        });

        return variaveisNaoDeclaradas;


    }

}   