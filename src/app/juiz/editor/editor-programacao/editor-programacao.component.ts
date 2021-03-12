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

/**
 * Executa um javascript ide.js para acoplar o editor VStudio.
 */
// declare var editor: any;
declare var monaco: any;
declare var editorProgramacao: any;
declare function carregarIde(readOnly, callback, instance, callbackOnEditorLoad, codigo): any;
declare function atualizarDecorations(): any;

@Component({
  selector: 'app-editor-programacao',
  templateUrl: './editor-programacao.component.html',
  styleUrls: ['./editor-programacao.component.css'],
})
export class EditorProgramacaoComponent implements AfterViewInit, OnChanges, OnInit {
  URL = environment.URL;

  processandoSubmissao;

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

  constructor(
    private http: HttpClient,
    public login: LoginService,
    private confirmationService: ConfirmationService,
    private router: Router,
    public chat: ChatService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.onError = new EventEmitter();
    this.onSubmit = new EventEmitter();
    this.onVisualization = new EventEmitter();
    this.onServidorError = new EventEmitter();
    this.onEditorReady = new EventEmitter();
    this.processandoSubmissao = false;
    this.usuario = this.login.getUsuarioLogado();
    editorProgramacao = null;

    /**
     * TODO: verificar se já foi feita a submissão de atividade em grupo, se sim inicia como true.
     */

    this.statusBtnEnvioAtividadeGrupo = false;
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

    carregarIde(false, null, this, this.carregarEditor, this.editorCodigo.codigo);
  }

  visualizarResposta(questao) {
    this.confirmationService.confirm({
      message:
        'Se você visualizar a resposta dessa questão não ganhará pontos ao respondê-la. Tem certeza que deseja visualizar?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.router.navigate(['main', { outlets: { principal: ['exibir-codigo', questao.id] } }], {
          state: { questao: questao },
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
      /* 

editorProgramacaoComponentInstance.chat.iniciarConexao(editorProgramacaoComponentInstance.salaId, function(doc){

*/

      editorProgramacaoComponentInstance.chat.iniciarConexao(
        editorProgramacaoComponentInstance.atividadeGrupo.pk()
      );
      editorProgramacaoComponentInstance.chat.observerCodigo.subscribe((doc) => {
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

  sincronizarEditor(editor) {
    let _this = this;
    let textoAntes = '';
    let cursorAntes: any = {};
    let historicoEdicoes = new HistoricoEdicoes(null, this.atividadeGrupo, this.grupo, this.usuario);

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
      textoAntes = texto;
    });

    editor.onKeyUp(function (e) {
      _this.posicaoCursor = editor.getPosition();

      let texto = editor.getModel().getLineContent(editor.getPosition().lineNumber);
      let op = [
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

      _this.document.submitOp(op); // TODO: jogar para o service
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

  suspenderVisualizacao(){

    if(this.editor != null){

      /* let decorations = this.editor.getModel().getAllDecorations();

      if(Array.isArray(decorations)){
        decorations.forEach(d=>{
          this.editor.deltaDecorations(d, []);
        })
      } */

      Editor.getInstance().decorations = this.editor.deltaDecorations(Editor.getInstance().decorations, []);
      
    }
    

    this.onVisualization.emit({
      modoVisualizacao: false,
      trace: null,
    });
  }

  visualizar(status) {
    if (status) {
      this.prepararSubmissao();
      this.submissao.save().subscribe((resultado) => {
        this.submissao = resultado;
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        };
        // TODO: definir um timedout
        const json = this.submissao.construirJson(this.questao, 'visualização');

        this.http.post(this.URL + 'codigo/', json, httpOptions).subscribe(
          (resposta) => {
            if(TraceVisualizacao.possuiErro(String(resposta))){
              this.messageService.add({
                severity: 'error',
                summary: 'Não é possível visualizar a execução',
                detail: 'O seu algoritmo possui algum erro e por isso não é possível visualizar sua execução.',
              });
            }else{
              const padrao = /(.*?){.*"code"/gs
              let re = new RegExp(padrao);
              let x = re.exec(String(resposta))
              if(Array.isArray(x) && x.length > 1){
                const respostaParser: string = String(resposta).replace(x[1], '');


                this.visualizarExecucacao(true, JSON.parse(respostaParser)); // TODO:
              }
            }
            
            
          },
          (err) => {
            // this.prepararMensagemExceptionHttp(err);
          }
        );
      });
    } else {
      this.visualizarExecucacao(false, null);
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
        .pipe(timeout(20000))
        .subscribe({
          next: (resposta) => {
            submissao.processarRespostaServidor(resposta).subscribe((resultado) => {
              this.submissao = resultado;

              this.onSubmit.emit(this._submissao);
            });
          },
          error: (erro) => {
            // TODO: Jogar todo o erro para cima (quem chama esse component) e deixar que ele gerencie o Erro
            if (erro.name === 'TimeoutError' || erro.error.mensagem == null) {
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
      alert('Não há algoritmo a ser executado.');
    }
  }

  /**
   * Constrói uma submissão que será salva no banco de dados.
   */
  prepararSubmissao() {
    this.editorCodigo.codigo = this.editor.getValue();
    const submissao = new Submissao(null, this.editor.getValue(), this.usuario, this.assunto, this.questao);
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

    let submissaoGrupo = new SubmissaoGrupo(null, this.submissao, this.grupo, this.atividadeGrupo);
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
  }
}
