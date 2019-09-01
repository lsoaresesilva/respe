import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/login-module/login.service';
import Submissao from 'src/app/model/submissao';
import { Assunto } from 'src/app/model/assunto';
import Usuario from 'src/app/model/usuario';

@Component({
  selector: 'app-listar-submissao-questao',
  templateUrl: './listar-submissao-questao.component.html',
  styleUrls: ['./listar-submissao-questao.component.css']
})
export class ListarSubmissaoQuestaoComponent implements OnInit {
 private submissaoId;
 private submissao;
 private usuario;
 private  dataFormatada;
 
  
  


  constructor(private messageService: MessageService,private router:Router, public login:LoginService,private route: ActivatedRoute) {
    this.submissao= new Submissao (null,null,null,[]);
    this.usuario = new Usuario (null,null,null,null);
   }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.submissaoId=params['submissaoId'];

      Submissao.get(this.submissaoId).subscribe( resultado => {

        this.submissao =resultado;
        this.formatarData(this.submissao.data);
        this.buscarEstudante(this.submissao.estudanteId);
        
      });
    });

    
    
    
  }


  buscarEstudante(estudanteId){
      Usuario.get(estudanteId).subscribe(resultado=>{this.usuario=resultado});
  }


  
   
  formatarData(data){
    this.dataFormatada = new Date (data.seconds * 1000).toLocaleString();
  }

  
  
   
    

  

 
}
  

