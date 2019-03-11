import Solucao from './solucao';

export default class SolucaoParseError extends Solucao {

    formatarMensagem() {
        //throw new Error("Method not implemented.");
    }
    localizarSolucao() {
        // localizar abertura de parênteses e falta de fechamento
        /*this.codigo.linhasAlgoritmo().forEach(linha => {
            linha.
        });*/
        // localizar def sem : /def [a-z]+\([a-z,]+\):/g
        /*let erros = [];
        let linhasCodigo = this.codigo.linhasAlgoritmo();
        for (let i = 0; i < linhasCodigo.length; i++) {
            if(this.faltaParentese(linhasCodigo[i]))
                erros.push({tipo:"parênteses",linha: i + 1, trecho: linhasCodigo[i] })
        }*/

    }

    faltaParentese(linha) {

        let quantidadeParentesesAbertura = (linha.match(/\(/g) || []).length;
        let quantidadeParentesesFechamento = (linha.match(/\)/g) || []).length;

        if (quantidadeParentesesAbertura != quantidadeParentesesFechamento) {
            return true;
        }
        return false;
    }

    isFunction(linha){
        return ((linha.match(/def/g) || []).length==0?false:true);
    }

    isConditional(linha){
        return ((linha.match(/if|else|elif/g) || []).length==0?false:true);
    }

    isLoop(linha){
        return ((linha.match(/for|while/g) || []).length==0?false:true);
    }

    faltaDoisPontos(linha) {

        if( this.isFunction(linha) || this.isConditional(linha) || this.isLoop(linha)){
            return ((linha.match(/:/g) || []).length==0?true:false);
        }

        return false;
    }

    obterParametros(linha){
        return linha.match(/\(([^)]*)\)/g);
    }

    faltaVirgula(linha){
        if( this.isFunction(linha) ){
     
            // descobrir total de parâmetros
            // se tiver um espaço após dele tem de vir uma , ou )
            let parametros = this.obterParametros(linha);
            if( parametros != null && parametros.length > 0)
                return ((parametros[0].match(/[a-zA-Z-_]+ [a-zA-Z-_]/g) || []).length==0?false:true); // se tiver qualquer coisa após um texto e um espaço que seja outro texto significa que esqueceu de virgula

        }

        return false;
    }


}