import { Component, OnInit, ViewChild } from '@angular/core';

/**
 * Estão declaradas no arquivo visualizarConteudo.js. A função é usada para iniciar o listener do mouse para capturar quando um texto for selecionado. A variável armazena o texto selecionado.
 */
declare function ativarVisualizacao(): any;
declare var textoSelecionado:string;
declare var callbackAtivo:any;

@Component({
  selector: 'app-visualizar-conteudo',
  templateUrl: './visualizar-conteudo.component.html',
  styleUrls: ['./visualizar-conteudo.component.css']
})
export class VisualizarConteudoComponent implements OnInit {

  @ViewChild("opcoesAnotacao") boxOpcoesAnotacao;

  constructor() { }

  ngOnInit() {
    ativarVisualizacao();
  }

  criarHighlight(){
    callbackAtivo = true;
    if( textoSelecionado != ""){

    }
    console.log("maoe");
    console.log(textoSelecionado);
  }



  /**
   * var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;


    function getSelectedText() {
    var text = "";
    if (typeof window.getSelection != "undefined") {
        text = window.getSelection().toString();
    } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
        text = document.selection.createRange().text;
    }
    return text;
}

function doSomethingWithSelectedText() {
    var selectedText = getSelectedText();
    if (selectedText) {
        alert("Got selected text " + selectedText);
    }
}

document.onmouseup = doSomethingWithSelectedText;
document.onkeyup = doSomethingWithSelectedText;
   */

}
