import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import Editor from '../../model/editor';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Submissao from 'src/app/model/submissao';
import Estudante from 'src/app/model/estudante';
import { Questao } from 'src/app/model/questao';
import ResultadoTestCase from 'src/app/model/resultadoTestCase';
import { forkJoin } from 'rxjs';
import PythonInterpreter from 'src/app/model/pythonInterpreter';
import { ParseError } from 'src/app/model/parseError';
import { Tutor } from 'src/app/model/tutor';


declare var editor: any;
declare function carregarIde(): any;


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EditorComponent implements OnInit {

  @ViewChild('output') myDiv: ElementRef;

  editorCodigo?: Editor;
  statusExecucao;
  erroSimplificado;
  resultadosTestsCases;
  erroLinguagemProgramacao;
  questao;
  uploadCodigo;

  constructor(private http: HttpClient) {
    this.erroLinguagemProgramacao = ""
    this.statusExecucao = "";
    Questao.get("LwC2ItAVtfkDhcE9jvpT").subscribe(questao => {
      this.questao = questao;
    })

    this.uploadCodigo = false;
  }

  ngOnInit() {
    this.editorCodigo = Editor.getInstance();

    carregarIde();
  }

  prepararMensagemErros(erros){
    this.erroLinguagemProgramacao = ""
    this.editorCodigo.limparCores();
    if(erros != undefined && erros.length > 0){
      erros.forEach(erro=>{
        this.erroLinguagemProgramacao += erro.mensagem+"<br>";
        this.editorCodigo.destacarLinha(erro.linha, "erro");
      });
    }
  }



  executar() {
    
    this.editorCodigo.codigo.setAlgoritmo(editor.getValue());
    this.uploadCodigo = true;

    let tutor = new Tutor(this.editorCodigo.codigo)
    tutor.analisar();
    if (tutor.hasErrors()) {
      this.prepararMensagemErros(tutor.erros);
      this.uploadCodigo = false;
    } else {

      let _this = this;

      setTimeout(function(){
        _this.uploadCodigo = false;
      }, 10000)

      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }

      // TODO: pegar usuário logado
      let estudante = new Estudante("12345");
      let submissao = new Submissao(this.editorCodigo.codigo, estudante, this.questao);

      
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





  }

  prepararStatus(status) {
    let textoStatus = "<span class='textoStatus'>Status</span> "
    if (!status)
      this.statusExecucao = textoStatus + "<span class='statusErro'>Erro</span>";
    else
      this.statusExecucao = textoStatus + "<span class='statusSucesso'>Sucesso</span>";
  }
















}