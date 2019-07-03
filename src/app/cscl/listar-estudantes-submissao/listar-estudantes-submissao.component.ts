import { Component, OnInit } from '@angular/core';
import Submissao from 'src/app/model/submissao';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/juiz/login.service';
import Estudante from 'src/app/model/estudante';
import Query from 'src/app/model/firestore/query';
import Usuario from 'src/app/model/usuario';

@Component({
  selector: 'app-listar-estudantes-submissao',
  templateUrl: './listar-estudantes-submissao.component.html',
  styleUrls: ['./listar-estudantes-submissao.component.css']
})
export class ListarEstudantesSubmissaoComponent implements OnInit {
  
  private submissoesDaQuestao;
  private submissaoSelected;
  private questaoId;
  //private submissoesQuestao:any[];
  submissoesQuestao: Submissao[] = [];
  private  submissoesConcluidas: any = []
  estudantes:Estudante[]=[];
  estudante;
 estudantesCovertidos:any=[];
 resultado;
 
  


  constructor(private messageService: MessageService,private router:Router, public login:LoginService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      Submissao.getAll(new Query("questaoId","==", params['questaoId'])).subscribe(resultado =>{
        this.questaoId =params['questaoId'],
        this.submissoesDaQuestao = resultado;
        this.elimanarSubmissoesInconcluidas();

      
          // Estudante.getAll().subscribe(resultado =>{this.resultado=resultado});
          //  console.log(this.resultado);
        //  console.log(this.submissoesDaQuestao[0].estudanteId);
        //}


        

      });
    });
  }

  visualizarSubmissao(estudanteId){
  this.router.navigate(["main", { outlets: { principal: ['listar-submissao-questao',this.questaoId,estudanteId ]} }]);
  }
  


  elimanarSubmissoesInconcluidas() {
    console.log(this.submissoesDaQuestao);
    
    for (let i = 0; i < this.submissoesDaQuestao.length; i++) {
      for (let j = 0; j < this.submissoesDaQuestao.length; j++) {
        if(this.submissoesDaQuestao[i].resultadosTestsCases[j].status==false){
          this.submissoesDaQuestao.splice(i, 1);
         
        }
      }
    }
  
    console.log(this.submissoesDaQuestao);
  }

}
  


