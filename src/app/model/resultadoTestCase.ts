import { Collection, Document, date } from './firestore/document';
import { Observable, forkJoin } from 'rxjs';
import TestCase from './testCase';
import Submissao from './submissao';
import Query from './firestore/query';

import * as firebase from 'firebase';

@Collection("resultadoTestCase")
export default class ResultadoTestCase{

    @date()
    data;


    // TODO: incluir a submissão

    constructor(public status, public respostaAlgoritmo, public testCase: TestCase, public submissao: Submissao) {
        //super(id);
    }

    objectToDocument() {
        let document = {};
        document["data"] = firebase.firestore.FieldValue.serverTimestamp();
        document["status"] = this.status;
        document["respostaAlgoritmo"] = this.respostaAlgoritmo;
        document["testCaseId"] = this.testCase.id;
        return document;
    }

    /*static saveAll(resultados: ResultadoTestCase[]):Observable<any[]> {

        return new Observable(observer => {
            let consultas = [];
            resultados.forEach(resultado => {
                let resultadoTestCase = new ResultadoTestCase(null, resultado["status"], resultado["respostaAlgoritmo"], new TestCase(resultado["testCaseId"], null, null, null), new Submissao(resultado["submissaoId"], null, null, null) );
                consultas.push(resultadoTestCase.save());
            })

            forkJoin(consultas).subscribe(resultados => {
                observer.next(resultados);
                observer.complete();
            }, err => {
                observer.error(err);
            })
        })
    }

    static get(id): Observable<any> {
        return new Observable(observer => {
            super.get(id).subscribe(resultadoTestCase => {
                if (resultadoTestCase["testCaseId"] != null || resultadoTestCase["testCaseId"] != undefined)
                    // TODO: fazer um teste quando faz uma consulta para um objeto que não existe, verificar se cai em err e depois se cai em complete.
                    TestCase.get(resultadoTestCase["testCaseId"]).subscribe(testCase => {
                        resultadoTestCase["testCase"] = testCase;

                    }, err => {

                    }, () => {
                        observer.next(resultadoTestCase);
                        observer.complete();
                    })
            });

        })
    }*/

    static getRecentePorSubmissaoTestCase(testCase:TestCase, submissao){
        return new Observable(observer=>{
            /*ResultadoTestCase.getAll([new Query("submissaoId", "==", submissao.pk()), new Query("testCaseId", "==", testCase.pk())]).subscribe(resultadosTestsCases=>{
                let resultadoTestCaseRecente = null;
                if(resultadosTestsCases.length != 0){
                    if(resultadosTestsCases.length == 1){
                        resultadoTestCaseRecente = resultadosTestsCases[0];
                    }else{
                        resultadosTestsCases.forEach(resultado=>{
                            if(resultadoTestCaseRecente == null){
                                resultadoTestCaseRecente = resultado;
                            }else{
                                if(resultadoTestCaseRecente.data.toDate().getTime() <= resultado.data.toDate().getTime()){
                                    resultadoTestCaseRecente = resultado;
                                }
                            }
                        })
                    }
                }

                observer.next(resultadoTestCaseRecente);
                observer.complete();
            })*/
        })
        
    }


}