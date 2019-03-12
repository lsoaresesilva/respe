import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import ErroFactory from '../model/erroFactory';
import Editor from '../model/editor';
import Codigo from '../model/codigo';
import StringSimilarity from '../util/stringSimilarity';
import Solucao from '../model/solucaoFactory';
import SolucaoFactory from '../model/solucaoFactory';
declare var Sk: any;
declare var editor: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EditorComponent implements OnInit {

  @ViewChild('output') myDiv: ElementRef;

  editorCodigo?:Editor;
  static instance;

  constructor() { 
    EditorComponent.instance = this;

  }

  ngOnInit() {
    this.editorCodigo = Editor.getInstance();
  }

  

  builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
      throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
  }
  // Here's everything you need to run a python program in skulpt
  // grab the code from your textarea
  // get a reference to your pre element for output
  // configure the output function
  // call Sk.importMainWithBody()
  runit() {
    
    this.editorCodigo.codigo.setAlgoritmo(editor.getValue()); // TODO: mudar para o onkeypress
    

    Sk.pre = "output";
    let _this = this;

    function outf(texto) {
      if( texto != "\n")
        _this.editorCodigo.saida = texto;
      
    }

    Sk.configure({ output: outf, read: this.builtinRead });
    
    var myPromise = Sk.misceval.asyncToPromise(function () {
      return Sk.importMainWithBody("<stdin>", false, editor.getValue(), true);
    });
    myPromise.then(function (mod) {
      
      _this.editorCodigo.prepararStatus(true);
    },
      function (err) {
        console.log(err.toString());
        _this.editorCodigo.prepararStatus(false);
        _this.editorCodigo.prepararSaidaErro(err.toString());

        // destacar a possivel solução
          // encontrar a solução


        /*identificarFuncoes(prog);
        identificarVariaveis(prog);
        console.log(err.toString());
        let linhaErro = obterLinhaComErro(err);
        destacarLinhaComErro(editor, linhaErro);
        /*var decorations = editor.deltaDecorations([], [
//{ range: new monaco.Range(3,1,5,1), options: { isWholeLine: true, linesDecorationsClassName: 'myLineDecoration' }},
{ range: new monaco.Range(1,1,1,5), options: { inlineClassName: 'myInlineDecoration' }},
]);*/

      });
  }

  

  


  

  

}