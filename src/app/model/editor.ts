import { BehaviorSubject } from 'rxjs';
import ConfiguracaoEditor from './configuracaoEditor';
import ErroPreCompilacao from './errors/analise-pre-compilacao/erroPrecompilacao';
import { QuestaoProgramacao } from './questoes/questaoProgramacao';
declare var monaco: any;

export default class Editor {
  private constructor() {
    //this.editor = editor;
    this.codigo = new BehaviorSubject("");
    this.configuracao = new ConfiguracaoEditor();
  }

  static instance;
  codigo:BehaviorSubject<string>;
  decorations;
  hoverDisposable; // Usado para remover um hover
  configuracao: ConfiguracaoEditor;

  static getInstance(): Editor {
    if (this.instance == null) {
      this.instance = new Editor();
    }

    return this.instance;
  }

  static getTipoExecucao(questao: QuestaoProgramacao) {
    if (questao.testsCases.length != 0) {
      return 'testes';
    } else {
      return 'execução';
    }
  }

  /* Constrói um algoritmo a partir das edições feitas por alunos colaborativamente. */
  static construirAlgoritmo(edicoes){
    
  }

  destacarLinha(linha, status, editor) {
    if (linha != NaN && linha != undefined) {
      linha = parseInt(linha);
      if (linha > 0 && linha <= editor.getModel().getLineCount()) {
        const lineLength = editor.getModel().getLineLength(linha);
        let decorations = [
          {
            range: new monaco.Range(linha, 1, linha, lineLength),
            options: {
              isWholeLine: true,
              className: status,
            },
          },
        ];

        
        if( this.decorations == null){
          this.decorations = editor.deltaDecorations([], [{ range: new monaco.Range(1,1,1,1), options : { } }]);
        }
          
        this.decorations = editor.deltaDecorations(this.decorations, decorations);
        
        
      }
    }
  }

  criarHover(erro:ErroPreCompilacao, editor){

    if (erro.linha > 0 && erro.linha <= editor.getModel().getLineCount()) {
      const lineLength = editor.getModel().getLineLength(erro.linha);
      this.hoverDisposable = monaco.languages.registerHoverProvider('python', {
        provideHover: function (model, position) {
          return {
            range: new monaco.Range(erro.linha, 1, erro.linha, lineLength),
            contents: [
              { value: erro.mensagem },
              
            ]
          }
        }
      });
    }
    
    
  }

  removerDecorations(editor){
    this.decorations = editor.deltaDecorations(
      this.decorations,
      []
    );
  }

  removerDisposableHover(){
    if(this.hoverDisposable != null)
      this.hoverDisposable.dispose();
  }

  /* destacarLinha(linha, status) {
    if (linha != NaN && linha != undefined) {
      linha = parseInt(linha);
      if (linha > 0 && linha <= editor.getModel().getLineCount()) {
        const lineLength = editor.getModel().getLineLength(linha);
        this.decorations = [
          {
            range: new monaco.Range(linha, 1, linha, lineLength),
            options: {
              isWholeLine: true,
              className: 'erro',
            },
          },
        ];
        editor.deltaDecorations([], this.decorations);
      }
      //this.configuracao.decorations.push(editor.deltaDecorations([], ));
    }
  } */
}
