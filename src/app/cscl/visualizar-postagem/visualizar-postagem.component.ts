import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Postagem from 'src/app/model/postagem';
import Usuario from 'src/app/model/usuario';
import RespostaPostagem from 'src/app/model/respostaPostagem';
import Query from 'src/app/model/firestore/query';
import { LoginService } from 'src/app/login-module/login.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-visualizar-postagem',
  templateUrl: './visualizar-postagem.component.html',
  styleUrls: ['./visualizar-postagem.component.css']
})
export class VisualizarPostagemComponent implements OnInit {
  id;
  postagem;
  estudante;
  respostas;
  resposta;

  constructor(private router:Router,private route: ActivatedRoute,private login:LoginService,private messageService: MessageService) { 
    
  }

  ngOnInit() {
    this.resposta = new RespostaPostagem(null,null,null,null);
    this.postagem = new Postagem(null, null,null,null,null);

   
    this.route.params.subscribe(params => {
      this.id=params['postagemId'];
      Postagem.get(this.id).subscribe(postagem=>{
        this.postagem = postagem;
        this.resposta = new RespostaPostagem( null,null,this.postagem.id,this.login.getUsuarioLogado().pk());
        Usuario.get(this.postagem.estudanteId).subscribe(estudante =>{this.estudante= estudante});
        RespostaPostagem.getAll(new Query("postagemId","==",this.postagem.id)).subscribe(respostas =>{
          this.respostas = respostas

          this.respostas.forEach(resposta => {
           resposta.estudante = new Usuario(null,null,null,null, null);

            Usuario.get(resposta.estudanteId).subscribe(estudante =>{
              resposta.estudante = estudante;
            });
          
          });

        });
        
      });
     

    });

  }



  messageCadastro() {
    this.messageService.add({severity:'success', summary:'Sucesso!', detail: "  resposta efetuada"});
  }
 

  messageUpdate() {
    this.messageService.add({severity:'success', summary:'Alterado!', detail: " editado a resposta"});
  }

  messageErro() {
    this.messageService.add({severity:'warn', summary:'Falha ao publicar resposta', detail: 'A resposta não foi efetuada'});
  }

  messageInformarDados(){
    this.messageService.add({severity:'warn', summary:'Falha ao publicar resposta', detail: 'É preciso informar todos os campos do formulário'});
  }

  responder() {
    if (this.resposta.validar()) {

      this.resposta.save().subscribe(resultado => {
       
        //atualizar respostas
        RespostaPostagem.getAll(new Query("postagemId","==",this.postagem.id)).subscribe(respostas =>{
          this.respostas = respostas

          this.respostas.forEach(resposta => {
           resposta.estudante = new Usuario(null,null,null,null, null);

            Usuario.get(resposta.estudanteId).subscribe(estudante =>{
              resposta.estudante = estudante;
            });
          
          });

        });
       
       
          this.resposta.id = null;
          this.resposta.texto = null; 
        //this.resposta = new RespostaPostagem(null, null,null,null,null);

        
        this.messageCadastro();
       

      }, err => {
       this.messageErro();

      });
    } else {
     this.messageInformarDados();
    }
   
  }

}
