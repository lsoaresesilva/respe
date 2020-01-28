import { TipoErro } from '../tipoErro';
import { Document, Collection, ignore, date } from '../firestore/document';
import Submissao from '../submissao';
import { forkJoin, Observable } from 'rxjs';
import Query from '../firestore/query';
import { ErroCompilacao } from './analise-compilacao/erroCompilacao';
import { CategoriaErro } from './enum/categoriasErro';
import NameError from './analise-compilacao/nameError';


@Collection("errosEstudantes")
export default abstract class Erro extends Document{

    @date()
    data;
    @ignore()
    mensagem

    constructor(id, public traceback, public submissao:Submissao){
        super(id);
        
    }

    objectToDocument(){
        let document = super.objectToDocument();
        if(this.submissao != null)
            document["submissaoId"] = this.submissao.pk();
        else{
            document["submissaoId"] = this["submissaoId"];
        }
        return document;

    }

   

    static getAllErrosEstudante(usuario){

        return new Observable(observer=>{
            Submissao.getAll(new Query("estudanteId", "==", usuario.pk())).subscribe(submissoes=>{
                let erros = [];
                submissoes.forEach(submissao=>{
                    erros.push(Erro.getAll(new Query("submissaoId", "==", submissao.pk())));
                });
    
                if(erros.length > 0){
                    forkJoin(erros).subscribe(resultados=>{
                        
                        observer.next(resultados["flat"]()); // O método flat é utilizado para transformar um array que possui n arrays, cada um com uma quantidade x de erros para cada submissão, em um único array.
                        observer.complete();
                    })
                }else{
                    observer.next(erros);
                    observer.complete();
                }
            });
        }); 
    }

    /**
     * A análise dos erros identificará uma lista de falhas no código.
     * Este método irá retornar o primeiro erro ocorrido, a partir do erro que tem a linha mais próxima à 1.
     * @param erros 
     */
    static obterPrimeiroErro(erros:Erro[]){
        let primeiroErro = null;

        if(erros != undefined && erros.length > 0){
            
            erros.forEach(erro=>{
                if( primeiroErro == null )
                    primeiroErro = erro;
                else{
                    //if(erro.linha < primeiroErro.linha)
                    //    primeiroErro = erro
                }
            })
        }

        return primeiroErro;
    }

    static atualizarRank(ranking, top, erro){
        
        if(top == "top3")
            return;
        
        // se for sair do rank,  tem de ver na posição abaixo se pode entrar
        let oldRank = {tipo:TipoErro[ranking[top].tipo], total:ranking[top].total};
 
        let nextTop = ""
        if(top == "top1")
            nextTop = "top2"
        if(top == "top2")
            nextTop = "top3"

        
        if(oldRank.tipo != undefined && erro.total > ranking[top].total){
            Erro.atualizarRank(ranking, nextTop, oldRank)
        }

        ranking[top].tipo = TipoErro[erro.tipo];
        ranking[top].total = erro.total;
    }

    static rankErros(dados){
        let ranking = {top1:{tipo:undefined, total:0}, top2:{tipo:undefined, total:0}, top3:{tipo:undefined, total:0}}
        if( dados != undefined){

            let top1 = {}
            let top2 = {}
            let top3 = {}
            
            for (let key in dados) {
                if(dados[key] != 0){
                    if(ranking.top1.total < dados[key]){
                        //let oldRank1 = {total:ranking.top1.total, tipo:ranking.top1.tipo}
                        /*ranking.top1.total = dados[key];
                        ranking.top1.tipo = TipoErro[key];*/

                        // verificar se pode ir para o rank 2 ou rank 3
                        /*if(ranking.top2.total < oldRank1.){

                        }*/

                        Erro.atualizarRank(ranking, "top1", {tipo:key, total:dados[key]})
                    }else if(ranking.top2.total < dados[key]){
                        /*ranking.top2.total = dados[key];
                        ranking.top2.tipo = TipoErro[key];*/
                        Erro.atualizarRank(ranking, "top2", {tipo:key, total:dados[key]})
                    }else if(ranking.top3.total < dados[key]){
                        ranking.top3.total = dados[key];
                        ranking.top3.tipo = TipoErro[key];
                    }
                }
            }
        }

       return ranking;
        
    }

