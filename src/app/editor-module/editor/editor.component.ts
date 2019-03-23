import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import Editor from '../../model/editor';
import { SubmissoesService } from 'src/app/analytics-module/submissoes.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


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

  constructor(private envioCodigoService: SubmissoesService, private http: HttpClient) {
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
    this.http.post<any>("http://127.0.0.1:8000/codigo/", this.editorCodigo.codigo.paraJson(), httpOptions).subscribe(resultado=>{
      
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