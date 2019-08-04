import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import Postagem from 'src/app/model/postagem';
import { LoginService } from 'src/app/juiz/login.service';


@Component({
  selector: 'app-cadastrar-postagem',
  templateUrl: './cadastrar-postagem.component.html',
  styleUrls: ['./cadastrar-postagem.component.css']
})
export class CadastrarPostagemComponent implements OnInit {
  postagem;
  postagemId;
  id;
  isAlterar
   constructor(private router: Router, private route: ActivatedRoute, private messageService: MessageService, private login :LoginService) {
 
    }
    
   ngOnInit() {
    
     this.route.params.subscribe(params=> {this.id = params["turmaId"];
     this.postagemId = params ["postagemId"]
     this.postagem = new Postagem(null, null,null,this.login.getUsuarioLogado().pk(),this.id,null);
       if(this.postagemId!=undefined){
         this.isAlterar=true;
         Postagem.get(this.postagemId).subscribe(resultado =>{
           this.postagem = resultado;
         
         })
       }
       
     });
   }
 
   messageCadastro() {
     this.messageService.add({severity:'success', summary:'Cadastrado!', detail: this.postagem.nome+"  foi adicionado"});
   }
  
 
   messageUpdate() {
     this.messageService.add({severity:'success', summary:'Alterado!', detail: " assunto alterado"});
   }
 
   messageErro() {
     this.messageService.add({severity:'warn', summary:'Falha ao publicar postagem', detail: 'O assunto não foi cadastrado'});
   }
 
   messageInformarDados(){
     this.messageService.add({severity:'warn', summary:'Falha ao publicar postagem', detail: 'É preciso informar todos os campos do formulário'});
   }
 
   cadastrar() {
     console.log(this.postagem);
 
     if (this.postagem.validar()) {
       
       this.postagem.save().subscribe(resultado => {
         this.router.navigate(["main", { outlets: { principal: ['listar-postagens',this.id] } }]);
         
 
 
 
         this.messageCadastro();
        
 
       }, err => {
        this.messageErro();
 
       });
     } else {
      this.messageInformarDados();
     }
    
   }
 
 }
 
 
 
