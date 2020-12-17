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

import { catchError, retry, timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

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
export class EditorProgramacaoComponent implements AfterViewInit, OnChanges {
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

  usuario;

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

  constructor(
    private http: HttpClient,
    public login: LoginService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {
    this.onError = new EventEmitter();
    this.onSubmit = new EventEmitter();
    this.onVisualization = new EventEmitter();
    this.onServidorError = new EventEmitter();
    this.processandoSubmissao = false;
    this.usuario = this.login.getUsuarioLogado();
    editorProgramacao = null;
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
    editorProgramacaoComponentInstance.atualizarEditorComSubmissao();
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
            const respostaParser: string = String(resposta).replace('script str', '');

            this.visualizarExecucacao(true, JSON.parse(respostaParser)); // TODO:
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

      /*if (this.submissao.hasErrors()) {
        this.destacarErros(this.submissao);
        this.onError.emit(this.submissao);
      } else {*/
      const tipoExecucao = Editor.getTipoExecucao(this.questao);

      const json = submissao.construirJson(this.questao, tipoExecucao);

      const url = this.URL + 'codigo/';
      this.processandoSubmissao = true;

      this.http
        .post<any>(url, json, httpOptions)
        .pipe(timeout(10000))
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
    const submissao = new Submissao(null, this.editor.getValue(), this.usuario, this.questao);
    return submissao;
  }

  /**
   * Salva o código do estudante automaticamente a cada 5 minutos.
   * OBS: Não está em uso, será refatorado para evitar overhead no BD.
   */
  salvarAutomaticamente() {
    const __this = this;
    setInterval(function () {
      __this.prepararSubmissao();
      this.submissao.save().subscribe((resultado) => {
        // TODO: mostrar mensagem que o código foi salvo automaticamente.
      });
    }, 300000);
  }
}
