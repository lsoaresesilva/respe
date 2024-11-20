import { BehaviorSubject } from 'rxjs';
import ErroPreCompilacao from './errors/analise-pre-compilacao/erroPrecompilacao';
import { QuestaoProgramacao } from './aprendizagem/questoes/questaoProgramacao';
import ParseAlgoritmo, {  MensagemErroFactory } from './errors/analise-pre-compilacao/parseAlgoritmo';
import { RespostaQuestaoProgramacaoRegex } from './aprendizagem/questoes/respostaQuestaoProgramacaoRegex';
import RespostaQuestaoProgramacao, { STATUS_RESPOSTA_QUESTAO_PROGRAMACAO } from './aprendizagem/questoes/respostaQuestaoProgramacao';
import { InterpretadorPythonService } from '../juiz/editor/interpretador-python.service';
import ErroProgramacao from './aprendizagem/questoes/erroProgramacao';

declare var monaco: any;

export class ConsoleEditor {

  erro;
  submissao?: RespostaQuestaoProgramacao;
  saida;
  tracebackOriginal;

  resetarErro() {
    this.erro = null;
    this.tracebackOriginal = null;
  }
}

export default class Editor {

  instanciaMonaco;
  console: ConsoleEditor
  submissao:RespostaQuestaoProgramacao;
  static instance;
  /* submissao:BehaviorSubject<RespostaQuestaoProgramacao>; */
  decorations;
  hoverDisposable; // Usado para remover um hover

  constructor(public interpretadorPython: InterpretadorPythonService, public questao: QuestaoProgramacao) {
    //this.editor = editor;
    /* this.submissao = new BehaviorSubject(null);
    this.submissao.subscribe((submissao)=>{
      this.submissao = new BehaviorSubject(submissao);
      if(this.instanciaMonaco != null){
        this.instanciaMonaco.getModel().setValue(submissao.codigo);
      }

    }) */

    this.console = new ConsoleEditor();
  }



  static getInstance(): Editor {
    if (this.instance == null) {
      //this.instance = new Editor();
    }

    return this.instance;
  }

  static construir(interpretadorPython, questao: QuestaoProgramacao) {
    const editor = new Editor(interpretadorPython, questao);
    return editor;
  }

  get codigoAtual() {
    return this.instanciaMonaco.getValue();
  }

  /*  set submissaoAtual(submissao){
     submissao = Array.isArray(submissao.codigo) ? submissao.codigo.join('\n') : submissao.codigo;
     this.submissao.next(submissao)
   } */

  set codigoAtual(codigo) {
    codigo = Array.isArray(codigo) ? codigo.join('\n') : codigo;
    this.instanciaMonaco.getModel().setValue(codigo);
  }

  static getTipoExecucao(questao: QuestaoProgramacao) {
    if (questao.testsCases.length != 0) {
      return 'testes';
    } else {
      return 'execução';
    }
  }

  /* Constrói um algoritmo a partir das edições feitas por alunos colaborativamente. */
  static construirAlgoritmo(edicoes) {

  }

  destacarLinha(linha, status) {
    if (!Number.isNaN(linha) && linha != undefined) {
      linha = parseInt(linha);
      if (linha > 0 && linha <= this.instanciaMonaco.getModel().getLineCount()) {
        const lineLength = this.instanciaMonaco.getModel().getLineLength(linha);
        let decorations = [
          {
            range: new monaco.Range(linha, 1, linha, lineLength),
            options: {
              isWholeLine: true,
              className: status,
            },
          },
        ];


        if (this.decorations == null) {
          this.decorations = this.instanciaMonaco.deltaDecorations([], [{ range: new monaco.Range(1, 1, 1, 1), options: {} }]);
        }

        this.decorations = this.instanciaMonaco.deltaDecorations(this.decorations, decorations);


      }
    }
  }

  criarHover(erro: ErroProgramacao) {

    if (this.hoverDisposable != null) {
      this.hoverDisposable.dispose();
    }

    if (erro.linha > 0 && erro.linha <= this.instanciaMonaco.getModel().getLineCount()) {
      const lineLength = this.instanciaMonaco.getModel().getLineLength(erro.linha);
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

  removerDecorations() {
    if (this.instanciaMonaco != null) {
      this.decorations = this.instanciaMonaco.deltaDecorations(
        this.decorations,
        []
      );
    }

  }

  removerDisposableHover() {
    if (this.hoverDisposable != null)
      this.hoverDisposable.dispose();
  }

  async executar() {
    
    const submissao: RespostaQuestaoProgramacao = new RespostaQuestaoProgramacao(null, this.codigoAtual, null, null, this.questao);
    try{
      const erros = new ParseAlgoritmo(submissao.linhasAlgoritmo()).analisar();
      if (!erros.hasErros()) {
  
        
        const resultado = await this.interpretadorPython.runPythonCodeAndCompare(
          submissao,
          submissao.questao
        );
  
        
        submissao.status = resultado.status ? STATUS_RESPOSTA_QUESTAO_PROGRAMACAO.TESTSCASES_RESPONDIDOS_SUCESSO : STATUS_RESPOSTA_QUESTAO_PROGRAMACAO.TESTSCASES_RESPONDIDOS_INSUCESSO;

        submissao.atualizarResultados(resultado);
  
      } else {
        submissao.setErros(erros);
        submissao.status = STATUS_RESPOSTA_QUESTAO_PROGRAMACAO.CONTEM_ERRO;
        submissao.erro = submissao.getPrimeiroErro();
        
      }
    }catch(e){
      submissao.status = STATUS_RESPOSTA_QUESTAO_PROGRAMACAO.CONTEM_ERRO;
    }
    

    this.submissao = submissao;

    return submissao;

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
