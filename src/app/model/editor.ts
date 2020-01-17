
import ConfiguracaoEditor from './configuracaoEditor';
declare var monaco: any;
declare var editor: any;


export default class Editor {

    saida: string;
    erroProgramacao:string;
    codigo;
    
    configuracao:ConfiguracaoEditor;

    static instance;

    private constructor() {
        //this.editor = editor;
        this.codigo = ""
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

    limparCores() {
        editor.deltaDecorations(this.configuracao.decorations, [{ range: new monaco.Range(1, 1, 1, 1), options: {} }]);
    }

    destacarErros(erros){
        if(Array.isArray(erros) && erros.length > 0){
            erros.forEach(erro=>{
                this.destacarLinha(erro.linha, "erro");
            })
        }
    }




}