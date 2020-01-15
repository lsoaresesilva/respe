import { Component, OnInit, Input, Output, EventEmitter, AfterViewChecked } from '@angular/core';
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
export class EditorProgramacaoComponent implements OnInit {
  

  @Input()
  questao;
  @Input()
  assunto;
  @Input()
  liteMode; // define que o editor executará em um modo de aparência menor.
  @Input()
  modoVisualizacao;

  submissao;
  editorCodigo?: Editor;

  @Output()
  onError: EventEmitter<any>;
  @Output()
  onSubmit: EventEmitter<any>;
  @Output()
  onSubmitError: EventEmitter<any>;
  @Output()
  onVisualization: EventEmitter<any>;


  constructor(private http: HttpClient, public login: LoginService) {

    this.onError = new EventEmitter();
    this.onSubmit = new EventEmitter();
    this.onSubmitError = new EventEmitter();
    this.onVisualization = new EventEmitter();



  }


  ngOnInit() {


    this.editorCodigo = Editor.getInstance();
    this.editorCodigo.codigo.algoritmo = "";
    let usuario = this.login.getUsuarioLogado();
    carregarIde(false, null, null, this.editorCodigo.codigo.algoritmo);
    if (this.submissao != null) {
      this.editorCodigo.codigo.algoritmo = this.submissao["codigo"];
      if (editor != null)
        editor.setValue(this.editorCodigo.codigo.algoritmo);
    }
  }

  visualizarExecucacao(modoVisualizacao, trace) {
    this.onVisualization.emit({ modoVisualizacao: modoVisualizacao, trace:trace});
  }

  voltarParaModoExecucao() {
    this.onVisualization.emit(false);
  }

  visualizar(status) {
    if (status) {
      let submissao = this.prepararSubmissao()
      submissao.save().subscribe(resultado => {
        this.submissao = resultado;
        let httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        }
        // TODO: definir um timedout
        let json = submissao.construirJson(this.questao, "visualização");

        this.http.post("http://127.0.0.1:8000/codigo/", json, httpOptions).subscribe(resposta => {

          let respostaParser: string = String(resposta).replace("script str", "")
          
          this.visualizarExecucacao(true, JSON.parse(respostaParser)); // TODO:
        }, err => {
          //this.prepararMensagemExceptionHttp(err);
        });
      })
    }else{
      this.editorCodigo.limparCores();
      this.visualizarExecucacao(false, null);
    }



  }


  executar() {
    //this.pausaIde = true;

    let submissao = this.prepararSubmissao();

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    let _this = this;

    submissao.save().subscribe(resultado => {
      if (submissao.hasErrors()) {
        this.gerenciarErro(submissao);
      } else {
        let tipoExecucao = ""
        if (this.questao.testsCases.length != 0) {
          tipoExecucao = "testes"
        } else {
          tipoExecucao = "execução"
        }

        let json = submissao.construirJson(this.questao, tipoExecucao);

        let url = "http://127.0.0.1:8000/codigo/"
        this.http.post<any>(url, json, httpOptions).subscribe(resposta => { // TODO: mudar o endereço para o real
          let consultas = []
          if (tipoExecucao == "testes") {
            submissao.resultadosTestsCases = ResultadoTestCase.construir(resposta.resultados);
          }

          submissao.saida = resposta.saida

          submissao.save().subscribe(resultado => { // salva novamente, pois agora há dados sobre os resultadosTestsCases
            this.submissao = resultado;

          })


          this.editorCodigo.limparCores();
          this.submissao = submissao;

          this.onSubmit.emit(this.submissao);

        }, err => {


          submissao.invalidar();
          submissao.save().subscribe(resultado => {
            this.onSubmitError.emit(err);
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
  prepararSubmissao(): Submissao {
    this.editorCodigo.codigo.setAlgoritmo(editor.getValue());
    let submissao = new Submissao(null, this.editorCodigo.codigo, this.login.getUsuarioLogado(), this.questao);
    submissao.analisarErros();
    return submissao;
  }

  /**
   * Salva o código do estudante automaticamente a cada 5 minutos.
   */
  salvarAutomaticamente() {
    let __this = this;
    setInterval(function () {
      let submissao = __this.prepararSubmissao();
      submissao.save().subscribe(resultado => {
        // TODO: mostrar mensagem que o código foi salvo automaticamente.
      });

    }, 300000)
  }

  gerenciarErro(submissao) {
    this.onError.emit(submissao);
    this.editorCodigo.limparCores();
    this.editorCodigo.destacarErros(submissao.erros);
  }

}
