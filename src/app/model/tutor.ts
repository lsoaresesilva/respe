
import Estudante from './errors/erroSintaxeFuncao'
import Erro from './errors/erro';
import { Observable, forkJoin } from 'rxjs';
import Submissao from './submissao';
import { Assunto } from './assunto';
import Usuario from './usuario';

export class Tutor{

    constructor(private submissao:Submissao){
        
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
                    let score = this.getEQ(submissoes[i], submissoes[i+1]);
                    if(score != null)
                        scores.push(score);
                    
                }
            }

            let calcularErrorQuotient = 0;
            scores.forEach(score=>{
                calcularErrorQuotient += score;
            })

            calcularErrorQuotient = calcularErrorQuotient/scores.length;

            return calcularErrorQuotient;
        }else{
            return null;
        }
                
    }  

    /**
     * Calcula o ErrorQuotient entre duas submissões.
     * @param submissaoUm 
     * @param submissaoDois 
     */
    static getEQ(submissaoUm, submissaoDois){
        
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

    static getDesempenhoEstudante(estudante:Usuario){
        return new Observable(observer=>{
            Assunto.getAll().subscribe(assuntos=>{
                let percentuaisQuestoesRespondidasPorAssunto = {}
                if(Array.isArray(assuntos) && assuntos.length > 0){
                    assuntos.forEach(assunto=>{
                        percentuaisQuestoesRespondidasPorAssunto[assunto.nome] = Assunto.calcularPercentualConclusaoQuestoesProgramacao(assunto, estudante, 0.6);
                    })
                    
                    if(Object.keys(percentuaisQuestoesRespondidasPorAssunto).length > 0){
                        forkJoin(percentuaisQuestoesRespondidasPorAssunto).subscribe(percentuais=>{
                            observer.next(percentuais);
                            observer.complete();
                        })
                    }
                }else{
                    observer.next([]);
                    observer.complete();
                }
            }, err=>{
                observer.error(err);
            })
        })
        

    }
    


}