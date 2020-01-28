import { ErroCompilacao } from './erroCompilacao';
import { ignore } from '../../firestore/document';

export default class NameError extends ErroCompilacao{
    
  
    @ignore()
    nomeVariavel;

    constructor(id, traceback, submissao){
        super(id, traceback, submissao);
        this.nomeVariavel = NameError.getVariavelProblema(traceback);
    }

    static getVariavelProblema(traceback){
        let padrao = /name \'([a-zA-Z_-]+)\'/;
        let consulta = traceback.match(padrao);

        if (consulta != null ) {
            return consulta[1];
        }

        return null;
    }
    
    getMensagem() {
        return "Acredito que você tentou utilizar uma função ou variável: '" + this.nomeVariavel + "' na linha "+this.linha+", que não existe. Observe se você escreveu o nome corretamente ou se esqueceu de declará-la."
    }

}