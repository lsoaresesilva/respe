import Codigo from './codigo';
import { Error } from './error';
import Solucao from './solucao';
import StringSimilarity from '../util/stringSimilarity';

export default class SolucaoNameError extends Solucao{

    constructor(codigo:Codigo, erro:Error){
        super(codigo, erro);
        
    }

    formatarMensagem() {
        // verificar se tem texto e linha
        return "Acredito que a solução para o seu problema está na linha <b>"+this.linha+"</b> no código <b>"+this.codigo.getCodigoLinha(this.linha)+"</b>";
    }
    
    localizarSolucao(){
        this.linha = this.codigo.localizarLinha(this.solucaoNameError());
        this.trecho = this.codigo.getCodigoLinha(this.linha);
    }

    solucaoNameError(){
        let similaridadeVariaveis = this.verificarSimilaridade(this.codigo.identificarVariaveis());
        let similaridadeFuncoes = this.verificarSimilaridade(this.codigo.identificarFuncoes());
        if(similaridadeVariaveis["similaridade"] == undefined && similaridadeFuncoes["similaridade"] != undefined){
            return "def "+similaridadeFuncoes["nome"];
        }else if(similaridadeVariaveis["similaridade"] != undefined && similaridadeFuncoes["similaridade"] == undefined){
            return similaridadeVariaveis["nome"]+" = ";
        }else if(similaridadeVariaveis["similaridade"] != undefined && similaridadeFuncoes["similaridade"] != undefined){
            if(similaridadeVariaveis["similaridade"] >= similaridadeFuncoes["similaridade"]){
                return similaridadeVariaveis["nome"]+" = ";
            }else{
                return "def "+similaridadeFuncoes["nome"];
            }
        }else{
            return "";
        }
    }

    verificarSimilaridade(dados){
        //let variaveis = this.codigo.identificarVariaveis();
        //let funcoes = this.codigo.identificarFuncoes();

        let indiceSimilaridade = 0;
        let solucao = {};

        dados.forEach(dado => {
            let similaridade = StringSimilarity.check(dado, this.erro.nome);
            if(similaridade >= indiceSimilaridade){
                indiceSimilaridade = similaridade;
                solucao = {nome:dado, similaridade:indiceSimilaridade};
            }
        });

        return solucao;
    }
}