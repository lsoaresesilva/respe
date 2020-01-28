
import { CategoriaErro } from '../enum/categoriasErro';
import { Document, Collection, date, ignore } from '../../firestore/document';
import { Observable } from 'rxjs';
import NameError from './nameError';
import Submissao from '../../submissao';
import ErroCompilacaoFactory from './erroCompilacaoFactory';

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
            let padrao = /line ([0-9]+)\,/;
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
                }

            }
        }

        return null;

    }


    /*obterLinhaComErro(erro) {
    //var padrao = new RegExp("([a-zA-Z]+): name \'([a-zA-Z]+)\' is not defined on line ([0-9]+)");
    let padrao = /"([a-zA-Z]+): name \'([a-zA-Z]+)\' is not defined on line ([0-9]+)/;
    var consulta = erro.toString().match(padrao);
    if (consulta != null && consulta.length > 0 && consulta[2] != undefined) {
      return consulta[2];
    }

    return null;
  }*/


}