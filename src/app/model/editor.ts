import Codigo from './codigo';
import ErroFactory from './erroFactory';
import SolucaoFactory from './solucaoFactory';
declare var monaco: any;
declare var editor: any;

export default class Editor {

    saida: string;
    statusExecucao: string;
    codigo;
    decorations = [];

    static instance;

    private constructor() {
        //this.editor = editor;
        this.codigo = new Codigo();
        this.statusExecucao = "";
    }

    static getInstance(){
        if(this.instance == null){
            this.instance = new Editor();
        }

        return this.instance;
    }

    destacarLinha(linha, status) {
        if (linha != NaN && linha != 0 && linha != undefined) {
            linha = parseInt(linha);
            const lineLength = editor.getModel().getLineLength(linha);

            this.decorations.push({ range: new monaco.Range(linha, 1, linha, lineLength), options: { isWholeLine: true, inlineClassName: (status == "erro" ? 'erro' : "possivelSolucao") } });
            /*this.decorations = this.editor.deltaDecorations([], [
              { range: new monaco.Range(linha, 1, linha, lineLength), options: { isWholeLine:true, inlineClassName: (status == "erro"?'erro':"possivelSolucao") } },
            ]);*/
            editor.deltaDecorations([], this.decorations);
        }

    }

    prepararSaidaErro(err) {
        let erro = ErroFactory.create(err);
        let solucao = SolucaoFactory.check(erro);
        this.saida = erro.mensagem();
        this.saida += "<br/><br/>";
        this.saida += solucao.mensagem();
        this.destacarLinha(erro.linha, "erro");
        this.destacarLinha(solucao.linha, "sucesso");
    }

    prepararStatus(status) {
        if (!status)
            this.statusExecucao = "<span class='statusErro'>Erro</span>";
        else
            this.statusExecucao = "<span class='statusSucesso'>Sucesso</span>";
    }


}