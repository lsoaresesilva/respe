import { Collection, Document } from './firestore/document';
import { Observable } from 'rxjs';
import TestCase from './testCase';


@Collection("resultadoTestCase")
export default class ResultadoTestCase extends Document{

    estudante;
    status;
    respostaAlgoritmo;
    testCase;

    constructor(id, status, testCase){
        super(id);
        this.status = status;
        this.testCase = testCase;
    }

    static get(id):Observable<any>{
        return new Observable(observer=>{
            super.get(id).subscribe(resultadoTestCase=>{
                if(resultadoTestCase["idTestCase"] != null || resultadoTestCase["idTestCase"] != undefined)
                    // TODO: fazer um teste quando faz uma consulta para um objeto que não existe, verificar se cai em err e depois se cai em complete.
                    TestCase.get(resultadoTestCase["idTestCase"]).subscribe(testCase=>{
                        resultadoTestCase["testCase"] = testCase;
                        
                    }, err=>{

                    }, ()=>{
                        observer.next(resultadoTestCase);
                        observer.complete();
                    })
            });
            
        })
        


    }
}