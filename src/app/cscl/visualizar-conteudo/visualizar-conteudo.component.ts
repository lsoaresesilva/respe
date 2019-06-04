import { Component, OnInit, ViewChild } from '@angular/core';
import TextoHighlight from 'src/app/model/textoHighlight';
import Usuario from 'src/app/model/usuario';
import { DomSanitizer } from '@angular/platform-browser';
import ComentarioEstudo from 'src/app/model/comentarioEstudo';
import { LoginService } from 'src/app/juiz/login.service';

/**
 * Estão declaradas no arquivo visualizarConteudo.js. A função é usada para iniciar o listener do mouse para capturar quando um texto for selecionado. A variável armazena o texto selecionado.
 */
declare function ativarVisualizacao(instance): any;
declare var textoSelecionado: string;
declare var dialogAberta: any;
declare var index: any;

enum TipoDestaque {
  highlight = 1,
  anotacao = 2
}

@Component({
  selector: 'app-visualizar-conteudo',
  templateUrl: './visualizar-conteudo.component.html',
  styleUrls: ['./visualizar-conteudo.component.css']
})
export class VisualizarConteudoComponent implements OnInit {

  static counter = 0;

  anotacao;

  textosHighlighted;
  textosAnotados;
  visibilidadeDialogComentario: boolean;
  conteudoProgramacao;
  @ViewChild("divConteudoProgramacao")
  divConteudoProgramacao;
  @ViewChild("panelApagarDestaque") panelApagarDestaque;

  @ViewChild("btnApagarDestaque") btnApagarDestaque;

  constructor(private sanitizer: DomSanitizer, private login:LoginService) {

    this.textosHighlighted = []
    this.visibilidadeDialogComentario = false;

  }

  inicializarTexto() {
    // TODO: o texto deve vir de um objeto da classe conteudoProgramacao.
    this.conteudoProgramacao = this.sanitizer.bypassSecurityTrustHtml("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.");
    // TODO: deve-se filtrar os highlights pelo estudante logado.
    TextoHighlight.getAll().subscribe(textos => {
      this.textosHighlighted = textos
      this.destacarTexto(this.textosHighlighted, TipoDestaque.highlight);
    })

    ComentarioEstudo.getAll().subscribe(textos => {
      this.textosAnotados = textos
      this.destacarTexto(this.textosAnotados, TipoDestaque.anotacao);
    })
  }

  ngOnInit() {
    ativarVisualizacao(this);
    this.inicializarTexto();
  }

  salvarComentario(comentario) {
    // TODO: pegar a submissao que vem pela rota
    let comentarioEstudante = new ComentarioEstudo(null, this.login.getUsuarioLogado(), comentario, textoSelecionado);
    comentarioEstudante.save().subscribe(resultado => {
      this.visibilidadeDialogComentario = false;
      this.inicializarTexto();
      // TODO: recarregar editor para mostrar linhas com comentário
      //this.carregarComentarios();
    })
  }

  gerenciarDialog(e) {
    this.visibilidadeDialogComentario = e;
    dialogAberta = false;
  }

  abrirDialogNovoComentario() {
    this.visibilidadeDialogComentario = true;
    dialogAberta = true;
  }

  criarHighlight() {

    if (textoSelecionado != "") {
      let textoHighlight = new TextoHighlight(null, null, null, textoSelecionado);
      textoHighlight.save().subscribe(resultado => {
        // fazer o highlight
        this.textosHighlighted.push(textoHighlight);

        this.destacarTexto(this.textosHighlighted, TipoDestaque.highlight);
        //textoSelecionado = ""
      })
    }

  }

  criarTagDestaque(tipo) {
    let tag = "";
    // Em razão dos mecanismos de segurança do Angular, não é permitido criar tags dinâmicas e jogá-las em um innerHTML. Para contornar esse problema usaremos parte do código em JS puro.
    switch (tipo) {
      case TipoDestaque.highlight:
        let z = "event, "+index.toString()
        tag = "<span id='destaque_highlight_"+index+"' style='background-color: #FFFF00; cursor:ponter' onclick='apagarHighlight(event, "+index.toString()+")'>$1</span>";
        break;
      case TipoDestaque.anotacao:
        tag = "<span id='destaque_anotacao_"+index+"' style='background-color: rgba(204, 153, 255, 0.7);cursor:ponter' onclick='apagarAnotacao(event, "+index.toString()+")'>$1</span>";
        break;
    }

    return tag;
  }

  /**
   * Destaca os textos que foram highlighted.
   */
  destacarTexto(textosDestacados, tipo: TipoDestaque) {



    for (let i = 0; i < textosDestacados.length; i++) {

      // variável usada no JS para poder identificar qual é o texto que foi clicado.
      index = i;

      let tag = this.criarTagDestaque(tipo);

      let textoProgramacao = this.conteudoProgramacao.changingThisBreaksApplicationSecurity; //this.divConteudoProgramacao.nativeElement.innerHTML;
      let html = textosDestacados[i]["texto"] ? textoProgramacao.replace(new RegExp('(' + textosDestacados[i]["texto"] + ')', 'ig'), tag) : textoProgramacao;
      this.conteudoProgramacao = this.sanitizer.bypassSecurityTrustHtml(html);

    }
  }

  apagarHighlight(event, i) {

    this.panelApagarDestaque.show(event, document.getElementById("destaque_highlight_"+i));
    let _this = this;
    this.btnApagarDestaque.onClick.emit = function(){
      
      if (_this.textosHighlighted[i] != null && typeof _this.textosHighlighted[i].pk === "function") {
        TextoHighlight.delete(_this.textosHighlighted[i].pk()).subscribe(resultado => {
          if (resultado) {
            _this.inicializarTexto();
            _this.panelApagarDestaque.hide();
          }
        })
      }
    }
    /**/
  }

  apagarAnotacao(event, i) {
    let _this = this;
    this.panelApagarDestaque.show(event, document.getElementById("destaque_anotacao_"+i));
    this.anotacao = this.textosAnotados[i];
    this.btnApagarDestaque.onClick.emit = function(){
      if (_this.textosAnotados[i] != null && typeof _this.textosAnotados[i].pk === "function") {
        ComentarioEstudo.delete(_this.textosAnotados[i].pk()).subscribe(resultado => {
          if (resultado) {
            _this.anotacao = undefined;
            _this.inicializarTexto();
            _this.panelApagarDestaque.hide();
          }
        })
      }
    }
    /*if (this.textosAnotados[i] != null && typeof this.textosAnotados[i].pk === "function") {
      ComentarioConteudo.delete(this.textosAnotados[i].pk()).subscribe(resultado => {
        if (resultado) {
          this.inicializarTexto();
        }
      })
    }*/

  }
}
