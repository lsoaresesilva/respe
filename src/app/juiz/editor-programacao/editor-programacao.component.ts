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
import { ActivatedRoute } from '@angular/router';
import Query from 'src/app/model/firestore/query';

declare var editor: any;
declare function carregarIde(readOnly, callback, instance, codigo): any;

@Component({
  selector: 'editor-programacao',
  templateUrl: './editor-programacao.component.html',
  styleUrls: ['./editor-programacao.component.css']
})
export class EditorProgramacaoComponent implements OnInit {

  editorCodigo?: Editor;
  pausaIde;
  erroLinguagemProgramacao;
  questao?;
  statusExecucao;
  resultadosTestsCases;
  modoVisualizacao: boolean = false;
  submissao;

  // TODO: mover para um componente próprio
  traceExecucao;


  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.pausaIde = true;
    this.erroLinguagemProgramacao = "";
    this.statusExecucao = "";
    // TODO: passar a questão pela rota





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
      if (params["id"] != undefined) {
        Questao.get(params["id"]).subscribe(questao => {
          this.questao = questao;
          this.editorCodigo = Editor.getInstance();

          // TODO: pegar a última submissão para uma questão
          let usuario = Usuario.getUsuarioLogado();
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





        })
      } else {
        throw new Error("Não é possível iniciar o editor sem uma questão.");
      }
    })

    let estudante = Usuario.getUsuarioLogado(); // TODO: pegar do login
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
    let submissao = new Submissao(null, this.editorCodigo.codigo, Usuario.getUsuarioLogado(), this.questao);
    return submissao;
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

  getResultadosTestsCases(submissao) {
    //ResultadoTestCase.getAll(new Query("))
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

    let request = submissao.objectToDocument();
    request["tipo"] = "execução";

    this.http.post<any>("http://127.0.0.1:8000/codigo/", request, httpOptions).subscribe(resposta => { // TODO: mudar o endereço para o real
      let consultas = []
      submissao.resultadosTestsCases = ResultadoTestCase.construir(resposta.resultados);
      submissao.save().subscribe(resultado => {
        let tutor = new Tutor(submissao);
        tutor.analisar();

        tutor.salvarErros().subscribe(resultados => {
          if (tutor.hasErrors()) {
            this.prepararMensagemErros(tutor.erros);
            this.pausaIde = false;
          } else {

            let _this = this;

            setTimeout(function () {
              _this.pausaIde = false;
            }, 10000)


            // TODO: definir um timedout para, caso a requisiçõa não tenha uma resposta, interromper a execução.


          }
        })
      })

      this.erroLinguagemProgramacao = "";
      this.submissao = submissao;



    }, err => {
      this.prepararMensagemExceptionHttp(err);
    }, () => {
      _this.pausaIde = false;
    })



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

  salvarSubmissao(){
    this.editorCodigo.codigo.setAlgoritmo(editor.getValue());
    let submissao = this.prepararSubmissao();
    return submissao.save();
  }


  visualizarExecucacao() {

    this.salvarSubmissao().subscribe(resultado => {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
      // TODO: definir um timedout

      let request = submissao.objectToDocument();
      request["tipo"] = "visualização";

      this.http.post<any>("http://127.0.0.1:8000/codigo/", request, httpOptions).subscribe(resposta => {

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
}
