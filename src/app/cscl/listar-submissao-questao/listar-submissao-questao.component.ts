import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/juiz/login.service';
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
 private estudante;

 private  dataFormatada;
 
  
  


  constructor(private messageService: MessageService,private router:Router, public login:LoginService,private route: ActivatedRoute) {
    this.submissao= new Submissao (null,null,null,[]);
   }

  ngOnInit() {


    this.route.params.subscribe(params => {
      this.submissaoId=params['submissaoId'];
      Submissao.get(this.submissaoId).subscribe( resultado => {this.submissao =resultado
        console.log(this.submissao);
        this.dataFormatada = new Date (this.submissao.data.seconds * 1000).toLocaleString();
        console.log(this.dataFormatada);
        console.log(this.submissao.data.toLocaleString);
        this.buscarEstudante();
      });
      
    });


    
     console.log(this.submissao);
     console.log(this.submissao.data);
    
  }


  buscarEstudante(){
      Usuario.get(this.submissao.estudanteId).subscribe(resultado=>{this.estudante=resultado
       this.estudante = this.estudante.nome;
      });

  }
   
   
    

  

 
}
  

