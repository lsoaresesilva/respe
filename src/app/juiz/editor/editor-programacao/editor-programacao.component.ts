import { Component, OnInit, Input, Output, EventEmitter, AfterViewChecked, AfterViewInit } from '@angular/core';
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
declare var editor: any;
declare function carregarIde(readOnly, callback, instance, codigo): any;

@Component({
  selector: 'app-editor-programacao',
  templateUrl: './editor-programacao.component.html',
  styleUrls: ['./editor-programacao.component.css']
})
export class EditorProgramacaoComponent implements AfterViewInit {

  ngAfterViewInit(): void {

    this.editorCodigo = Editor.getInstance();
    if (this.questao != null && this.questao.algoritmoInicial != null) {
      this.editorCodigo.codigo = this.questao.algoritmoInicial.join("\n");
    } else {
      this.editorCodigo.codigo = ""
    }

    let usuario = this.login.getUsuarioLogado();
    carregarIde(false, null, null, this.editorCodigo.codigo);

  }

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
    if (this._submissao != null) {
      this.editorCodigo.codigo = this._submissao["codigo"];
      if (editor != null)
        editor.setValue(this.editorCodigo.codigo);
    }

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
  onVisualization: EventEmitter<any>;


  constructor(private http: HttpClient, public login: LoginService) {
    this.onError = new EventEmitter();
    this.onSubmit = new EventEmitter();
    this.onVisualization = new EventEmitter();
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

        this.http.post("http://127.0.0.1:8000/codigo/", json, httpOptions).subscribe(resposta => {

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



      /*if (this.submissao.hasErrors()) {
        this.destacarErros(this.submissao);
        this.onError.emit(this.submissao);
      } else {*/
      let tipoExecucao = Editor.getTipoExecucao(this.questao);

      let json = submissao.construirJson(this.questao, tipoExecucao);

      let url = "http://127.0.0.1:8000/codigo/"
      this.http.post<any>(url, json, httpOptions).subscribe(resposta => { // TODO: mudar o endereço para o real


        submissao.processarRespostaServidor(resposta).subscribe(resultado => {
          this.submissao = resultado;
          this.onSubmit.emit(this._submissao);
          this.editorCodigo.limparCores();
        })

      }, err => {

        // Construir objeto Console
        // TODO: Fazer algo se for servidor fora do ar
        if (err.error.mensagem == null) {

        } else {
          submissao.processarErroServidor(err.error.mensagem).subscribe(resultado => {

            this.submissao = resultado;
            this.destacarErros(this.submissao);
            this.onError.emit(this._submissao);
          })
        }



      }, () => {
        //_this.pausaIde = false;
      })

      //}

    }else{
      alert("Não há algoritmo a ser executado.")
    }



  }

  /**
   * Constrói uma submissão que será salva no banco de dados.
   */
  prepararSubmissao() {

    this.editorCodigo.codigo = editor.getValue();
    let submissao = new Submissao(null, editor.getValue(), this.login.getUsuarioLogado(), this.questao)
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
