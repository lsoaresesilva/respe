import { Component, OnInit } from '@angular/core';
import Editor from 'src/app/model/editor';
import Estudante from 'src/app/model/estudante';
import { Questao } from 'src/app/model/questao';
import Submissao from 'src/app/model/submissao';
import { Tutor } from 'src/app/model/tutor';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import ResultadoTestCase from 'src/app/model/resultadoTestCase';
import { forkJoin } from 'rxjs';
import Usuario from 'src/app/model/usuario';
import { Linha } from 'src/app/model/linha';
import { ActivatedRoute, Router } from '@angular/router';
import Query from 'src/app/model/firestore/query';
import PedidoAjuda from 'src/app/model/pedidoAjuda';
import { Util } from 'src/app/model/util';
import { Assunto } from 'src/app/model/assunto';
import { LoginService } from '../login.service';

declare var editor: any;
declare function carregarIde(readOnly, callback, instance, codigo): any;

@Component({
  selector: 'editor-programacao',
  templateUrl: './editor-programacao.component.html',
  styleUrls: ['./editor-programacao.component.css']
})
export class EditorProgramacaoComponent implements OnInit {

  assunto;
  editorCodigo?: Editor;
  pausaIde;
  erroLinguagemProgramacao;
  questao?;
  statusExecucao;
  resultadosTestsCases;
  modoVisualizacao: boolean = false;
  submissao;
  dialogPedirAjuda: boolean = false;
  duvida: string = "";

  // TODO: mover para um componente próprio
  traceExecucao;


  constructor(private http: HttpClient, private route: ActivatedRoute, private login: LoginService,private router:Router) {
    this.pausaIde = true;
    this.erroLinguagemProgramacao = "";
    this.statusExecucao = "";

  }

