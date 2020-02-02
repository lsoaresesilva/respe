import { Component, OnInit, Input } from '@angular/core';
import ComentarioCodigo from 'src/app/model/comentarioCodigo';
import Query from 'src/app/model/firestore/query';
import Usuario from 'src/app/model/usuario';
import Submissao from 'src/app/model/submissao';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/login-module/login.service';

declare var dialogEmExibicao: any;
declare function obterPosicoesBotaoCriarComentario(): any;
declare function carregarIde(readOnly, callback, instance, codigo): any;

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
  submissao;
  questao;


  constructor(private activatedRoute:ActivatedRoute, private login:LoginService) {
    this.visibilidade = false;
    this.linhaComentario = 0;
    // TODO: pegar a submissão pela rota
    this.activatedRoute.params.subscribe(params=>{
      if(params["id"] == undefined)
        throw new Error("É preciso informar uma submissão.");

        // Carregar todos os comentários dessa submissão
        Submissao.get(params["id"]).subscribe(submissao=>{
          this.submissao = submissao;
          let codigo = submissao["codigo"]
          codigo = codigo.split("\\n")
          carregarIde(false, this.selecionarLinha, this, codigo);
          this.carregarComentarios();
        });
        
    });

    
  }

  construirComentariosCadastrados(){
    
  }

  ngOnInit() {

    
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

  salvarComentario(texto){
    // TODO: pegar a submissao e estudante
    let comentario = new ComentarioCodigo(null, this.login.getUsuarioLogado(), this.submissao, texto, this.linhaComentario);
    comentario.save().subscribe(resultado=>{
      this.visibilidade = false;
      dialogEmExibicao = false;
      // TODO: recarregar editor para mostrar linhas com comentário
      this.carregarComentarios();
    })
  }

  carregarComentarios(){
    ComentarioCodigo.getAll(new Query("submissaoId", "==", this.submissao.pk())).subscribe(comentariosCadastrados=>{
      this.comentarios = ComentarioCodigo.agrupar(comentariosCadastrados);
      
      // Desenhar os quadrados
    })
  }

}
