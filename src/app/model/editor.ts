import { Error } from './error';
import Solucao from './solucaoFactory';
import Codigo from './codigo';
import ErroFactory from './erroFactory';
import SolucaoFactory from './solucaoFactory';
declare var monaco: any;
declare var editor: any;

export default class Editor {

    saida: string;
    statusExecucao:string;
    algoritmo;
    decorations = [];

    constructor(){
        //this.editor = editor;
        this.algoritmo = new Codigo();
        this.statusExecucao = "";
    }

    destacarLinha(linha, status) {
        const lineLength = editor.getModel().getLineLength(linha);
        linha = parseInt(linha);
    
        this.decorations.push({ range: new monaco.Range(linha, 1, linha, lineLength), options: { isWholeLine:true, inlineClassName: (status == "erro"?'erro':"possivelSolucao") }});
        /*this.decorations = this.editor.deltaDecorations([], [
          { range: new monaco.Range(linha, 1, linha, lineLength), options: { isWholeLine:true, inlineClassName: (status == "erro"?'erro':"possivelSolucao") } },
        ]);*/
        editor.deltaDecorations([], this.decorations);
    }

    prepararSaidaErro(err){
        let erro = ErroFactory.create(err.toString());
        let s = SolucaoFactory.check(this.algoritmo, erro);
        this.saida = erro.mensagemErro();
        this.saida += "<br/><br/>";
        this.saida += s.formatarMensagem();
        this.destacarLinha(erro.linha, "erro");
        this.destacarLinha(s.linha, "sucesso");
    }

    prepararStatus(status){
        if(!status)
            this.statusExecucao = "<span class='statusErro'>Erro</span>";
        else
            this.statusExecucao = "<span class='statusSucesso'>Sucesso</span>";
    }

   
}