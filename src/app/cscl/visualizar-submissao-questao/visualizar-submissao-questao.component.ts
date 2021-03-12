import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/login-module/login.service';
import Submissao from 'src/app/model/submissao';
import { Assunto } from 'src/app/model/assunto';
import Usuario from 'src/app/model/usuario';
import { Util } from 'src/app/model/util';

@Component({
  selector: 'app-visualizar-submissao-questao',
  templateUrl: './visualizar-submissao-questao.component.html',
  styleUrls: ['./visualizar-submissao-questao.component.css']
})
export class VisualizarSubmissaoQuestaoComponent implements OnInit {
 submissao;
 usuario;
 dataFormatada;
 questao;
 
  constructor(private messageService: MessageService,private router:Router, public login:LoginService,private route: ActivatedRoute) {
    this.submissao= new Submissao (null,null,null,null, null);
    this.usuario = new Usuario (null,null,null,null, null, null);
   }

  ngOnInit() {

    this.route.params.subscribe(params => {

      Submissao.get(params['submissaoId']).subscribe( resultado => {
        
        this.submissao =resultado;
        if(this.submissao != null){
          if(this.submissao.assuntoId != null && this.submissao.questaoId != null){
            Assunto.get(this.submissao.assuntoId).subscribe(assunto=>{
              let a = assunto as Assunto;
              if(params['isAtividadeGrupo'] != null){
                let questaoColaborativa = a.questoesColaborativas.find(questaoColaborativa=>{
                  if(questaoColaborativa.questao.id == this.submissao.questaoId){
                    return true;
                  }

                })

                if(questaoColaborativa != null){
                  this.questao = questaoColaborativa.questao;
                }
              }else{
                this.questao = a.getQuestaoProgramacaoById(this.submissao.questaoId);
              }

              
              
            })
          }
          
          this.formatarData(this.submissao.data);
          Usuario.get(this.submissao.estudanteId).subscribe(resultado=>{this.usuario=resultado});
        }
        
        
      });
    });    
    
  }



  
   
  formatarData(data){
    this.dataFormatada = Util.formatarData(data);
  }

  
  
   
    

  

 
}
  

