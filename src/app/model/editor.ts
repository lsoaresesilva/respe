import ConfiguracaoEditor from './configuracaoEditor';
import { QuestaoProgramacao } from './questoes/questaoProgramacao';
declare var monaco: any;
declare var editor: any;

export default class Editor {
  codigo;

  configuracao: ConfiguracaoEditor;

  static instance;

  private constructor() {
    //this.editor = editor;
    this.codigo = '';
    this.configuracao = new ConfiguracaoEditor();
  }

  static getInstance(): Editor {
    if (this.instance == null) {
      this.instance = new Editor();
    }

    return this.instance;
  }

  destacarLinha(linha, status) {
    if (linha != NaN && linha != undefined) {
      linha = parseInt(linha);
      if (linha > 0 && editor.getModel().getLineCount() <= linha) {
        const lineLength = editor.getModel().getLineLength(linha);

        let x = editor.deltaDecorations(editor.getModel().getAllDecorations(), [
          {
            range: new monaco.Range(linha, 1, linha, lineLength),
            options: {
              isWholeLine: true,
              className: status == 'erro' ? 'erro' : 'possivelSolucao',
            },
          },
        ]);
      }
      //this.configuracao.decorations.push(editor.deltaDecorations([], ));
    }
  }

  limparCores() {
    editor.deltaDecorations(this.configuracao.decorations, [
      { range: new monaco.Range(1, 1, 1, 1), options: {} },
    ]);
  }

  destacarErros(erros) {
    if (Array.isArray(erros) && erros.length > 0) {
      erros.forEach((erro) => {
        this.destacarLinha(erro.linha, 'erro');
      });
    }
  }

  static getTipoExecucao(questao: QuestaoProgramacao) {
    if (questao.testsCases.length != 0) {
      return 'testes';
    } else {
      return 'execução';
    }
  }
}