    static getTextoErro(tipo){
        switch(tipo){
            case 1:
                return TipoErro.numeroDecimalComVirgulaTexto;
            case 2:
                return TipoErro.declaracaoVariavelComDoisIguaisTexto;
            case 3:
                return TipoErro.espacoNoNomeVariavelTexto;
            case 4:
                return TipoErro.variavelNaoDeclaradaTexto;
            case 5:
                return TipoErro.faltaParentesisTexto;
            case 6:
                return TipoErro.faltaVirgulaParametrosTexto;
            case 7:
                return TipoErro.parDadosComparacaoTexto;
            case 8:
                return TipoErro.comparacaoApenasUmaIgualdadeTexto;
            case 9:
                return TipoErro.faltaDoisPontosCondicaoTexto;
            case 10:
                return TipoErro.faltaDoisPontosFuncaoTexto;
            default:
                return "";
        }
    }

    static getCorErro(tipo){
        switch(tipo){
            case 1:
                return "#FFBF00";
            case 2:
                return "#80FF00";
            case 3:
                return "#A9F5F2";
            case 4:
                return "#08298A";
            case 5:
                return "#BCA9F5";
            case 6:
                return "#8904B1";
            case 7:
                return "#F5A9D0";
            case 8:
                return "#F6CECE";
            case 9:
                return "#A9F5BC";
            case 10:
                return "#996633";
            default:
                return "";
        }
    }

    static calcularHistogramaPorRank(ranking, dados){

        let resultados = {}

        if( ranking != undefined && dados != undefined && dados.length > 0){
            
            dados.forEach(erro=>{

                
                let d = erro.data.toDate();
                let mes = d.getMonth();
                if( resultados[mes] == undefined ){
                    resultados[mes] = {top1:{total:0}, top2:{total:0}, top3:{total:0}}
                    
                }

                if(erro.tipo == ranking.top1.tipo)
                    resultados[mes].top1.total += 1;
                else if(erro.tipo == ranking.top2.tipo)
                    resultados[mes].top2.total += 1;
                else if(erro.tipo == ranking.top3.tipo)
                    resultados[mes].top3.total += 1;
            });

        }

        return resultados;
    }

    static calcularFrequenciaPorTipoErro(dados): any {
        
        let resultados = {};

        let comparacaoApenasUmaIgualdade = 0;
        let declaracaoVariavelComDoisIguais = 0;
        let espacoNoNomeVariavel = 0;
        let faltaDoisPontosCondicao = 0;
        let faltaDoisPontosFuncao = 0;
        let faltaParentesis = 0;
        let faltaVirgulaParametros = 0;
        let numeroDecimalComVirgula = 0;
        let parDadosComparacao = 0;
        let variavelNaoDeclarada = 0;
        
        dados.forEach(erro=>{
           
                if(erro.tipo == TipoErro.comparacaoApenasUmaIgualdade){
                    comparacaoApenasUmaIgualdade += 1;
                }else if(erro.tipo == TipoErro.declaracaoVariavelComDoisIguais){
                    declaracaoVariavelComDoisIguais += 1;
                }else if(erro.tipo == TipoErro.espacoNoNomeVariavel){
                    espacoNoNomeVariavel += 1;
                }else if(erro.tipo == TipoErro.faltaDoisPontosCondicao){
                    faltaDoisPontosCondicao += 1;
                }else if(erro.tipo == TipoErro.faltaDoisPontosFuncao){
                    faltaDoisPontosFuncao += 1;
                }else if(erro.tipo == TipoErro.faltaParentesis){
                    faltaParentesis += 1;
                }else if(erro.tipo == TipoErro.faltaVirgulaParametros){
                    faltaVirgulaParametros += 1;
                }else if(erro.tipo == TipoErro.numeroDecimalComVirgula){
                    numeroDecimalComVirgula += 1;
                }else if(erro.tipo == TipoErro.parDadosComparacao){
                    parDadosComparacao += 1;
                }else if(erro.tipo == TipoErro.variavelNaoDeclarada){
                    variavelNaoDeclarada += 1;
                }
        })

        resultados = {comparacaoApenasUmaIgualdade:comparacaoApenasUmaIgualdade, 
                      declaracaoVariavelComDoisIguais:declaracaoVariavelComDoisIguais,
                      espacoNoNomeVariavel:espacoNoNomeVariavel,
                      faltaDoisPontosCondicao:faltaDoisPontosCondicao,
                      faltaDoisPontosFuncao:faltaDoisPontosFuncao,
                      faltaParentesis:faltaParentesis,
                      faltaVirgulaParametros:faltaVirgulaParametros,
                      numeroDecimalComVirgula:numeroDecimalComVirgula,
                      parDadosComparacao:parDadosComparacao,
                      variavelNaoDeclarada:variavelNaoDeclarada};
            
        return resultados;
    }
}