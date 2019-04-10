import ErroSintaxe from './erroSintaxe';
import Codigo from './codigo';
import Erro from './erro';
import { TipoErro } from './tipoErro';

export default class ErroSintaxeCondicional extends ErroSintaxe{

    static erros(codigo:Codigo):Erro[]{
        let erros:Erro[] = [];
        let linhasCodigo = codigo.linhasAlgoritmo();

        for (let i = 0; i < linhasCodigo.length; i++) {
            let numeroLinha = i+1;
            let linhaCodigo = linhasCodigo[i];

            if( ErroSintaxeCondicional.apenasUmaComparacao(linhaCodigo)){
                erros.push(new Erro(numeroLinha, "Em uma condição é preciso comparar um par de informações, mas você escreveu apenas um dado. Erro na linha: "+numeroLinha, TipoErro.parDadosComparacao));
            }

            if(ErroSintaxeCondicional.comparacaoCondicaoApenasUmaIgualdade(linhaCodigo)){
                erros.push(new Erro(numeroLinha, "A comparação de uma condição deve ser feita com dois sinais de == (igualdade), mas você utilizou apenas um =. Erro na linha: "+numeroLinha, TipoErro.comparacaoApenasUmaIgualdade));
            }

            if(ErroSintaxeCondicional.ausenciaDeDoisPontos(linhaCodigo)){
                erros.push(new Erro(numeroLinha, "Em uma condição é preciso incluir : (dois pontos) ao término da instrução. Por exemplo: if idade > 18: . Erro na linha: "+numeroLinha, TipoErro.faltaDoisPontosCondicao));
            }
        }

        return erros;
    }

    // TODO: verificar se a comparação envolve uma variável que não foi declarada

    static ausenciaDeDoisPontos(linha){
        if (ErroSintaxe.isLinhaProgramacaoValida(linha)) {
            if(ErroSintaxe.isConditional(linha)){
                return ErroSintaxe.faltaDoisPontos(linha);
            }
        }

        return false;
    }

    static apenasUmaComparacao(linha){
        if (ErroSintaxe.isLinhaProgramacaoValida(linha)) {
            if(ErroSintaxe.isConditional(linha)){
                // \bif\s(?:\w*)\s*(?:={2}|>|>=|<|<=|!=)\s*([a-zA-Z0-9\"]+)\s*:
                // Verificar se é um if simples, sem AND e/ou OR
                if( linha.search(/(\sand\s|\sor\s)/) == -1){
                    let regex = /\bif\s(?:\w*)\s*(?:={2}|>|>=|<|<=|!=)\s*([a-zA-Z0-9\"\',]+)\s*/g
                    let resultado = regex.exec(linha)
                    if (resultado != null && resultado.length > 0) {
                        return false;
                    }

                    return true;
                } else{
                    // TODO: fazer isso para quando tiver operação com and e/ou OR
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