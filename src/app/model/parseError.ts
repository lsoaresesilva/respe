
export class ParseError {

    erros;
    codigo;

    constructor(codigo) {
        //super(erro);
      //  this.erros = ParseError.localizar(codigo);
    }

    hasError() {
        if (this.erros.length > 0) {
            return true;
        } else {
            return false;
        }
    }
/*

    mensagem() {

        let mensagem = "";

        this.erros.forEach(erro => {
            if (erro.tipo == "parênteses") {
                mensagem += "Você esqueceu de incluir um parêntese ( ou ). O erro encontra-se na linha: " + erro.linha;
            } else if (erro.tipo == "doisPontos") {
                mensagem += "Você esqueceu de incluir : (dois pontos) em uma função, condição ou repetição. O erro encontra-se na linha: " + erro.linha;
            } else if (erro.tipo == "virgula") {
                mensagem += "Você esqueceu de , (vírgula) nos parâmetros de uma função. O erro encontra-se na linha: " + erro.linha;
            }
            mensagem += "<br/>";
        });

        return mensagem;

    }

    static localizar(codigo: Codigo) {
 
        let erros = [];
        let linhasCodigo = codigo.linhasAlgoritmo();
        for (let i = 0; i < linhasCodigo.length; i++) {
            if (this.faltaParentese(linhasCodigo[i]))
                erros.push({ tipo: "parênteses", linha: i + 1, trecho: linhasCodigo[i] })
            if (this.faltaDoisPontos(linhasCodigo[i]))
                erros.push({ tipo: "doisPontos", linha: i + 1, trecho: linhasCodigo[i] })
            if (this.faltaVirgula(linhasCodigo[i]))
                erros.push({ tipo: "virgula", linha: i + 1, trecho: linhasCodigo[i] })
        }



        return erros;
    }

    

   

    

    static obterParametros(linha) {
        return linha.match(/\(([^)]*)\)/g);
    }

    

    static faltaVirgula(linha) {
        if (this.isLinhaProgramacaoValida(linha)) {
            if (this.isFunction(linha)) {

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

    

    // TODO: sintaxe de if. não colocar um par de comparação

    
*/
    


}