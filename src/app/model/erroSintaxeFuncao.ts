import ErroSintaxe from './erroSintaxe';
import Codigo from './codigo';
import Erro from './erro';
import { TipoErro } from './tipoErro';

export default class ErroSintaxeFuncao extends ErroSintaxe{

    static erros(codigo:Codigo):Erro[]{
        let erros:Erro[] = [];
        let linhasCodigo = codigo.linhasAlgoritmo();

        for (let i = 0; i < linhasCodigo.length; i++) {
            let numeroLinha = i+1;
            let linhaCodigo = linhasCodigo[i];
            

            if( ErroSintaxeFuncao.faltaParentese(linhaCodigo)){
                erros.push(new Erro(numeroLinha, "Você esqueceu de um parêntesis na declaração/uso de uma função. Erro na linha: "+numeroLinha, TipoErro.faltaParentesis));
            }

            if( ErroSintaxeFuncao.faltaVirgula(linhaCodigo)){
                erros.push(new Erro(numeroLinha, "Você esqueceu de uma , (vírgula) para separar os parâmetros de uma função. Erro na linha: "+numeroLinha, TipoErro.faltaVirgulaParametros));
            }

            if( ErroSintaxeFuncao.ausenciaDeDoisPontos(linhaCodigo)){
                erros.push(new Erro(numeroLinha, "Ao criar uma função é preciso incluir : (dois pontos) ao término da instrução. Por exemplo: def nome-funcao(): . Erro na linha: "+numeroLinha, TipoErro.faltaDoisPontosFuncao));
            }

            
        }

        return erros;
    }

    static ausenciaDeDoisPontos(linha){
        if (ErroSintaxe.isLinhaProgramacaoValida(linha)) {
            if(ErroSintaxe.isFunction(linha)){
                return ErroSintaxe.faltaDoisPontos(linha);
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