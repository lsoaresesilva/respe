import ErroSintaxeVariavel from './erroSintaxeVariavel';
import Codigo from './codigo';
import ErroSintaxeCondicional from './erroSintaxeCondiconal';
import ErroSintaxeFuncao from './erroSintaxeFuncao';
import Estudante from './estudante';
import Erro from './erro';
import { Observable, forkJoin } from 'rxjs';
import Submissao from './submissao';

export class Tutor{

    erros:Erro[];

    constructor(private submissao:Submissao){
        this.erros = []
    }

    analisar(){
        
        this.erros = this.erros.concat(ErroSintaxeVariavel.erros(this.submissao));
        this.erros = this.erros.concat(ErroSintaxeCondicional.erros(this.submissao));
        this.erros = this.erros.concat(ErroSintaxeFuncao.erros(this.submissao));

    }


    salvarErros(){
        return new Observable(observer=>{
            let operacoesSalvar = []
            this.erros.forEach(erro=>{
                operacoesSalvar.push(erro.save())
            })

            forkJoin(operacoesSalvar).subscribe(resultados=>{
                observer.next(resultados);
                observer.complete();
            }, err=>{
                observer.error(err);
            })
        })
        


    }

    hasErrors(){
        if(this.erros.length > 0){
            return true;
        }

        return false;
    }



    


}