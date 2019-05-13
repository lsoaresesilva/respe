import { Document, Collection } from './firestore/document';
import { Observable, forkJoin } from 'rxjs';
import AssuntoQuestao from './assuntoQuestao';
import Query from './firestore/query';
import { MaterialEstudo } from './materialEstudo';
import { Questao } from './questao';
import ResultadoTestCase from './resultadoTestCase';
import Usuario from './usuario';

@Collection("assuntos")
export class Assunto extends Document {


    constructor(id, public nome
        // public preRequisitos: Assunto[], public objetivosEducacionais, materialEstudo: MaterialEstudo[]
        ) {
        super(id);
    }

    static delete(id) {
        return new Observable(observer => {
            super.delete(id).subscribe(resultadoDelete => {
                AssuntoQuestao.getAll(new Query("assuntoId", "==", id)).subscribe(resultados => {
                    let delecoes = [];
                    resultados.forEach(assuntoQuestao => {
                        delecoes.push(AssuntoQuestao.delete(assuntoQuestao.pk()));
                    })

                    if (delecoes.length > 0)
                        forkJoin(delecoes).subscribe(resultados => {
                            observer.next();
                            observer.complete();
                        }, err => {
                            observer.error(err);
                        })
                    else {
                        observer.next();
                        observer.complete();
                    }
                })
            })

        });
    }

    static isFinalizado(assunto: Assunto, estudante, margemAceitavel = 0.6){
        return new Observable(observer => {
            this.percentualConclusaoQuestoes(assunto, estudante).subscribe(percentual=>{
                if(percentual >= margemAceitavel){
                    observer.next(true);
                    observer.complete();
                }else{
                    observer.next(false);
                    observer.complete();
                }
            })
        });
    }

    // TODO: pegar somente o que for do usuário logado
    static percentualConclusaoQuestoes(assunto: Assunto, usuario):Observable<number> {
        // Pegar todas as questões de um assunto
        return new Observable(observer => {
            if(assunto != undefined && usuario != undefined){
                Questao.getAll(new Query("assuntoPrincipalId", "==", assunto.pk())).subscribe(questoes => {
            
                    let consultas = []
                    questoes.forEach(questao => {
                        if (questao.testsCases != undefined && questao.testsCases.length > 0) {
                            questao.testsCases.forEach(testCase => {
                                if (typeof testCase.pk === "function"){
                                    
                                    consultas.push(ResultadoTestCase.getAll([new Query("testCaseId", "==", testCase.pk()), new Query("estudanteId", "==", usuario.pk()) ]));
                                }
                                    
                            })
                        }
                    })
    
                    let totalQuestoes = questoes.length;
    
                    if (consultas.length > 0) {
                        forkJoin(consultas).subscribe(todosResultadosTestsCases => {
                            if (todosResultadosTestsCases.length > 0) {
                                let questoesRespondidas = [];
                                questoes.forEach(questao => {
                                    let questaoRespondida = true;
                                    for (let j = 0; j < questao.testsCases.length; j++) {
                                        //let testResultados = [];
                                        let testCaseRespondidoSucesso = true;
                                        let resultadoAtualTestCase = null;
    
                                        todosResultadosTestsCases.forEach(resultadosTestCase => {
                                            for (let x = 0; x < resultadosTestCase["length"]; x++) {
                                                if (questao.testsCases[j].pk() == resultadosTestCase[x]["testCaseId"]) {
                                                    if (resultadoAtualTestCase == null)
                                                        resultadoAtualTestCase = resultadosTestCase[x];
                                                    else {
                                                        let dateTestCase = resultadosTestCase[x]["data"]["toDate"]()
                                                        let dateTestCaseAtual = resultadoAtualTestCase["data"]["toDate"]()
                                                        if (dateTestCase["getTime"]() > dateTestCaseAtual["getTime"]()) {
                                                            resultadoAtualTestCase = resultadosTestCase[x];
                                                        }
                                                    }
    
                                                }
                                            }
    
                                        });
                                        if (resultadoAtualTestCase == null || !resultadoAtualTestCase.status) {
                                            questaoRespondida = false
                                            break;
                                        }
                                    }
    
                                    if (questaoRespondida) {
                                        questoesRespondidas.push(questao);
                                    }
    
                                })
    
                                observer.next(questoesRespondidas.length/ totalQuestoes);
                                observer.complete();
                            } else {
                                observer.next(0);
                                observer.complete();
                            }
    
    
    
                        });
                    } else {
                        observer.next(0);
                        observer.complete();
                    }
                })
            }
            
        })

    }
}