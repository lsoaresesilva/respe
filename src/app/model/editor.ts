import Codigo from './codigo';
import ErroFactory from './erroFactory';
import SolucaoFactory from './solucaoFactory';
import { Observable } from 'rxjs';
import ConfiguracaoEditor from './configuracaoEditor';
import Usuario from './usuario';
import Submissao from './submissao';
import Estudante from './estudante';
import { Questao } from './questao';
declare var monaco: any;
declare var editor: any;


export default class Editor {

    saida: string;
    erroProgramacao:string;
    codigo: Codigo;
    
    configuracao:ConfiguracaoEditor;

    static instance;

    private constructor() {
        //this.editor = editor;
        this.codigo = new Codigo();
        this.configuracao = new ConfiguracaoEditor();
        
    }

    static getInstance(): Editor {
        if (this.instance == null) {
            this.instance = new Editor();
        }

        return this.instance;
    }
    

    destacarLinha(linha, status) {
        if (linha != NaN && linha != 0 && linha != undefined) {
            linha = parseInt(linha);
            const lineLength = editor.getModel().getLineLength(linha);

            this.configuracao.decorations.push(editor.deltaDecorations([], [{ range: new monaco.Range(linha, 1, linha, lineLength), options: { isWholeLine: true, inlineClassName: (status == "erro" ? 'erro' : "possivelSolucao") } }]));
        }

    }

    prepararSaidaErro(erro) {
        
        let solucao = SolucaoFactory.check(erro, Editor.getInstance().codigo);
        this.saida = erro.mensagem();
        this.saida += "<br/><br/>";
        this.saida += solucao.mensagem();
        this.destacarLinha(erro.linha, "erro");
        this.destacarLinha(solucao.linha, "sucesso");
    }

    limparCores() {
        editor.deltaDecorations(this.configuracao.decorations, [{ range: new monaco.Range(1, 1, 1, 1), options: {} }]);
    }

    




}