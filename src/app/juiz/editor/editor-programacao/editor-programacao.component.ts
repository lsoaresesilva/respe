import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  AfterViewChecked,
  AfterViewInit,
  OnChanges,
} from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import Submissao from 'src/app/model/submissao';
import Editor from 'src/app/model/editor';
import { LoginService } from 'src/app/login-module/login.service';

import { catchError, retry, switchMap, timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from 'src/app/cscl/chat.service';
import { Assunto } from 'src/app/model/assunto';
import Edicao from 'src/app/model/cscl/edicao';
import Algoritmo from 'src/app/model/algoritmo';
import SubmissaoGrupo from 'src/app/model/cscl/submissaoGrupo';
import AtividadeGrupo from 'src/app/model/cscl/atividadeGrupo';
import HistoricoEdicoes from 'src/app/model/cscl/historicoEdicoes';
import TraceVisualizacao from 'src/app/model/visualizacao/traceVisualizacao';
import { DialogService } from 'primeng/dynamicdialog';
import { ExibirSolucaoComponent } from 'src/app/srl/monitoramento/exibir-solucao/exibir-solucao.component';
import PageTrackRecord from 'src/app/model/analytics/pageTrack';

/**
 * Executa um javascript ide.js para acoplar o editor VStudio.
 */
// declare var editor: any;
declare var monaco: any;
declare var editorProgramacao: any;
declare function carregarIde(
  readOnly,
  callback,
  instance,
  callbackOnEditorLoad,
  codigo,
  isAtividadeGrupo
): any;
declare function atualizarDecorations(): any;

@Component({
  selector: 'app-editor-programacao',
  templateUrl: './editor-programacao.component.html',
  styleUrls: ['./editor-programacao.component.css'],
})
export class EditorProgramacaoComponent implements AfterViewInit, OnChanges, OnInit {
  URL = environment.URL;

  processandoSubmissao;
  processandoVisualizacao;

  editor; // instância do Mônaco Editor. Carregado por meio do arquivo ide.js

  @Input()
  console;
  @Input()
  questao;
  @Input()
  assunto;
  @Input()
  liteMode; // define que o editor executará em um modo de aparência menor.
  @Input()
  modoVisualizacao;

  /*CSCL*/

  @Input()
  atividadeGrupo;
  @Input()
  grupo;

  statusBtnEnvioAtividadeGrupo;

  usuario;
  salvamentoEdicoes;

  @Input() set submissao(value) {
    this._submissao = value;
    this.atualizarEditorComSubmissao();
  }

  get submissao() {
    return this._submissao;
  }

  _submissao;
  editorCodigo?: Editor;

  items; // Botões da visualização de algoritmos

  @Output()
  onError: EventEmitter<any>;
  @Output()
  onSubmit: EventEmitter<any>;
  @Output()
  onServidorError: EventEmitter<any>;
  @Output()
  onVisualization: EventEmitter<any>;
  @Output()
  onEditorReady: EventEmitter<any>;

  document; // Armazena as edições colaborativas realizadas no editor.
  posicaoCursor;
  isConectado; // Armazena o status do editor em relação aos sockets de CSCL

  isEditorPronto;

  constructor(
    private http: HttpClient,
    public login: LoginService,
    private confirmationService: ConfirmationService,
    private router: Router,
    public chat: ChatService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    public dialogService: DialogService
  ) {
    this.onError = new EventEmitter();
    this.onSubmit = new EventEmitter();
    this.onVisualization = new EventEmitter();
    this.onServidorError = new EventEmitter();
    this.onEditorReady = new EventEmitter();
    this.processandoSubmissao = false;
    this.processandoVisualizacao = false;
    this.usuario = this.login.getUsuarioLogado();
    editorProgramacao = null;

    /**
     * TODO: verificar se já foi feita a submissão de atividade em grupo, se sim inicia como true.
     */

    this.statusBtnEnvioAtividadeGrupo = false;
    this.isConectado = false;
    this.modoVisualizacao = false;
    this.items = [];
    this.isEditorPronto = false;
  }

  ngOnInit(): void {
    this.posicaoCursor = { column: 1, lineNumber: 1 };
  }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    //this.atualizarEditorComSubmissao();
  }

  ngAfterViewInit(): void {
    this.editorCodigo = Editor.getInstance();
    if (
      this.questao != null &&
      this.questao.algoritmoInicial !== null &&
      this.questao.algoritmoInicial !== '' &&
      Array.isArray(this.questao.algoritmoInicial)
    ) {
      this.editorCodigo.codigo = this.questao.algoritmoInicial.join('\n');
    } else {
      this.editorCodigo.codigo = '';
    }

    let _this = this;
    

    if (
      this.questao != null &&
      this.questao.testsCases != null &&
      Array.isArray(this.questao.testsCases)
    ) {
      
      let i = 0;
      this.questao.testsCases.forEach((testCase) => {
        i++;
        this.items.push({
          label: 'Entrada ' + i,
          command: () => {
            this.visualizar(testCase);
          },
        });
      });
    }

    let isAtividadeGrupo = false;
    if (this.atividadeGrupo != null) {
      isAtividadeGrupo = true;
    }

    setTimeout(function(){
      carregarIde(false, function(){
        _this.isEditorPronto = true;
      }, _this, _this.carregarEditor, _this.editorCodigo.codigo, isAtividadeGrupo);
    }, 500)
    
  }

  visualizarResposta(questao) {
    this.confirmationService.confirm({
      message:
        'Se você visualizar a resposta dessa questão não ganhará pontos ao respondê-la. Tem certeza que deseja visualizar?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        const pageTrack = new PageTrackRecord(null, "visualizacao-resposta-questao", this.login.getUsuarioLogado());
        pageTrack.save().subscribe(() => {});
        const ref = this.dialogService.open(ExibirSolucaoComponent, {
          header: 'Algoritmo com a solução do problema',
          width: '60%',
          data: {
            questao: questao,
          },
        });

        ref.onClose.subscribe(() => {
          this.confirmationService.close();
        });
      },
    });
  }

  atualizarEditorComSubmissao() {
    if (this._submissao != null) {
      this.editorCodigo.codigo = this._submissao['codigo'];
      if (this.editor != null) {
        this.editor.getModel().setValue(this.editorCodigo.codigo);
        //atualizarDecorations();
      }
    }
  }

  carregarEditor(editorProgramacaoComponentInstance, editor) {
    editorProgramacaoComponentInstance.editor = editor;
    editorProgramacaoComponentInstance.onEditorReady.emit(editor);
    editorProgramacaoComponentInstance.atualizarEditorComSubmissao();

    if (
      editorProgramacaoComponentInstance.atividadeGrupo != null &&
      editorProgramacaoComponentInstance.atividadeGrupo.pk() != null
    ) {
      editorProgramacaoComponentInstance.chat.iniciarConexao(
        editorProgramacaoComponentInstance.atividadeGrupo.pk()
      );
      editorProgramacaoComponentInstance.chat.observerCodigo.subscribe((doc) => {
        editorProgramacaoComponentInstance.isConectado = true;
        editorProgramacaoComponentInstance.document = doc;
        let novoAlgoritmo = Algoritmo.criar(doc.data.algoritmo);
        let algoritmoAntigo = editor.getValue();
        if (novoAlgoritmo !== algoritmoAntigo) {
          editor.setValue(novoAlgoritmo);
          editor.setPosition(editorProgramacaoComponentInstance.posicaoCursor);
          if (doc.data.autor != editorProgramacaoComponentInstance.usuario.id) {
            editor.deltaDecorations(
              [],
              [
                /* Column+1 por que ao digitar o texto no editor, o usuário que digitou avança o cursor para após o dígito. */
                {
                  range: new monaco.Range(
                    doc.data.cursor.lineNumber,
                    doc.data.cursor.column + 1,
                    doc.data.cursor.lineNumber,
                    doc.data.cursor.column + 1
                  ),
                  options: { className: 'my-cursor' },
                },
              ]
            );

            editor.render(true);
          }
        }
      });

      editorProgramacaoComponentInstance.sincronizarEditor(
        editorProgramacaoComponentInstance.editor
      );
    }
  }

  /**
   * Faz o controle para que os estudantes tenham o seu código sincronizado.
   */
  sincronizarEditor(editor) {
    let _this = this;
    let textoAntes = '';
    let textoLinhaAnterior = '';
    let cursorAntes: any = {};
    let historicoEdicoes = new HistoricoEdicoes(
      null,
      this.atividadeGrupo,
      this.grupo,
      this.usuario
    );
    let selection = null;
    let ultimaColunaLinha = null;
    let modeloAntesEdicao = null;
    this.salvamentoEdicoes = setInterval(() => {
      // TODO: passar uma referência do objeto atividade grupo de responder questão para editor e usar aqui
      if (this.atividadeGrupo.pk() != null) {
        if (historicoEdicoes.edicoes.length > 0) {
          historicoEdicoes.save().subscribe(() => {
            historicoEdicoes.resetar();
          });
        }
      }
    }, 120000);

    editor.onKeyDown(function (e) {
      cursorAntes = editor.getPosition();
      let texto = editor.getModel().getLineContent(editor.getPosition().lineNumber);
      modeloAntesEdicao = editor.getModel();
      textoAntes = texto;
      if(cursorAntes.lineNumber > 1){
        textoLinhaAnterior = editor.getModel().getLineContent(editor.getPosition().lineNumber - 1);
      }
      
      selection = editor.getSelection();
      ultimaColunaLinha = editor.getModel().getLineMaxColumn(editor.getPosition().lineNumber);
    });

    editor.onKeyUp(function (e) {
      _this.posicaoCursor = editor.getPosition();
      let op = null;
      let linhaAtual = editor.getPosition().lineNumber;
      let texto = editor.getModel().getLineContent(editor.getPosition().lineNumber);
      
      let possuiNumerosOuLetras = /([A-Z])+|([a-z])+|\w+|([0-9])+/g;
      let regex = new RegExp(possuiNumerosOuLetras);
      let test = regex.exec(textoAntes);

      /* if(texto == "    " || texto == "" && (e.browserEvent.key === "Enter" || e.browserEvent.keyCode == 13)){
        op = [
          { p: ['algoritmo', _this.posicaoCursor.lineNumber-1], li: "" },
          {
            p: ['cursor', 'lineNumber'],
            od: cursorAntes.lineNumber,
            oi: _this.posicaoCursor.lineNumber,
          },
          { p: ['cursor', 'column'], od: cursorAntes.column, oi: _this.posicaoCursor.column },
          { p: ['autor'], od: _this.usuario.id, oi: _this.usuario.id },
        ];
      }else{
        op = [
          { p: ['algoritmo', _this.posicaoCursor.lineNumber - 1], ld: textoAntes, li: texto },
          {
            p: ['cursor', 'lineNumber'],
            od: cursorAntes.lineNumber,
            oi: _this.posicaoCursor.lineNumber,
          },
          { p: ['cursor', 'column'], od: cursorAntes.column, oi: _this.posicaoCursor.column },
          { p: ['autor'], od: _this.usuario.id, oi: _this.usuario.id },
        ];
  
        let edicao = new Edicao(_this.posicaoCursor.lineNumber, texto);
        historicoEdicoes.inserir(edicao);
      } */

      if (test == null && (e.browserEvent.key === 'Enter' || e.browserEvent.keyCode == 13)) {
        op = [
          { p: ['algoritmo', _this.posicaoCursor.lineNumber - 1], li: '' },
          {
            p: ['cursor', 'lineNumber'],
            od: cursorAntes.lineNumber,
            oi: _this.posicaoCursor.lineNumber,
          },
          { p: ['cursor', 'column'], od: cursorAntes.column, oi: _this.posicaoCursor.column },
          { p: ['autor'], od: _this.usuario.id, oi: _this.usuario.id },
        ];
      } else if (
        test == null &&
        (e.browserEvent.key === 'Backspace' ||
          e.browserEvent.keyCode == 8 ||
          e.browserEvent.key === 'Del' ||
          e.browserEvent.keyCode == 46)
      ) {
        // Apagar uma linha em que acima tenha um texto
        if (cursorAntes.lineNumber > _this.posicaoCursor.lineNumber) {
          op = [
            { p: ['algoritmo', _this.posicaoCursor.lineNumber], ld: '' },
            {
              p: ['cursor', 'lineNumber'],
              od: cursorAntes.lineNumber,
              oi: _this.posicaoCursor.lineNumber,
            },
            { p: ['cursor', 'column'], od: cursorAntes.column, oi: _this.posicaoCursor.column },
            { p: ['autor'], od: _this.usuario.id, oi: _this.usuario.id },
          ];
        } else {
          // Fazer: Apagar múltiplos caracteres

          if (selection.startLineNumber != selection.endLineNumber) {
            for (let i = selection.startLineNumber; i < selection.endLineNumber + 1; i++) {
              op = [
                { p: ['algoritmo', i - 1], ld: '' },
                {
                  p: ['cursor', 'lineNumber'],
                  od: cursorAntes.lineNumber,
                  oi: _this.posicaoCursor.lineNumber,
                },
                { p: ['cursor', 'column'], od: cursorAntes.column, oi: _this.posicaoCursor.column },
                { p: ['autor'], od: _this.usuario.id, oi: _this.usuario.id },
              ];

              _this.document.submitOp(op); // TODO: jogar para o service
            }

            op = null;
          } else {
            if (texto != textoAntes) {
              op = [
                { p: ['algoritmo', _this.posicaoCursor.lineNumber - 1], ld: textoAntes, li: texto },
                {
                  p: ['cursor', 'lineNumber'],
                  od: cursorAntes.lineNumber,
                  oi: _this.posicaoCursor.lineNumber,
                },
                { p: ['cursor', 'column'], od: cursorAntes.column, oi: _this.posicaoCursor.column },
                { p: ['autor'], od: _this.usuario.id, oi: _this.usuario.id },
              ];
            } else {
              op = [
                { p: ['algoritmo', _this.posicaoCursor.lineNumber - 1], ld: '' },
                {
                  p: ['cursor', 'lineNumber'],
                  od: cursorAntes.lineNumber,
                  oi: _this.posicaoCursor.lineNumber,
                },
                { p: ['cursor', 'column'], od: cursorAntes.column, oi: _this.posicaoCursor.column },
                { p: ['autor'], od: _this.usuario.id, oi: _this.usuario.id },
              ];
            }
          }
        }
      } else {
        if (
          e.browserEvent.key === 'Backspace' ||
          e.browserEvent.keyCode == 8 ||
          e.browserEvent.key === 'Del' ||
          e.browserEvent.keyCode == 46
        ) {
          /* // Apagar seleção de múltiplos textos
          if (selection.startLineNumber != selection.endLineNumber) {
            op = [];
            for (let i = selection.startLineNumber; i < selection.endLineNumber + 1; i++) {
              if(modeloAntesEdicao != null){
                let textoDeletar = modeloAntesEdicao.getLineContent(i);
                op.push({ p: ['algoritmo', i - 1], ld: textoDeletar });
              }
              
            }
            op.push({
              p: ['cursor', 'lineNumber'],
              od: cursorAntes.lineNumber,
              oi: _this.posicaoCursor.lineNumber,
            });

            op.push({ p: ['cursor', 'column'], od: cursorAntes.column, oi: _this.posicaoCursor.column });
            op.push({ p: ['autor'], od: _this.usuario.id, oi: _this.usuario.id })
            

            _this.document.submitOp(op); // TODO: jogar para o service

            op = null;
          }else  */if (cursorAntes.lineNumber > _this.posicaoCursor.lineNumber) {
            //  Cursor no início da linha, apagar com backspace (sobe para linha anterior)
            op = [
              { p: ['algoritmo', _this.posicaoCursor.lineNumber], ld: '' },
              {
                p: ['cursor', 'lineNumber'],
                od: cursorAntes.lineNumber,
                oi: _this.posicaoCursor.lineNumber,
              },
              { p: ['cursor', 'column'], od: cursorAntes.column, oi: _this.posicaoCursor.column },
              { p: ['autor'], od: _this.usuario.id, oi: _this.usuario.id },
            ];

            _this.document.submitOp(op); // TODO: jogar para o service

            op = [
              {
                p: ['algoritmo', _this.posicaoCursor.lineNumber - 1],
                ld: textoLinhaAnterior,
                li: texto,
              },
              {
                p: ['cursor', 'lineNumber'],
                od: cursorAntes.lineNumber,
                oi: _this.posicaoCursor.lineNumber,
              },
              { p: ['cursor', 'column'], od: cursorAntes.column, oi: _this.posicaoCursor.column },
              { p: ['autor'], od: _this.usuario.id, oi: _this.usuario.id },
            ];

            _this.document.submitOp(op); // TODO: jogar para o service

            op = null;
          } else {
            op = [
              { p: ['algoritmo', _this.posicaoCursor.lineNumber - 1], ld: textoAntes, li: texto },
              {
                p: ['cursor', 'lineNumber'],
                od: cursorAntes.lineNumber,
                oi: _this.posicaoCursor.lineNumber,
              },
              { p: ['cursor', 'column'], od: cursorAntes.column, oi: _this.posicaoCursor.column },
              { p: ['autor'], od: _this.usuario.id, oi: _this.usuario.id },
            ];

            _this.document.submitOp(op); // TODO: jogar para o service

            // tem que estar na ultima coluna    //

            if (
              ultimaColunaLinha != null &&
              ultimaColunaLinha == cursorAntes.column &&
              (e.browserEvent.key === 'Del' || e.browserEvent.keyCode == 46)
            ) {
              // Usar o delete no fim de uma linha (puxando o conteúdo de baixo para linha anterior)
              op = [
                { p: ['algoritmo', _this.posicaoCursor.lineNumber], ld: '' },
                {
                  p: ['cursor', 'lineNumber'],
                  od: cursorAntes.lineNumber,
                  oi: _this.posicaoCursor.lineNumber,
                },
                { p: ['cursor', 'column'], od: cursorAntes.column, oi: _this.posicaoCursor.column },
                { p: ['autor'], od: _this.usuario.id, oi: _this.usuario.id },
              ];

              _this.document.submitOp(op); // TODO: jogar para o service
            }

            op = null;
          }
        } else if (e.browserEvent.key === 'Enter' || e.browserEvent.keyCode == 13) {
          let primeiraParte = editor.getModel().getLineContent(editor.getPosition().lineNumber - 1);
          op = [
            {
              p: ['algoritmo', _this.posicaoCursor.lineNumber - 2],
              ld: textoAntes,
              li: primeiraParte,
            },
            {
              p: ['cursor', 'lineNumber'],
              od: cursorAntes.lineNumber,
              oi: _this.posicaoCursor.lineNumber,
            },
            { p: ['cursor', 'column'], od: cursorAntes.column, oi: _this.posicaoCursor.column },
            { p: ['autor'], od: _this.usuario.id, oi: _this.usuario.id },
          ];
          _this.document.submitOp(op); // TODO: jogar para o service

          op = [
            { p: ['algoritmo', _this.posicaoCursor.lineNumber - 1], li: texto },
            {
              p: ['cursor', 'lineNumber'],
              od: cursorAntes.lineNumber,
              oi: _this.posicaoCursor.lineNumber,
            },
            { p: ['cursor', 'column'], od: cursorAntes.column, oi: _this.posicaoCursor.column },
            { p: ['autor'], od: _this.usuario.id, oi: _this.usuario.id },
          ];

          _this.document.submitOp(op); // TODO: jogar para o service

          op = null;
        } else {
          op = [
            { p: ['algoritmo', _this.posicaoCursor.lineNumber - 1], ld: textoAntes, li: texto },
            {
              p: ['cursor', 'lineNumber'],
              od: cursorAntes.lineNumber,
              oi: _this.posicaoCursor.lineNumber,
            },
            { p: ['cursor', 'column'], od: cursorAntes.column, oi: _this.posicaoCursor.column },
            { p: ['autor'], od: _this.usuario.id, oi: _this.usuario.id },
          ];
        }

        let edicao = new Edicao(_this.posicaoCursor.lineNumber, texto);
        historicoEdicoes.inserir(edicao);
      }

      if (op != null) {
        _this.document.submitOp(op); // TODO: jogar para o service
        op = null;
      }
    });
  }

  visualizarExecucacao(modoVisualizacao, trace) {
    this.onVisualization.emit({
      modoVisualizacao: modoVisualizacao,
      trace: trace,
    });
  }

  voltarParaModoExecucao() {
    this.onVisualization.emit(false);
  }

  suspenderVisualizacao() {
    if (this.editor != null) {
      /* let decorations = this.editor.getModel().getAllDecorations();

      if(Array.isArray(decorations)){
        decorations.forEach(d=>{
          this.editor.deltaDecorations(d, []);
        })
      } */

      Editor.getInstance().decorations = this.editor.deltaDecorations(
        Editor.getInstance().decorations,
        []
      );
    }

    this.onVisualization.emit({
      modoVisualizacao: false,
      trace: null,
    });
  }

  visualizar(testCase) {
    const submissao = this.prepararSubmissao();
    const pageTrack = new PageTrackRecord(null, "visualizacao-algoritmo", this.login.getUsuarioLogado());
    pageTrack.save().subscribe(() => {});
    if (submissao.validar()) {
      this.processandoVisualizacao = true;
      
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };
      // TODO: definir um timedout
      const json = this.submissao.construirJsonVisualizacao(this.questao, testCase);

      this.http.post(this.URL + 'codigo/', json, httpOptions).subscribe(
        (resposta) => {
          if (TraceVisualizacao.possuiErro(String(resposta))) {
            this.processandoVisualizacao = false;
            this.messageService.add({
              severity: 'error',
              summary: 'Não é possível visualizar a execução',
              detail:
                'O seu algoritmo possui algum erro e por isso não é possível visualizar sua execução.',
            });
          } else {
            this.processandoVisualizacao = false;
            const padrao = /(.*?){.*"code"/gs;
            let re = new RegExp(padrao);
            let x = re.exec(String(resposta));
            if (Array.isArray(x) && x.length > 1) {
              const respostaParser: string = String(resposta).replace(x[1], '');

              this.visualizarExecucacao(true, JSON.parse(respostaParser)); // TODO:
            }
          }
        },
        (err) => {
          this.processandoVisualizacao = false;
          // this.prepararMensagemExceptionHttp(err);
        }
      );
    
    }else{
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail:
          'Não é possível executar o código, pois ele está vazio.',
      });
    }
  }

  executar() {
    // this.pausaIde = true; // TODO: esse código está comentado, pois a função de pausar a IDE durante o envio não está funcionando.

    const submissao = this.prepararSubmissao();

    if (submissao.validar()) {
      // this.submissao.analisarErros(); // TODO: esse código está comentado, pois a função de analisar os erros do estudante está com bugs.

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };

      /*
      Verificação antes da submissão do código para identificar erros.
      Não está sendo utilizada, pois está com problemas.
      Potencial para uso. */
      /*
      if (this.submissao.hasErrors()) {
        this.destacarErros(this.submissao);
        this.onError.emit(this.submissao);
      } else {*/
      const tipoExecucao = Editor.getTipoExecucao(this.questao);

      const json = submissao.construirJson(this.questao, tipoExecucao);

      const url = this.URL + 'codigo/';
      this.processandoSubmissao = true;

      this.http
        .post<any>(url, json, httpOptions)
        .pipe(timeout(30000))
        .subscribe({
          next: (resposta) => {
            submissao.processarRespostaServidor(resposta).subscribe((resultado) => {
              this.submissao = resultado;

              this.onSubmit.emit(this._submissao);
            });
          },
          error: (erro) => {
            // TODO: Jogar todo o erro para cima (quem chama esse component) e deixar que ele gerencie o Erro
            if (
              erro.name === 'TimeoutError' ||
              (erro.error != null && erro.error.mensagem == null)
            ) {
              this.onServidorError.emit(erro);
            } else {
              submissao.processarErroServidor(erro.error.mensagem).subscribe((resultado) => {
                this.submissao = resultado;

                this.onError.emit(this._submissao);
              });
            }

            this.processandoSubmissao = false;
          },
          complete: () => {
            this.processandoSubmissao = false;
          },
        });
    } else {
      this.processandoSubmissao = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail:
          'Não é possível executar o código, pois ele está vazio.',
      });
    }
  }

  /**
   * Constrói uma submissão que será salva no banco de dados.
   */
  prepararSubmissao() {
    this.editorCodigo.codigo = this.editor.getValue();
    const submissao = new Submissao(
      null,
      this.editor.getValue(),
      this.usuario,
      this.assunto,
      this.questao
    );
    return submissao;
  }

  enviarRespostaAtividadeGrupo() {
    if (this.atividadeGrupo == null && this.atividadeGrupo.pk() == null) {
      this.messageService.add({
        severity: 'error',
        summary: 'Falha ao enviar atividade',
        detail: 'Isso não parece ser uma atividade em grupo.',
      });
    }

    if (this.submissao == null || this.submissao.pk() == null) {
      this.messageService.add({
        severity: 'error',
        summary: 'Falha ao enviar atividade',
        detail:
          'Antes de entregar a atividade é preciso executar o seu código. Após isso tente novamente entregar a atividade',
      });
    }

    this.confirmationService.confirm({
      message: 'Somente é possível realizar uma entrega. Tem certeza?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        let submissaoGrupo = new SubmissaoGrupo(
          null,
          this.submissao,
          this.grupo,
          this.atividadeGrupo
        );
        submissaoGrupo.save().subscribe(() => {
          this.statusBtnEnvioAtividadeGrupo = true;

          /**
           * TODO: desabilitar o botão também para os outros usuários.
           */

          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Atividade entregue com sucesso.',
          });
        });
      },
    });
  }
}
