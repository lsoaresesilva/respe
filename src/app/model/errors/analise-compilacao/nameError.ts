import { ErroCompilacao } from './erroCompilacao';
import { ignore } from '../../firestore/document';

export default class NameError extends ErroCompilacao{
    
  
    @ignore()
    nomeVariavel;

    constructor(id, traceback){
        super(id, traceback);
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
        return "Há um problema no seu código com a variáve ou função <span style='font-weight:bold'>" + this.nomeVariavel+"</span>. As possíveis causas podem ser:</br>1) Você tentou utilizar uma função ou variável que não existe. Observe se você escreveu o nome corretamente ou se esqueceu de declará-la; ou</br>2) Você está atribuindo um valor à uma variável com duas igualdades (==), quando deveria utilizar apenas uma igualdade. Por exemplo: x = 2."
    }

}