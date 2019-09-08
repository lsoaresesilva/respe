import { Questao } from './questao';
import Codigo from './codigo';
import { Document, Collection, date } from './firestore/document';
import Erro from './erro';
import { Observable, forkJoin } from 'rxjs';
import Query from './firestore/query';
import Usuario from './usuario';
import ResultadoTestCase from './resultadoTestCase';

@Collection("submissoes")
export default class Submissao extends Document {

    @date()
    data;
    estudante: Usuario;
    questao: Questao;
    erros: Erro[];
    resultadosTestsCases: ResultadoTestCase[];

    constructor(id, public codigo: Codigo, estudante, questao) {
        super(id);
        this.estudante = estudante;
        this.questao = questao;
        this.erros = [];
        this.resultadosTestsCases = [];
    }

    objectToDocument() {
        let document = super.objectToDocument();
        document["estudanteId"] = this.estudante.pk();
        document["questaoId"] = this.questao.id;
        document["codigo"] = this.codigo.algoritmo;
        if (this.resultadosTestsCases != null && this.resultadosTestsCases.length > 0) {
            let resultadoTestsCases = [];
            this.resultadosTestsCases.forEach(resultadoTestCase => {
                resultadoTestsCases.push(resultadoTestCase.objectToDocument());
            })
            document["resultadosTestsCases"] = resultadoTestsCases;
        }
        return document;
    }

    isComSucesso(){
        if (this.resultadosTestsCases != null && this.resultadosTestsCases.length > 0) {
            let sucesso = true;
            this.resultadosTestsCases.forEach(resultadoTestCase => {
                if(!resultadoTestCase.status)
                sucesso = false;
            });
            return sucesso;
        }else{
            return null;
        }
    }

    static getRecentePorQuestao(questao: Questao, estudante: Usuario) {
        
        return new Observable(observer => {
            if(questao == null || typeof questao.id == null || estudante == null || typeof estudante.pk != "function"){
                observer.error(new Error("Questão ou estudante não podem ser vazios"));
            }else{
                Submissao.getAll([new Query("estudanteId", "==", estudante.pk()), new Query("questaoId", "==", questao.id)]).subscribe(submissoes => {
                    let submissaoRecente = null;
                    if (submissoes.length != 0) {
                        if (submissoes.length == 1) {
                            submissaoRecente = submissoes[0];
                        } else {
                            submissoes.forEach(submissao => {
                                if (submissaoRecente == null) {
                                    submissaoRecente = submissao;
                                } else {
                                    if (submissaoRecente.data.toDate().getTime() <= submissao.data.toDate().getTime()) {
                                        submissaoRecente = submissao;
                                    }
                                }
                            })
                        }
                    }

                    
    
                    observer.next(submissaoRecente);
                    observer.complete();
                })
            }
            
        })

    }
    static get(id) {
        return new Observable(observer => {
            super.get(id).subscribe(submissao => {
                submissao["resultadosTestsCases"] = ResultadoTestCase.construir(submissao["resultadosTestsCases"]);
                Erro.getAll(new Query("submissaoId", "==", submissao["id"])).subscribe(erros => {
                    submissao["erros"] = erros;
                }, err => {

                }, () => {
                    observer.next(submissao);
                    observer.complete();
                });
            }, err => {
                observer.error(err);
            })
        })
    }

    static getAll(queries = null, orderBy = null) {
        return new Observable<any[]>(observer => {
            super.getAll(queries).subscribe(submissoes => {
                let erros: any[] = [];
                submissoes.forEach(submissao => {
                    erros.push(Erro.getAll(new Query("submissaoId", "==", submissao.pk())));
                    submissao.resultadosTestsCases = ResultadoTestCase.construir(submissao.resultadosTestsCases);

                })

                if (erros.length > 0) {
                    forkJoin(erros).subscribe(erros => {

                        erros.forEach(erro => {
                            if(erro["forEach"] != undefined){
                                erro["forEach"](e=>{
                                    for(let i = 0; i < submissoes.length; i++){
                                        if( e.submissaoId == submissoes[i].id){
                                            submissoes[i].erros.push(e);
                                            break;
                                        }
                                        
                                    }
                                })
                            }
                            

                        });



                    }, err => {

                    }, () => {
                        observer.next(submissoes);
                        observer.complete();
                    });
                } else {
                    observer.next(submissoes);
                    observer.complete();
                }


            }, err => {
                observer.error(err);
            })
        })
    }


}