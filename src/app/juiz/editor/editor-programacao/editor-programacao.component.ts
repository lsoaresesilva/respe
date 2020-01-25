import { Component, OnInit, Input, Output, EventEmitter, AfterViewChecked, AfterViewInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Tutor } from 'src/app/model/tutor';
import Submissao from 'src/app/model/submissao';
import Editor from 'src/app/model/editor';
import ResultadoTestCase from 'src/app/model/resultadoTestCase';
import { LoginService } from 'src/app/login-module/login.service';

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
    if(this.questao != null && this.questao.algoritmoInicial != null){
      this.editorCodigo.codigo = this.questao.algoritmoInicial.join("\n");
    }else{
      this.editorCodigo.codigo = ""
    }
    
    let usuario = this.login.getUsuarioLogado();
    carregarIde(false, null, null, this.editorCodigo.codigo);
    
  }


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
    //this.pausaIde = true;

    this.prepararSubmissao();

    this.submissao.analisarErros();

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    let _this = this;

    this.submissao.save().subscribe(resultado => {
      this.onSubmit.emit(this._submissao);
      this.submissao = resultado;
      if (this.submissao.hasErrors()) {
        this.destacarErros(this.submissao);
        this.onError.emit(this.submissao);
      } else {
        let tipoExecucao = ""
        if (this.questao.testsCases.length != 0) {
          tipoExecucao = "testes"
        } else {
          tipoExecucao = "execução"
        }

        let json = this.submissao.construirJson(this.questao, tipoExecucao);

        let url = "http://127.0.0.1:8000/codigo/"
        this.http.post<any>(url, json, httpOptions).subscribe(resposta => { // TODO: mudar o endereço para o real
          
          this.submissao.limparErroServidor();

          if (tipoExecucao == "testes") {
            this.submissao.resultadosTestsCases = ResultadoTestCase.construir(resposta.resultados);
          }

          this.submissao.saida = resposta.saida

          this.submissao.save().subscribe(resultado => { // salva novamente, pois agora há dados sobre os resultadosTestsCases
            this.submissao = resultado;
            this.onSubmit.emit(this._submissao);
          })


          this.editorCodigo.limparCores();

          

        }, err => {


          this.submissao.invalidar();
          this.submissao.incluirErroServidor(err);
          this.submissao.save().subscribe(resultado => {
            this.submissao = resultado;
            this.onSubmit.emit(this._submissao);
            if (err.name != "HttpErrorResponse"){
              this.destacarErros(this.submissao);
            }
            
          })

        }, () => {
          //_this.pausaIde = false;
        })

      }
    })

  }

  /**
   * Constrói uma submissão que será salva no banco de dados.
   */
  prepararSubmissao() {

    this.editorCodigo.codigo = editor.getValue();

    if(this.submissao == null){
      this.submissao = new Submissao(null, editor.getValue(), this.login.getUsuarioLogado(), this.questao)
    }else{
      this.submissao.codigo = this.editorCodigo.codigo;
      this.submissao.questao = this.questao;
      this.submissao.estudante = this.login.getUsuarioLogado();
    }
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
