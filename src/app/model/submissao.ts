import { Questao } from './questao';
import { Document, Collection, date, ignore } from './firestore/document';
import Erro from './errors/erro';
import { Observable, forkJoin } from 'rxjs';
import Query from './firestore/query';
import Usuario from './usuario';
import ResultadoTestCase from './resultadoTestCase';
import { Util } from './util';
import ErroSintaxeVariavel from './errors/erroSintaxeVariavel';
import ErroSintaxeCondicional from './errors/erroSintaxeCondiconal';
import ErroSintaxeFuncao from './errors/erroSintaxeFuncao';
import ErroServidor from './errors/erroServidor';
import { TipoErro } from './tipoErro';

@Collection("submissoes")
export default class Submissao extends Document {

    @date()
    data;
    estudante: Usuario;
    questao: Questao;
    erros: Erro[]; // TODO: incluir o erro no próprio document
    resultadosTestsCases: ResultadoTestCase[];
    @ignore()
    saida

    constructor(id, public codigo: string, estudante, questao) {
        super(id);
        this.estudante = estudante;
        this.questao = questao;
        this.erros = [];
        this.resultadosTestsCases = [];

    }

    analisarErros() {
        this.erros = [];
        this.erros = this.erros.concat(ErroSintaxeVariavel.erros(this));
        this.erros = this.erros.concat(ErroSintaxeCondicional.erros(this));
        this.erros = this.erros.concat(ErroSintaxeFuncao.erros(this));

    }

    hasErrors() {

        if (this.erros.length > 0) {
            return true;
        }

        return false;
    }

    objectToDocument() {
        let document = super.objectToDocument();
        document["estudanteId"] = this.estudante.pk();
        document["questaoId"] = this.questao.id;
        document["codigo"] = this.codigo;
        if (this.resultadosTestsCases != null && this.resultadosTestsCases.length > 0) {

        }
        if (this.resultadosTestsCases != null && this.resultadosTestsCases.length > 0) {
            let resultadoTestsCases = [];
            this.resultadosTestsCases.forEach(resultadoTestCase => {
                resultadoTestsCases.push(resultadoTestCase.objectToDocument());
            })
            document["resultadosTestsCases"] = resultadoTestsCases;
        }
        return document;
    }

    toJson() {
        return {
            codigo: this.codigo
        }
    }

    /**
     * Constrói o JSON que será enviado ao backend.
     */
    construirJson(questao: Questao, tipo) {
        let json = {}
        json["submissao"] = this.toJson()
        json["tipo"] = tipo;
        json["questao"] = questao.toJson();

        return json;
    }

    save(): Observable<any> {
        let resultados;
        return new Observable(observer => {
            let operacoesSalvar = [];
            super.save().subscribe(resultado => {
                this.erros.forEach(erro => {
                    operacoesSalvar.push(erro.save())
                })

                forkJoin(operacoesSalvar).subscribe(errosSalvos => {
                    resultados = errosSalvos;
                }, err => {
                    observer.error(err);
                }, () => {
                    observer.next(resultado);
                    observer.complete();
                })
            })

        })
    }

    /*static salvarErros(erros){
        
    }*/


    /**
     * Invalida a submissão (informando que os resultados do testcase são falsos) quando há um erro no algoritmo.
     */
    invalidar() {
        this.questao.testsCases.forEach(testCase => {
            this.resultadosTestsCases.push(new ResultadoTestCase(null, false, null, testCase));
        })
    }

    isComSucesso() {
        if (this.resultadosTestsCases != null && this.resultadosTestsCases.length > 0) {
            let sucesso = true;
            this.resultadosTestsCases.forEach(resultadoTestCase => {
                if (!resultadoTestCase.status)
                    sucesso = false;
            });
            return sucesso;
        } else {
            return null;
        }
    }


    /**
     * Recupera todos os usuários que realizaram submissão 
     * @param questao 
     */
    static getSubmissoesRecentesTodosUsuarios(questao: Questao, usuarioLogado: Usuario): Observable<any[]> {
        return new Observable(observer => {
            Submissao.getAll(new Query("questaoId", "==", questao.id)).subscribe(resultado => {
                //eliminar a submissao do próprio estudante
                let submissoes = resultado.filter((sub) => {
                    if (sub.estudanteId !== (usuarioLogado.pk())) { return true }
                });

                submissoes = this.filtrarSubmissoesConcluidas(submissoes);
                submissoes = this.agruparPorEstudante(submissoes);
                observer.next(submissoes);
                observer.complete();
            });
        })


    }

    private static agruparPorEstudante(submissoes: Submissao[]) {
        let submissoesAgrupadas = {}
        submissoes.forEach(submissao => {
            if (submissoesAgrupadas[submissao["estudanteId"]] == undefined) {
                submissoesAgrupadas[submissao["estudanteId"]] = [];

            }

            submissoesAgrupadas[submissao["estudanteId"]].push(submissao)

        })

        let submissoesRecentesAgrupadas = [];

        Object.keys(submissoesAgrupadas).forEach(estudanteId => {
            submissoesRecentesAgrupadas.push(this.filtrarRecente(submissoesAgrupadas[estudanteId]));
        })

        return submissoesRecentesAgrupadas;
    }

    private static filtrarSubmissoesConcluidas(submissoesQuestao = []) {

        // Filtrando todas as submissões que o seu resultadosTestsCase não seja undefined.
        let submissaoFiltrada = submissoesQuestao.filter(submissao => {
            return submissao.resultadosTestsCases !== undefined

        }).filter(submissao => { // Filtrando toda as submissões que tem todos os seus testsCases com status true (significa que a questão foi finalizada)

            // Retorna um array vazio caso o resultadosTestsCases tenha todos os elementos com status true. Caso não, o array vai retornar 
            // com pelo menos um elemento com status false
            let filterFalseTestsCases = submissao.resultadosTestsCases.filter(el => el.status === false)

            // Se a submissão tiver todos seus status true, então retorne-a
            if (filterFalseTestsCases.length === 0) { return submissao }


        });

        return submissaoFiltrada;
    }

    private static filtrarRecente(submissoes = []) {

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

        return submissaoRecente;
    }


    /**
     * Recupera a submissão mais recente de um estudante para uma questão.
     */
    static getRecentePorQuestao(questao: Questao, estudante: Usuario) {

        return new Observable(observer => {
            if (questao == null || typeof questao.id == null || estudante == null || typeof estudante.pk != "function") {
                observer.error(new Error("Questão ou estudante não podem ser vazios"));
            } else {
                Submissao.getAll([new Query("estudanteId", "==", estudante.pk()), new Query("questaoId", "==", questao.id)]).subscribe(submissoes => {

                    let submissaoRecente = this.filtrarRecente(submissoes)

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
                            if (erro["forEach"] != undefined) {
                                erro["forEach"](e => {
                                    for (let i = 0; i < submissoes.length; i++) {
                                        if (e.submissaoId == submissoes[i].id) {
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


    linhasAlgoritmo() {
        if (this.codigo != undefined)
            return this.codigo.split("\n");

        return [];
    }

    incluirErroServidor(erro){

        let mensagem = ""

        if (erro.name == "HttpErrorResponse" && erro.status == 0) {
            mensagem = "O servidor está fora do ar."
          } else if (erro.status == 500 && erro.error != undefined) {
            mensagem = erro.error.mensagem;
        }

        let erroServidor = new ErroServidor(null, -1, mensagem, TipoErro.erroServidor, this);
        this.erros.push(erro);
    }
}