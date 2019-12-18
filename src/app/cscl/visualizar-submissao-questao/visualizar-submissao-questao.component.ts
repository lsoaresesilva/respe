import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/login-module/login.service';
import Submissao from 'src/app/model/submissao';
import { Assunto } from 'src/app/model/assunto';
import Usuario from 'src/app/model/usuario';

@Component({
  selector: 'app-visualizar-submissao-questao',
  templateUrl: './visualizar-submissao-questao.component.html',
  styleUrls: ['./visualizar-submissao-questao.component.css']
})
export class VisualizarSubmissaoQuestaoComponent implements OnInit {
 private submissao;
 private usuario;
 private questao;
 private  dataFormatada;
 private nome;
 
  constructor(private messageService: MessageService,private router:Router, public login:LoginService,private route: ActivatedRoute) {
    this.submissao= new Submissao (null,null,null,[]);
    this.usuario = new Usuario (null,null,null,null, null);
   }

  ngOnInit() {

    this.route.params.subscribe(params => {

      Submissao.get(params['submissaoId']).subscribe( resultado => {
        
        this.submissao =resultado;
        this.formatarData(this.submissao.data);
        this.nome
        Usuario.get(this.submissao.estudanteId).subscribe(resultado=>{this.usuario=resultado});
       console.log(this.submissao.id);
   
       
        
      });
    });    
    
  }

  
   
  formatarData(data){
    this.dataFormatada = new Date (data.seconds * 1000).toLocaleString();
  }

  
  
   
    

  

 
}
  

