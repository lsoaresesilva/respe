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
declare var Sk: any;

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

    builtinRead(x) {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
            throw "File not found: '" + x + "'";
        return Sk.builtinFiles["files"][x];
    }

    prepararEnvioCodigo() {
        // TODO: pegar o estudante logado.
        let envioCodigo = new Submissao(this.codigo.algoritmo, new Estudante(null), new Questao(null, null, null, null, null, null, null));

        // transformar o código de input em outra coisa

        return envioCodigo;
    }

    runit(): Observable<Submissao> {


        return new Observable(observer => {
            this.codigo.setAlgoritmo(editor.getValue()); // TODO: mudar para o onkeypress, assim toda vez que o estudante mudar seu código a variável que armazena o seu algoritmo será imediatamente atualizada.
            let envioCodigo = this.prepararEnvioCodigo();

            // TODO: apagar as cores do editor toda vez que uma nova execução for feita.
            Editor.getInstance().limparCores();

            Sk.pre = "output";
            let _this = this;

            function outf(texto) {
                if (texto != "\n")
                    _this.saida = texto;

            }

            Sk.configure({ output: outf, read: this.builtinRead });

            var myPromise = Sk.misceval.asyncToPromise(function () {
                return Sk.importMainWithBody("<stdin>", false, editor.getValue(), true);
            });

            myPromise.then(function (mod) {
                //envioCodigo.status = true;

                observer.next(envioCodigo);
                observer.complete();

            }, function (err) {
                let erro = ErroFactory.create(err.toString());

                //envioCodigo.status = false;
                //envioCodigo.erro = erro.toFireStore();

                _this.prepararSaidaErro(erro);

                observer.next(envioCodigo);
                observer.complete();
            });
        });


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