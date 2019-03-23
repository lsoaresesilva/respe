import { NameError } from './nameErro';
import Editor from './editor';

export abstract class Error {
    
    tipo;
    texto; // texto do erro
    linha;

    protected constructor(erro) {
        let padrao = /([a-zA-Z]+): .* on line ([0-9]+)/;
        let consulta = erro.match(padrao);

        this.texto = erro;
        this.tipo = "";

        if (consulta != null) {
            this.tipo = consulta[1];
            this.linha = consulta[2];
        }

    }

    toFireStore(){
        return {tipo:this.tipo, linha:this.linha, texto:this.texto}
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