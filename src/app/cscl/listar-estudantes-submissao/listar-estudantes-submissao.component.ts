import { Component, OnInit } from '@angular/core';
import Submissao from 'src/app/model/submissao';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/juiz/login.service';
import Query from 'src/app/model/firestore/query';
import Usuario from 'src/app/model/usuario';
import Estudante from 'src/app/model/estudante';


@Component({
  selector: 'app-listar-estudantes-submissao',
  templateUrl: './listar-estudantes-submissao.component.html',
  styleUrls: ['./listar-estudantes-submissao.component.css']
})
export class ListarEstudantesSubmissaoComponent implements OnInit {
  
  private submissoesDaQuestao;
  private questao;
  private submissoes;
  private estudante;
  private assuntoId
  private json;
  


  constructor(private messageService: MessageService,private router:Router, public login:LoginService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.questao= params['questaoId'];
      //this.questao = "fc91ec49-7b5f-4d23-a27b-992e0a7d58ae";
      
     
      Submissao.getAll(new Query("questaoId","==",this.questao)).subscribe(resultado =>{
        this.submissoes =resultado;
        

        this.eliminarSubmissoesInconcluidas(resultado);
      });
    });
  }

  eliminarSubmissoesInconcluidas(submissoesQuestao:Submissao[]) {
    for (let i = 0; i < submissoesQuestao.length; i++) {
      for (let j = 0;j<submissoesQuestao[i].resultadosTestsCases.length; j++) {
        if(submissoesQuestao[i].resultadosTestsCases[j].status != true){
          submissoesQuestao.splice(i, 1);
        }
      }
    }
    
    this.BuscarEstudante(submissoesQuestao);
  }


  BuscarEstudante(submissoesQuestao){
    for(let i=0;i<submissoesQuestao.length;i++){

      Usuario.get(submissoesQuestao[i].estudanteId).subscribe(resultado=>{this.estudante=resultado
        submissoesQuestao[i].estudante=this.estudante.nome;
        
      });
    }
   this.submissoesDaQuestao=submissoesQuestao;

  }




 
  visualizarSubmissao(submissao){
    this.router.navigate(["main", { outlets: { principal: ['listar-submissao-questao', submissao.id] } } ] );
  }

  
 
}
  


