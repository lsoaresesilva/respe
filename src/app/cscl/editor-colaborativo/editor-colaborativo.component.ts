import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import * as Firepad from 'firepad';
import CodeMirror from 'codemirror';
import * as firebase from 'firebase';
import { LoginService } from 'src/app/login-module/login.service';
declare var monaco: any;
declare function iniciarEditorColaborativo(id): any;


@Component({
  selector: 'app-editor-colaborativo',
  templateUrl: './editor-colaborativo.component.html',
  styleUrls: ['./editor-colaborativo.component.css']
})
export class EditorColaborativoComponent implements AfterViewInit {

  editor;
  codeMirror
  @ViewChild('firepad') divEditor;
  firepad; 
  
  constructor(private login:LoginService) { }

  ngAfterViewInit(): void {
    //this.
   
    iniciarEditorColaborativo(this.login.getUsuarioLogado().pk());

    
    /* setTimeout(function(){

      carregarIde(false, function(){
      }, _this, _this.carregarEditor, "", true);
    }, 500) */
  }

  ngOnInit(): void {
    

  }

  carregarEditor(editorProgramacaoComponentInstance, editor) {
    editorProgramacaoComponentInstance.editor = editor;
    //this.firepad = Firepad.fromMonaco(editorProgramacaoComponentInstance.firepadRef,editorProgramacaoComponentInstance.editor,{richTextShortcuts:true,richTextToolbar:true,defaultText:'Hello, World!'});
    
  }

}
