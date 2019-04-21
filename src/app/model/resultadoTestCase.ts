import { Collection, Document } from './firestore/document';
import { Observable } from 'rxjs';
import TestCase from './testCase';
import Estudante from './estudante';


@Collection("resultadoTestCase")
export default class ResultadoTestCase extends Document{

    estudante;
    status;
    respostaAlgoritmo;
    testCase;

    constructor(id, status, testCase:TestCase, estudante:Estudante){
        super(id);
        this.status = status;
        this.testCase = testCase;
        this.estudante = estudante;
    }

    objectToDocument(){
        let document = super.objectToDocument();
        document["estudanteId"] = this.estudante.id;
        //document["testCaseId"] = this.testCase.id; // TODO: fazer uma verificação no construtor para não permitir estudante e testcase null
        return document;
    }

    static get(id):Observable<any>{
        return new Observable(observer=>{
            super.get(id).subscribe(resultadoTestCase=>{
                if(resultadoTestCase["testCaseId"] != null || resultadoTestCase["testCaseId"] != undefined)
                    // TODO: fazer um teste quando faz uma consulta para um objeto que não existe, verificar se cai em err e depois se cai em complete.
                    TestCase.get(resultadoTestCase["testCaseId"]).subscribe(testCase=>{
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