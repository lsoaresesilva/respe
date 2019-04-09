import ErroSintaxeVariavel from './erroSintaxeVariavel';
import Codigo from './codigo';
import ErroSintaxeCondicional from './erroSintaxeCondiconal';
import ErroSintaxeFuncao from './erroSintaxeFuncao';

export class Tutor{

    erros;

    constructor(private codigo:Codigo){
        this.erros = [];
    }

    analisar(){
        
        this.erros = this.erros.concat(ErroSintaxeVariavel.erros(this.codigo));
        this.erros = this.erros.concat(ErroSintaxeCondicional.erros(this.codigo));
        this.erros = this.erros.concat(ErroSintaxeFuncao.erros(this.codigo));

    }

    hasErrors(){
        if(this.erros.length > 0){
            return true;
        }

        return false;
    }



    


}