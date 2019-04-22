import { Component, OnInit, Input } from '@angular/core';
import ComentarioCodigo from 'src/app/model/comentarioCodigo';
import Query from 'src/app/model/firestore/query';

declare var dialogEmExibicao: any;
declare function obterPosicoesBotaoCriarComentario(): any;
declare function carregarIde(readOnly, callback, instance): any;

@Component({
  selector: 'comentarios-codigo',
  templateUrl: './comentarios-codigo.component.html',
  styleUrls: ['./comentarios-codigo.component.css']
})
export class ComentariosCodigoComponent implements OnInit {

  //comentario:ComentarioCodigo;
  comentarios:ComentarioCodigo[];
  visibilidade:boolean;
  linhaComentario;
  constructor() {
    this.visibilidade = false;
    this.linhaComentario = 0;
    // TODO: pegar a submissão pela rota
    
    //this.comentario = new ComentarioCodigo(null, Usuario.getUsuarioLogado(), new Submissao("Fz0penFp04A3z5xus6qF", null, null, null), null, null);

    // Carregar todos os comentários dessa submissão
    this.carregarComentarios();
  }

  construirComentariosCadastrados(){
    
  }

  ngOnInit() {

    carregarIde(false, this.selecionarLinha, this);
  }

  fazer(){
    if(!this.visibilidade){
      this.visibilidade = true;
    }else{
      this.visibilidade = false;
    }
  }


  selecionarLinha(event, instance){
    // SE dialog estiver aberta, não fazer essa mudança.
    if( !dialogEmExibicao ){
      instance.linhaComentario = event.target.position.lineNumber
    }else{
      dialogEmExibicao = true;
    }
        
  }

  exibirBoxNovoComentario(e){
    if(!this.visibilidade){
      this.visibilidade = true;
      dialogEmExibicao = true;
    }else{
      this.visibilidade = false;
      dialogEmExibicao = false;
    }
  }

  gerenciarDialog(e){
    this.visibilidade = e;
    dialogEmExibicao = e;
  }

  salvarComentario(comentario){
    comentario.linha = this.linhaComentario;
    comentario.save().subscribe(resultado=>{
      this.visibilidade = false;
      dialogEmExibicao = false;
      // TODO: recarregar editor para mostrar linhas com comentário
      this.carregarComentarios();
    })
  }

  carregarComentarios(){
    ComentarioCodigo.getAll(new Query("submissaoId", "==", "Fz0penFp04A3z5xus6qF")).subscribe(comentariosCadastrados=>{
      this.comentarios = ComentarioCodigo.agrupar(comentariosCadastrados);
      
      // Desenhar os quadrados
    })
  }

}
