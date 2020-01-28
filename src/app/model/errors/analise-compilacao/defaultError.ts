import { ErroCompilacao } from './erroCompilacao';
import { ignore } from '../../firestore/document';

export default class DefaultError extends ErroCompilacao{
    
  
    @ignore()
    nomeVariavel;

    constructor(id, traceback, submissao){
        super(id, traceback, submissao);
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
        return "Há um problema no seu código na linha "+this.linha+". A resposta do seu algoritmo é: "+this.traceback;
    }

}