import { Component, OnInit, ViewChild } from '@angular/core';

declare function ativarVisualizacao(callback, instance): any;

@Component({
  selector: 'app-visualizar-conteudo',
  templateUrl: './visualizar-conteudo.component.html',
  styleUrls: ['./visualizar-conteudo.component.css']
})
export class VisualizarConteudoComponent implements OnInit {

  @ViewChild("opcoesAnotacao") boxOpcoesAnotacao;

  constructor() { }

  ngOnInit() {
    ativarVisualizacao(this.abrirOpcoesAnotacao, this);
  }

  abrirOpcoesAnotacao(texto, instance, event){
    instance.boxOpcoesAnotacao.toggle(event, event.target);
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
