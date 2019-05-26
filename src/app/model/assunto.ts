import { Document, Collection } from './firestore/document';
import { Observable, forkJoin } from 'rxjs';
import AssuntoQuestao from './assuntoQuestao';
import Query from './firestore/query';
import { MaterialEstudo } from './materialEstudo';
import { Questao } from './questao';
import ResultadoTestCase from './resultadoTestCase';
import Usuario from './usuario';
import Submissao from './submissao';
import { Util } from './util';

@Collection("assuntos")
export class Assunto extends Document {

    questoes?:Questao[];


    constructor(id, public nome) {
        super(id);
        // TODO: remover, pois questão estará dentro de assunto.
        
    }
    

    static getQuestoes(assunto){
        let questoes;
        return new Observable(observer=>{
            Questao.getAll(new Query("assuntoPrincipalId", "==", assunto.pk())).subscribe(questoes=>{
                questoes = questoes;
                
            }, err=>{
                observer.error(err);
            },()=>{
                observer.next(questoes);
                observer.complete();
            })
        })
    }

    objectToDocument(){
        let document = super.objectToDocument();
        if (this.questoes != null && this.questoes.length > 0) {
            let questoes = [];
            this.questoes.forEach(questao => {
                if(typeof questao.objectToDocument === "function")
                    questoes.push(questao.objectToDocument());
            })
      
            document["questoes"] = questoes;
          }

        return document;
    }

    getQuestaoById(questaoId){
        this.questoes.forEach(questao=>{
            if(questao.id == questaoId)
                return questao;
        })

        return new Questao(null, "", "", 0, 0, [], []);
    }

    static get(id){
        
        return new Observable(observer=>{
            super.get(id).subscribe(assunto=>{
                assunto["questoes"] = Questao.construir(assunto["questoes"]);
                observer.next(assunto);
                observer.complete();
            }, err=>{
                observer.error(err);
            });
        })
        
    }

    getQuestao(questaoId) {
        if (this.questoes != undefined && this.questoes.length > 0) {
            this.questoes.forEach(questao => {
                if (questao.id == questaoId) {
                    return questao;
                }
            })
        }

        return null;
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
        }
        );
    }



    static isFinalizado(assunto: Assunto, estudante, margemAceitavel = 0.6) {
        return new Observable(observer => {
            this.percentualConclusaoQuestoes(assunto, estudante, margemAceitavel).subscribe(percentual => {
                if (percentual >= margemAceitavel) {
                    observer.next(true);
                    observer.complete();
                } else {
                    observer.next(false);
                    observer.complete();
                }
            })
        });
    }


    validar() {
        if (this.nome == undefined || this.nome == null) {
            return false;
        }

        return true;
    }

    // TODO: pegar somente o que for do usuário logado
    static percentualConclusaoQuestoes(assunto: Assunto, usuario: Usuario, margemAceitavel): Observable<number> {
        // Pegar todas as questões de um assunto
        return new Observable(observer => {
            /*if (assunto != undefined && usuario != undefined) {
                

                    let consultas = {}
                    assunto.questoes.forEach(questao => {
                        if (questao.testsCases != undefined && questao.testsCases.length > 0) {
                            questao.testsCases.forEach(testCase => {
                                consultas[questao.pk()] = Submissao.getRecentePorQuestao(questao, usuario);
                            })
                        }
                    })

                    if (!Util.isObjectEmpty(consultas)) {
                        forkJoin(consultas).subscribe(submissoes => {
                            let s: any = submissoes;
                            if (!Util.isObjectEmpty(s)) {
                                let totalQuestoes = assunto.questoes.length;
                                let questoesRespondidas = [];
                                assunto.questoes.forEach(questao => {
                                    let questaoRespondida = true;
                                    //for (let j = 0; j < questao.testsCases.length; j++) {
                                    let resultadoAtualTestCase = null;

                                    for (let questaoId in s) {
                                        if (questaoId == questao.pk()) {
                                            let totalTestsCases = questao.testsCases.length;
                                            let totalAcertos = 0;
                                            if (s[questaoId] != null && s[questaoId].resultadosTestsCases != null) {
                                                s[questaoId].resultadosTestsCases.forEach(resultadoTestCase => {
                                                    if (resultadoTestCase.status)
                                                        totalAcertos++;
                                                })

                                                let percentual = totalAcertos / totalTestsCases;
                                                if (percentual >= margemAceitavel)
                                                    questoesRespondidas.push(questao);
                                            }

                                        }
                                    }
                                    //}
                                })

                                observer.next(questoesRespondidas.length / totalQuestoes);
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
                
            }
*/
        })

    }
}