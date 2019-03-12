import { NameError } from './nameErro';

export abstract class Error {
    tipo;
    texto;
    linha;

    protected constructor(erro) {
        let padrao = /([a-zA-Z]+): .* on line ([0-9]+)/;
        let consulta = erro.match(padrao);

        this.texto = erro;

        console.log(consulta);
        if (consulta != null) {
            this.tipo = consulta[1];
            this.linha = consulta[2];
        }

    }

    identificar(mensagemErro) {
        // SE tipo erro for nameError
        let padrao = /"([a-zA-Z]+): /;
        var consulta = mensagemErro.match(padrao);
        if (consulta != null && consulta[0] == "NameError") {
            // verificar qual a funcao ou variável que apresenta nome próximo
            // identificar todas as funcoes
            // identificar todas as variaveis
            // comparar o nome escrito pelo usuário com os nomes encontrados e ver qual apresenta maior similaridade
        }


    }

    static getTipoErro(erro){
        let padrao = /([a-zA-Z]+):/;
        let consulta = erro.match(padrao);

        if (consulta != null) {
            return consulta[1];
        }
    }

    abstract mensagem();

    /*obterLinhaComErro(erro) {
    //var padrao = new RegExp("([a-zA-Z]+): name \'([a-zA-Z]+)\' is not defined on line ([0-9]+)");
    let padrao = /"([a-zA-Z]+): name \'([a-zA-Z]+)\' is not defined on line ([0-9]+)/;
    var consulta = erro.toString().match(padrao);
    if (consulta != null && consulta.length > 0 && consulta[2] != undefined) {
      return consulta[2];
    }

    return null;
  }*/

    
}