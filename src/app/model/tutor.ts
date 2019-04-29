import ErroSintaxeVariavel from './erroSintaxeVariavel';
import Codigo from './codigo';
import ErroSintaxeCondicional from './erroSintaxeCondiconal';
import ErroSintaxeFuncao from './erroSintaxeFuncao';
import Estudante from './estudante';
import Erro from './erro';
import { Observable, forkJoin } from 'rxjs';
import Submissao from './submissao';
import ResultadoTestCase from './resultadoTestCase';
import Query from './firestore/query';
import { Assunto } from './assunto';

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


    static mediaTestsCases(estudante:Estudante){
        
        return new Observable(observer=>{
            // pegar todos os testes cases respondidos pelo estudante
            ResultadoTestCase.getAll(new Query("estudanteId", "==", "12345")).subscribe(respostas=>{
                let respostasTestsCases = respostas.length;
                let respostasCorretas = 0;
                respostas.forEach(resultado=>{
                    if( resultado.status )
                        respostasCorretas += 1;
                    
                });

                let percentual = respostasCorretas/respostasTestsCases;
                observer.next(percentual);
                observer.complete();

            }, err=>{
                // TODO: fazer algo com o erro
            });   
        });
        
    }

    /**
         * Given two compilation events, we first check
            whether both compilations ended in error. If they did, we assign a
            penalty. We then compare the error messages encountered. If
            they are the same, another penalty is imposed. If the errors
            occurred on the same line numbers, a third penalty is imposed.
            Finally, the programmer incurs a fourth penalty if the edit location
            of the source code on both events are the same. The penalties are
            normalized and averaged across all pairs of compilations to arrive
            at the final EQ score of the session.
            An EQ score ranges from 0 to 1.0, where 0 is a perfect score
                    */
    static calcularErrorQuotient(submissoes:Submissao[]){
        if(submissoes == null){
            throw new Error("Estudante precisa ser informado para calcular o Error Quotient.");
        }

        // Pegar todas as submissòes
        
        // TODO: dar um order by data em submissões, pois pode ser que não pegue na ordem em que foram adicionados.
        // formar pares
        if(submissoes.length > 1){
            let scores = [];

            for(let i = 0; i < submissoes.length; i++){
                if( i % 2 == 0){
                    let score = this.errorQuotient(submissoes[i], submissoes[i+1]);
                    if(score != null)
                        scores.push(score);
                    
                }
            }

            let errorQuotient = 0;
            scores.forEach(score=>{
                errorQuotient += score;
            })

            errorQuotient = errorQuotient/scores.length;

            return errorQuotient;
        }else{
            return null;
        }
                
    }

    static errorQuotient(submissaoUm, submissaoDois){
        
        if(submissaoUm == undefined || submissaoDois == undefined || submissaoDois == null || submissaoUm == null)
            return null;
        
        let score = 0;

        if(submissaoUm.erros != undefined && submissaoDois.erros != undefined && submissaoUm.erros.length >= 1 && submissaoDois.erros.length >= 1){
            
            
            score = 8;

            let erroUm = null;
            let erroDois = null

            erroUm = Erro.obterPrimeiroErro(submissaoUm.erros);
            erroDois = Erro.obterPrimeiroErro(submissaoDois.erros);

            if(erroUm != null && erroDois != null && erroUm.tipo == erroDois.tipo){
                score += 3;
            }

            
        }

        return score/11;
    }

    static calcularPercentualQuestoes(assunto:Assunto){

    }
    


}