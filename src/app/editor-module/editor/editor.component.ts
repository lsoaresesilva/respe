import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import Editor from '../../model/editor';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Submissao from 'src/app/model/submissao';
import Estudante from 'src/app/model/estudante';
import { Questao } from 'src/app/model/questao';
import ResultadoTestCase from 'src/app/model/resultadoTestCase';
import { forkJoin } from 'rxjs';


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

  constructor(private http: HttpClient) {
    this.statusExecucao = "";
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
    //console.log(this.editorCodigo.codigo.paraJson())

    // TODO: pegar usuário logado
    let estudante = new Estudante("12345");
    
    // TODO: pegar questão pela rota
    let questao = new Questao("Ozwt1Hrmz7b8tlFwjDVW", null, null, null, null, null, null);
    let submissao = new Submissao(this.editorCodigo.codigo, estudante, questao);

    

    this.http.post<any>("http://127.0.0.1:8000/codigo/", submissao.objectToDocument(), httpOptions).subscribe(resposta=>{
      
      let consultas = []
      this.resultadosTestsCases = []
      for(let i = 0; i < resposta.resultados.length; i++){
        let consulta = ResultadoTestCase.get(resposta.resultados[i].id);
        consultas.push(consulta);
        
      }

      forkJoin(consultas).subscribe(resultados=>{
        
        for(let i = 0; i < resultados.length; i++){
            this.resultadosTestsCases.push(resultados[i]);
        }
      })
    }, err=>{
      this.erroSimplificado = err.error.erro;
    })
    
    /*this.editorCodigo.runit().subscribe(codigoEnviado => {
      this.prepararStatus(codigoEnviado.status);
      //this.envioCodigoService.salvar(codigoEnviado).subscribe();
    })*/

  }

  prepararStatus(status) {
    let textoStatus = "<span class='textoStatus'>Status</span> "
    if (!status)
      this.statusExecucao = textoStatus+"<span class='statusErro'>Erro</span>";
    else
      this.statusExecucao = textoStatus+"<span class='statusSucesso'>Sucesso</span>";
  }

  














}