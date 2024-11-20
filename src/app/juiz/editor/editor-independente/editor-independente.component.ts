import { Component, OnInit } from '@angular/core';

import Editor from 'src/app/model/editor';
import ParseAlgoritmo from 'src/app/model/errors/analise-pre-compilacao/parseAlgoritmo';
import ErroServidor from 'src/app/model/errors/erroServidor';
import { ModoExecucao } from 'src/app/model/juiz/enum/modoExecucao';

@Component({
  selector: 'app-editor-independente',
  templateUrl: './editor-independente.component.html',
  styleUrls: ['./editor-independente.component.css']
})
export class EditorIndependenteComponent implements OnInit {

  submissao;
  modoExecucao;
  editor:Editor
  mudancaPermitida;
  loading:boolean;

  constructor() {
    this.modoExecucao = ModoExecucao.execucaoPadrao;
    this.mudancaPermitida = false;
    this.editor = Editor.getInstance();
    this.loading = true;
    //Editor.getInstance().codigo.next("");
   }

  ngOnInit(): void {
  }

  erroSubmissao(erro){
    let codigo = Editor.getInstance().instanciaMonaco.getValue().split('\n');

    this.editor.console.tracebackOriginal = erro;


    let erroIdentificado = new ParseAlgoritmo(codigo).analisar();
    if(erroIdentificado != null){
      this.editor.console.erro = erroIdentificado[0].construirMensagem();
    }

    
  }

  onContainerReady(){
    this.loading = false;
  }


  onSubmit(saida){
    this.editor.console.resetarErro();
    this.editor.console.saida = saida;
  }





}
