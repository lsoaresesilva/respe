import { Document, Collection } from './firestore/document';
import ResultadoTestCase from './resultadoTestCase';
import Query from './firestore/query';
import { Observable } from 'rxjs';

@Collection("estudantes")
export default class Estudante extends Document{
    nome;

    constructor(id){
        super(id);
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

    static calcularErrorQuotient(estudante:Estudante){
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

         // Pegar um par de submissões
    }
    
}