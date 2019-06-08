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
import QuestaoFechada from './questaoFechada';

@Collection("assuntos")
export class Assunto extends Document {

    questoesProgramacao;
    questoesFechadas;

    constructor(id, public nome) {
        super(id);
        this.questoesFechadas = [];
        this.questoesProgramacao = [];
    }

    objectToDocument() {
        let document = super.objectToDocument();
        if (this.questoesProgramacao != null && this.questoesProgramacao.length > 0) {
            let questoes = [];
            this.questoesProgramacao.forEach(questao => {
                if (typeof questao.objectToDocument === "function")
                    questoes.push(questao.objectToDocument());
            })

            document["questoesProgramacao"] = questoes;
        }
        if (this.questoesFechadas != null && this.questoesFechadas.length > 0) {
            let questoesFechadas = [];
            this.questoesFechadas.forEach(questao => {
                if (typeof questao.objectToDocument === "function")
                    questoesFechadas.push(questao.objectToDocument());
            })

            document["questoesFechadas"] = questoesFechadas;
        }

        return document;
    }

    getQuestaoById(questaoId) {
        this.questoesProgramacao.forEach(questao => {
            if (questao.id == questaoId)
                return questao;
        })

        return new Questao(null, "", "", 0, 0, [], []);
    }

    static get(id) {

        return new Observable(observer => {
            super.get(id).subscribe(assunto => {
                assunto["questoesProgramacao"] = Questao.construir(assunto["questoesProgramacao"]);
                assunto["questoesFechadas"] = QuestaoFechada.construir(assunto["questoesFechadas"]);
                observer.next(assunto);
                observer.complete();
            }, err => {
                observer.error(err);
            });
        })

    }

    getQuestao(questaoId) {
        if (this.questoesProgramacao != undefined && this.questoesProgramacao.length > 0) {
            this.questoesProgramacao.forEach(questao => {
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
            if (assunto != undefined && usuario != undefined) {


                let consultas = {}
                assunto.questoesProgramacao.forEach(questao => {
                    if (questao.testsCases != undefined && questao.testsCases.length > 0) {
                        questao.testsCases.forEach(testCase => {
                            // TIRAR ISSO E SUBSTITUIR POR SUBMISSAO
                            consultas[questao.pk()] = Submissao.getRecentePorQuestao(questao, usuario);
                            //    consultas.push(ResultadoTestCase.getAll([new Query("testCaseId", "==", testCase.pk()), new Query("estudanteId", "==", usuario.pk()) ]));


                        })
                    }
                })

                if (!Util.isObjectEmpty(consultas)) {
                    forkJoin(consultas).subscribe(submissoes => {
                        let s: any = submissoes;
                        if (!Util.isObjectEmpty(s)) {
                            let totalQuestoes = assunto.questoesProgramacao.length;
                            let questoesRespondidas = [];
                            assunto.questoesProgramacao.forEach(questao => {
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

        })

    }
}