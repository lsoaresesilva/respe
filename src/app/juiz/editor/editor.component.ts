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
  questao;

  uploadSubmissao;

  constructor(private http: HttpClient) {
    this.statusExecucao = "";
    Questao.get("LwC2ItAVtfkDhcE9jvpT").subscribe(questao => {
      this.questao = questao;
    })

    this.uploadSubmissao = false;
  }

  ngOnInit() {
    this.editorCodigo = Editor.getInstance();

    carregarIde();
  }

  executar() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    this.editorCodigo.codigo.setAlgoritmo(editor.getValue());
    this.uploadSubmissao = true;

    // TODO: pegar usuário logado
    let estudante = new Estudante("12345");


    let submissao = new Submissao(this.editorCodigo.codigo, estudante, this.questao);

    // TODO: definir um timedout

    ParseError.variavelNaoDeclarada(this.editorCodigo.codigo);

    let p: ParseError = new ParseError(this.editorCodigo.codigo);
    if (p.hasError()) {
      console.log(p.mensagem());
    } else {
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
        this.erroSimplificado = err.error.erro;
      }, () => {
        this.uploadSubmissao = false;
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