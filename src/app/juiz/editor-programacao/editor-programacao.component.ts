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

declare var editor: any;
declare function carregarIde(readOnly): any;

@Component({
  selector: 'editor-programacao',
  templateUrl: './editor-programacao.component.html',
  styleUrls: ['./editor-programacao.component.css']
})
export class EditorProgramacaoComponent implements OnInit {

  editorCodigo?: Editor;
  uploadCodigo;
  erroLinguagemProgramacao;
  questao;
  statusExecucao;
  resultadosTestsCases;
  modoVisualizacao:boolean = false;

  // TODO: mover para um componente próprio
  traceExecucao;


  constructor(private http: HttpClient, private route:ActivatedRoute) { 
    this.erroLinguagemProgramacao = "";
    this.statusExecucao = "";
    // TODO: passar a questão pela rota

    this.route.params.subscribe(params=>{
      if(params["id"] != undefined){
        Questao.get(params["id"]).subscribe(questao => {
          this.questao = questao;
        })
      }
    })
    
    this.uploadCodigo = false;

  }

  ngOnInit() {

    this.editorCodigo = Editor.getInstance();

    carregarIde(false);

    //this.atualizar();
  }

  

  mouseMove(event){
    
    
    //let linha = event.target.position.linha;
    // SE mouse estiver na área do editor mostrar div;
    // Mo Y do div a partir da linha

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

    this.editorCodigo.codigo.setAlgoritmo(editor.getValue());
    this.uploadCodigo = true;

    let estudante = new Estudante("12345", null, null, null, null); // TODO: pegar do login
    let questao = new Questao("LwC2ItAVtfkDhcE9jvpT", null, null, null, null, null, null, null);
    let submissao = new Submissao(null, this.editorCodigo.codigo, estudante, questao)

    let tutor = new Tutor(submissao);
    submissao.save().subscribe(resultado => {
      tutor.analisar();

      tutor.salvarErros().subscribe(resultados => {
        if (tutor.hasErrors()) {
          this.prepararMensagemErros(tutor.erros);
          this.uploadCodigo = false;
        } else {

          let _this = this;

          setTimeout(function () {
            _this.uploadCodigo = false;
          }, 10000)

          let httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            })
          }

          // TODO: pegar usuário logado



          // TODO: definir um timedout

          this.http.post<any>("http://127.0.0.1:8000/codigo/", submissao.objectToDocument(), httpOptions).subscribe(resposta => {



            let consultas = []
            this.resultadosTestsCases = []
            for (let i = 0; i < resposta.resultados.length; i++) {
              let consulta = ResultadoTestCase.get(resposta.resultados[i].id);
              consultas.push(consulta);

            }

            forkJoin(consultas).subscribe(resultados => {

              for (let i = 0; i < resultados.length; i++) {
                this.resultadosTestsCases.push(resultados[i]);
              }
            })
          }, err => {
            console.log(err); // TODO jogar em variável
          }, () => {
            _this.uploadCodigo = false;
          })
        }
      })
    })
  }

  prepararStatus(status) {
    let textoStatus = "<span class='textoStatus'>Status</span> "
    if (!status)
      this.statusExecucao = textoStatus + "<span class='statusErro'>Erro</span>";
    else
      this.statusExecucao = textoStatus + "<span class='statusSucesso'>Sucesso</span>";
  }

  atualizarLinhaEditor(linha){
    this.editorCodigo.limparCores();
    this.editorCodigo.destacarLinha(linha, "possivelSolucao");
  }

  
  visualizarExecucacao(){

    this.editorCodigo.codigo.setAlgoritmo(editor.getValue());
    let submissao = new Submissao(null, this.editorCodigo.codigo.algoritmo, Usuario.getUsuarioLogado(), this.questao)

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    // TODO: definir um timedout

    this.http.post<any>("http://127.0.0.1:8000/visualizar-execucao/", submissao.objectToDocument(), httpOptions).subscribe(resposta => {

      resposta = resposta.replace("script str", "")

      let jsonTrace = JSON.parse(resposta);
      this.traceExecucao = jsonTrace;
      this.modoVisualizacao = true;
    }, err=>{
      alert("O código apresenta erros de sintaxe:"+err.error.erro) // TODO: melhorar isso.
    });
  }

  voltarParaModoExecucao(){
    this.editorCodigo.limparCores();
    this.modoVisualizacao = false;
  }
}