  /**
   * Salva o código do estudante automaticamente a cada 2 minutos.
   */
  salvarAutomaticamente() {
    let __this = this;
    setInterval(function () {
      let submissao = __this.prepararSubmissao();
      submissao.save().subscribe(resultado => {
        // TODO: mostrar mensagem que o código foi salvo automaticamente.
      });

    }, 120000)
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      if (params["assuntoId"] != undefined && params["questaoId"] != undefined) {
        Assunto.get(params["assuntoId"]).subscribe(assunto => {
          this.assunto = assunto;
          if (assunto["questoesProgramacao"] != undefined && assunto["questoesProgramacao"].length > 0) {
            assunto["questoesProgramacao"].forEach(questao => {
              if (questao.id == params["questaoId"]) {
                this.questao = questao;
              }
            })

            if (this.questao == undefined) {
              throw new Error("Não é possível iniciar o editor sem uma questão.");
            } else {
              this.editorCodigo = Editor.getInstance();

              // TODO: pegar a última submissão para uma questão
              let usuario = this.login.getUsuarioLogado();
              if (usuario != null) {
                Submissao.getRecentePorQuestao(this.questao, usuario).subscribe(submissao => {

                  this.submissao = submissao;


                  let codigo = "";
                  if (submissao != null)
                    codigo = submissao["codigo"];

                  carregarIde(false, null, null, codigo);
                  this.pausaIde = false;
                })
              }
            }
          }
        })
      } else {
        throw new Error("Não é possível iniciar o editor sem uma questão.");
      }
    })

    let estudante = this.login.getUsuarioLogado(); // TODO: pegar do login
    if (estudante == null) {
      throw new Error("Não é possível executar o código, pois você não está logado."); // TODO: mudar para o message
    }

    //this.salvarAutomaticamente(); # desabilitado temporariamente

  }

  /**
   * Constrói uma submissão que será salva no banco de dados.
   */
  prepararSubmissao(): Submissao {
    this.editorCodigo.codigo.setAlgoritmo(editor.getValue());
    let submissao = new Submissao(null, this.editorCodigo.codigo, this.login.getUsuarioLogado(), this.questao);
    return submissao;
  }

  construirJson(submissao, tipo ){
    let json = {}
    json["submissao"] = submissao.objectToDocument();
    json["tipo"] = tipo;
    json["assunto"] = this.assunto.objectToDocument();
    json["questao"] = this.questao;

    return json;
  }

  prepararMensagemErros(erros) {
    this.erroLinguagemProgramacao = ""
    this.editorCodigo.limparCores();
    if (erros != undefined && erros.length > 0) {
      erros.forEach(erro => {
        this.erroLinguagemProgramacao += erro.mensagem + "<br>";
        this.editorCodigo.destacarLinha(erro.linha, "erro");
      });
    }
  }

  executar() {
    this.pausaIde = true;

    let submissao = this.prepararSubmissao();

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    let _this = this;

    
    let tutor = new Tutor(submissao);
    tutor.analisar();

    /*
    let _this = this;

        setTimeout(function () {
          _this.pausaIde = false;
        }, 10000)
    */

    if (tutor.hasErrors()) {
      tutor.salvarErros().subscribe(resultados => {
        // TODO: deve fazer um resultadoTestCase falso.
        this.prepararMensagemErros(tutor.erros);
        this.pausaIde = false;

      })
    } else {
      let json = this.construirJson(submissao, "execução");
      submissao.save().subscribe(resultado => {
        this.http.post<any>("http://127.0.0.1:8000/codigo/", json, httpOptions).subscribe(resposta => { // TODO: mudar o endereço para o real
          let consultas = []
          submissao.resultadosTestsCases = ResultadoTestCase.construir(resposta.resultados);
          submissao.save().subscribe(resultado => {
            this.submissao = resultado;
  
          })
  
          this.erroLinguagemProgramacao = "";
          this.editorCodigo.limparCores();
          this.submissao = submissao;
  
  
  
        }, err => {
  
          this.prepararMensagemExceptionHttp(err);
  
  
        }, () => {
          _this.pausaIde = false;
        })
      });
    }

  }

  prepararMensagemExceptionHttp(erro) {
    if (erro.name == "HttpErrorResponse" && erro.status == 0) {
      this.erroLinguagemProgramacao = "O servidor está fora do ar."
    } else if (erro.status == 500 && erro.error != undefined) {
      this.erroLinguagemProgramacao = erro.error.erro;
    }
  }

  prepararStatus(status) {
    let textoStatus = "<span class='textoStatus'>Status</span> "
    if (!status)
      this.statusExecucao = textoStatus + "<span class='statusErro'>Erro</span>";
    else
      this.statusExecucao = textoStatus + "<span class='statusSucesso'>Sucesso</span>";
  }

  atualizarLinhaEditor(linha) {
    this.editorCodigo.limparCores();
    this.editorCodigo.destacarLinha(linha, "possivelSolucao");
  }

  visualizarExecucacao() {
    let submissao = this.prepararSubmissao()
    submissao.save().subscribe(resultado => {
      this.submissao = resultado;
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
      // TODO: definir um timedout
      let json = this.construirJson(submissao, "visualização");

      this.http.post<any>("http://127.0.0.1:8000/codigo/", json, httpOptions).subscribe(resposta => {

        resposta = resposta.replace("script str", "")

        let jsonTrace = JSON.parse(resposta);
        this.traceExecucao = jsonTrace;
        this.modoVisualizacao = true;
        this.erroLinguagemProgramacao = "";
      }, err => {
        this.prepararMensagemExceptionHttp(err);
      });
    })


  }

  voltarParaModoExecucao() {
    this.editorCodigo.limparCores();
    this.modoVisualizacao = false;
  }

  pedirAjuda() {
    this.dialogPedirAjuda = true;
  }

  enviarPedidoDeAjuda() {
    let pedidoAjuda = new PedidoAjuda(null, this.submissao, this.duvida, []);

    if (pedidoAjuda.validar()) {
      pedidoAjuda.save().subscribe(resultado => {
        // TODO: usar o message service para mensagem de sucesso
      }, err => {
        // TODO: usar o message service para mensagem de erro
      });
    } else {
      alert('Preencha todos os campos se quiser realizar salvar o planejamento'); // TODO: usar o message service
    }

  }

  listarSubmissao(){
    this.router.navigate(["main", { outlets: { principal: ['estudantes-questao',this.assunto.id, this.questao.id] } } ] );
  }


  visualizarCodigoSimilar(questao){
    this.router.navigate(["main", { outlets: { principal: ['exibir-codigo',questao.id] } } ] );
  }
}