
import { CategoriaErro } from '../enum/categoriasErro';
import { Document, Collection, date, ignore } from '../../firestore/document';
import { Observable, forkJoin } from 'rxjs';
import NameError from './nameError';
import Submissao from '../../submissao';
import ErroCompilacaoFactory from './erroCompilacaoFactory';
import Query from '../../firestore/query';

@Collection("errosCompilacao")
export abstract class ErroCompilacao extends Document {

    @date()
    data;
    @ignore()
    linha;
    @ignore()
    categoria;

    protected constructor(id, public traceback, public submissao) {
        super(id);
        this.linha = ErroCompilacao.getLinha(traceback);
        this.categoria = ErroCompilacao.getCategoria(traceback);
    }

    objectToDocument() {
        let document = super.objectToDocument();
        if (this.submissao != null)
            document["submissaoId"] = this.submissao.pk();
        else {
            document["submissaoId"] = this["submissaoId"];
        }
        return document;

    }

    abstract getMensagem();

    static getAll(query): Observable<any[]> {
        return new Observable(observer => {
            super.getAll(query).subscribe(resultados => {
                let erros = []
                if (resultados.length > 0) {


                    resultados.forEach(resultado => {
                        let erro = ErroCompilacaoFactory.construir(resultado["traceback"], new Submissao(resultado["submissaoId"], null, null, null));

                        erros.push(erro);
                    })


                }

                observer.next(erros);
                observer.complete();
            })
        })

    }

    static getLinha(traceback) {
        if (traceback != null) {
            let padrao = /line ([0-9]+)/;
            let consulta = traceback.match(padrao);

            if (consulta != null) {

                return consulta[1];
            }
        }


        return null;
    }

    static isErro(traceback) {
        if (traceback != null) {
            let padrao = /([a-zA-Z]+)Error:/;
            let consulta = traceback.match(padrao);
            if (consulta != null) {
                return true;
            }
        }
        return false;
    }


    static getCategoria(traceback) {
        if (traceback != null) {
            let padrao = /([a-zA-Z]+):/;
            let consulta = traceback.match(padrao);

            if (consulta != null) {
                if (consulta[1] == "NameError") {
                    return CategoriaErro.nameError;
                } else if (consulta[1] == "SyntaxError") {
                    return CategoriaErro.syntaxError;
                } else if (consulta[1] == "TypeError") {
                    return CategoriaErro.typeError;
                }
                else if (consulta[1] == "IndentationError") {
                    return CategoriaErro.indentationError;
                }

            }
        }

        return null;

    }


    static getAllErrosEstudante(usuario) {

        return new Observable(observer => {
            Submissao.getAll(new Query("estudanteId", "==", usuario.pk())).subscribe(submissoes => {
                let erros = [];
                submissoes.forEach(submissao => {
                    erros.push(ErroCompilacao.getAll(new Query("submissaoId", "==", submissao.pk())));
                });

                if (erros.length > 0) {
                    forkJoin(erros).subscribe(resultados => {

                        observer.next(resultados["flat"]()); // O método flat é utilizado para transformar um array que possui n arrays, cada um com uma quantidade x de erros para cada submissão, em um único array.
                        observer.complete();
                    })
                } else {
                    observer.next(erros);
                    observer.complete();
                }
            });
        });
    }

    static calcularFrequenciaPorTipoErro(erros): any {
        let resultados = {};

        let nameError = 0;
        let syntaxError = 0;
        let typeError = 0;
        let indentationError = 0;

        erros.forEach(erro => {

            if (erro.categoria == CategoriaErro.nameError) {
                nameError += 1;
            } else if (erro.categoria == CategoriaErro.syntaxError) {
                syntaxError += 1;
            } else if (erro.categoria == CategoriaErro.typeError) {
                typeError += 1;
            } else if (erro.categoria == CategoriaErro.indentationError) {
                indentationError += 1;
            }
        })

        resultados = {nameError:nameError,
                      syntaxError:syntaxError,
                      typeError:typeError,
                      indentationError:indentationError};
  
        return resultados;
    }

}