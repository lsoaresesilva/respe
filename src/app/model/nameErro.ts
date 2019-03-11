import { Error } from './error';

export class NameError extends Error{
    nome;

    constructor(erro){
        super(erro);
        let padrao = /name \'([a-zA-Z_-]+)\'/;
        let consulta = erro.match(padrao);

        if (consulta != null ) {
            this.nome = consulta[1];
        }

        
    }

    mensagemErro(){
        return "A função ou variável: <b>'" + this.nome + "'</b> que você tentou utilizar na linha <b>"+this.linha+"</b> não existe. Observe se você escreveu o nome corretamente ou se esqueceu de declará-la."
    }

    
}