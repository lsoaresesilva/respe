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

    constructor(private submissao:Submissao){
        
    }

    

    

    /**
     * Prepara a submissão para ser salva. Todos os tests cases serão inválidados, pois a submissão é referente a um erro.
     */
    salvarSubmissao(){
        let resultadosTestCase = [];
        this.submissao.questao.testsCases.forEach(testCase=>{
            resultadosTestCase.push(new ResultadoTestCase(null, false, "", testCase));
        });

        this.submissao.resultadosTestsCases = resultadosTestCase;

        return this.submissao.save();
    }


    

    


    static mediaTestsCases(estudante:Estudante){
        
        return new Observable(observer=>{
            // pegar todos os testes cases respondidos pelo estudante
            // TODO: resolver.
            /*ResultadoTestCase.getAll(new Query("estudanteId", "==", "12345")).subscribe(respostas=>{
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
            });*/   
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

    static desempenhoEstudante(errorQuotient){

        if(errorQuotient >= 0.0 && errorQuotient <= 0.25){
            return "Excelente";
        }else if(errorQuotient > 0.25 && errorQuotient <= 0.50){
            return "Bem";
        }else if(errorQuotient > 0.50 && errorQuotient <= 0.70){
            return "Razoável";
        }else if(errorQuotient > 0.75){
            return "Precisa melhorar (cuidado)";
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