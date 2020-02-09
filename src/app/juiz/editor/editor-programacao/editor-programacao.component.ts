import { Component, OnInit, Input, Output, EventEmitter, AfterViewChecked, AfterViewInit, OnChanges } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Tutor } from 'src/app/model/tutor';
import Submissao from 'src/app/model/submissao';
import Editor from 'src/app/model/editor';
import ResultadoTestCase from 'src/app/model/resultadoTestCase';
import { LoginService } from 'src/app/login-module/login.service';
import { ErroCompilacao } from 'src/app/model/errors/analise-compilacao/erroCompilacao';
import ErroCompilacaoFactory from 'src/app/model/errors/analise-compilacao/erroCompilacaoFactory';

/**
 * Executa um javascript ide.js para acoplar o editor VStudio.
 */
//declare var editor: any;
declare var monaco: any;
declare function carregarIde(readOnly, callback, instance, callbackOnEditorLoad, codigo): any;

@Component({
  selector: 'app-editor-programacao',
  templateUrl: './editor-programacao.component.html',
  styleUrls: ['./editor-programacao.component.css']
})
export class EditorProgramacaoComponent implements AfterViewInit, OnChanges {
  

  URL = "http://35.208.64.26:8000/";
  //URL = "http://localhost:8000/"
  
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


  constructor(private http: HttpClient, public login: LoginService) {
    this.onError = new EventEmitter();
    this.onSubmit = new EventEmitter();
    this.onVisualization = new EventEmitter();
    this.onServidorError = new EventEmitter();
    this.processandoSubmissao = false;
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.atualizarEditorComSubmissao();
  }

  ngAfterViewInit(): void {

    this.editorCodigo = Editor.getInstance();
    if (this.questao != null && this.questao.algoritmoInicial != null && this.questao.algoritmoInicial != "" &&
        Array.isArray(this.questao.algoritmoInicial)) {
      this.editorCodigo.codigo = this.questao.algoritmoInicial.join("\n");
    } else {
      this.editorCodigo.codigo = ""
    }

    let usuario = this.login.getUsuarioLogado();
    carregarIde(false, null, this, this.carregarEditor, this.editorCodigo.codigo);

  }

  atualizarEditorComSubmissao(){
    if (this._submissao != null) {
      this.editorCodigo.codigo = this._submissao["codigo"];
      if (this.editor != null)
        this.editor.setValue(this.editorCodigo.codigo);
    }
  }

  carregarEditor(editorProgramacaoComponentInstance, editor){
    editorProgramacaoComponentInstance.editor = editor;
    editorProgramacaoComponentInstance.atualizarEditorComSubmissao();
  }

  visualizarExecucacao(modoVisualizacao, trace) {
    this.onVisualization.emit({ modoVisualizacao: modoVisualizacao, trace: trace });
  }

  voltarParaModoExecucao() {
    this.onVisualization.emit(false);
  }

  visualizar(status) {
    if (status) {
      this.prepararSubmissao()
      this.submissao.save().subscribe(resultado => {
        this.submissao = resultado;
        let httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        }
        // TODO: definir um timedout
        let json = this.submissao.construirJson(this.questao, "visualização");

        this.http.post(this.URL+"codigo/", json, httpOptions).subscribe(resposta => {

          let respostaParser: string = String(resposta).replace("script str", "")

          this.visualizarExecucacao(true, JSON.parse(respostaParser)); // TODO:
        }, err => {
          //this.prepararMensagemExceptionHttp(err);
        });
      })
    } else {
      this.editorCodigo.limparCores();
      this.visualizarExecucacao(false, null);
    }

  }


  executar() {
    //this.pausaIde = true; // TODO: esse código está comentado, pois a função de pausar a IDE durante o envio não está funcionando.

    let submissao = this.prepararSubmissao();

    if (submissao.validar()) {
      //this.submissao.analisarErros(); // TODO: esse código está comentado, pois a função de analisar os erros do estudante estão com bugs.

      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }

      /*var decorations = editor.deltaDecorations([], [
        { range: new monaco.Range(1,1,1,16), options: { isWholeLine: true, linesDecorationsClassName: 'erro' }},
    ]);*/ // TIrar daqui, apenas foi um teste


      /*if (this.submissao.hasErrors()) {
        this.destacarErros(this.submissao);
        this.onError.emit(this.submissao);
      } else {*/
      let tipoExecucao = Editor.getTipoExecucao(this.questao);

      let json = submissao.construirJson(this.questao, tipoExecucao);

      let url = this.URL+"codigo/"
      this.processandoSubmissao = true;
      this.http.post<any>(url, json, httpOptions).subscribe(resposta => { // TODO: mudar o endereço para o real

        
        submissao.processarRespostaServidor(resposta).subscribe(resultado => {
          this.submissao = resultado;
          this.onSubmit.emit(this._submissao);
          this.editorCodigo.limparCores();
        })

      }, err => {
        if (err.error.mensagem == null) {
          this.onServidorError.emit(err);
        } else {
          submissao.processarErroServidor(err.error.mensagem).subscribe(resultado => {

            this.submissao = resultado;
            this.destacarErros(this.submissao);
            this.onError.emit(this._submissao);
          })
        }



      }, () => {
        this.processandoSubmissao = false;
      })

      //}

    }else{
      this.processandoSubmissao = false;
      alert("Não há algoritmo a ser executado.")
    }



  }

  /**
   * Constrói uma submissão que será salva no banco de dados.
   */
  prepararSubmissao() {

    this.editorCodigo.codigo = this.editor.getValue();
    let submissao = new Submissao(null, this.editor.getValue(), this.login.getUsuarioLogado(), this.questao)
    return submissao;
  }

  /**
   * Salva o código do estudante automaticamente a cada 5 minutos.
   * OBS: Não está em uso, será refatorado para evitar overhead no BD.
   */
  salvarAutomaticamente() {
    let __this = this;
    setInterval(function () {
      __this.prepararSubmissao();
      this.submissao.save().subscribe(resultado => {
        // TODO: mostrar mensagem que o código foi salvo automaticamente.
      });

    }, 300000)
  }

  destacarErros(erros) {

    this.editorCodigo.limparCores();
    this.editorCodigo.destacarErros(this.submissao.erros);
  }


}
