import ErroSintaxe from './erroSintaxe';
import Erro from './erro';
import Submissao from '../submissao';

export default class ErroTypeError extends ErroSintaxe{

    static erros(submissao:Submissao):Erro[]{
        let erros:Erro[] = [];
        let linhasCodigo = submissao.linhasAlgoritmo();

        for (let i = 0; i < linhasCodigo.length; i++) {
            let numeroLinha = i+1;
            let linhaCodigo = linhasCodigo[i];
            

            /*if( ErroSintaxeFuncao.faltaParentese(linhaCodigo)){
                erros.push(new Erro(null, numeroLinha, "Você esqueceu de um parêntesis na declaração/uso de uma função. Erro na linha: "+numeroLinha, TipoErro.faltaParentesis, submissao));
            }

            if( ErroSintaxeFuncao.faltaVirgula(linhaCodigo)){
                erros.push(new Erro(null, numeroLinha, "Você esqueceu de uma , (vírgula) para separar os parâmetros de uma função. Erro na linha: "+numeroLinha, TipoErro.faltaVirgulaParametros, submissao));
            }

            if( ErroSintaxeFuncao.ausenciaDeDoisPontos(linhaCodigo)){
                erros.push(new Erro(null, numeroLinha, "Ao criar uma função é preciso incluir : (dois pontos) ao término da instrução. Por exemplo: def nome-funcao(): . Erro na linha: "+numeroLinha, TipoErro.faltaDoisPontosFuncao, submissao));
            }*/

            
        }

        return erros;
    }

    

}