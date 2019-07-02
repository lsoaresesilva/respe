import { Component, OnInit } from '@angular/core';
import Submissao from 'src/app/model/submissao';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/juiz/login.service';
import Estudante from 'src/app/model/estudante';

@Component({
  selector: 'app-listar-estudantes-submissao',
  templateUrl: './listar-estudantes-submissao.component.html',
  styleUrls: ['./listar-estudantes-submissao.component.css']
})
export class ListarEstudantesSubmissaoComponent implements OnInit {
  
  private submissoes;
  private submissaoSelected;
  private questaoId;
  //private submissoesQuestao:any[];
  submissoesQuestao: Submissao[] = [];
  private  submissoesConcluidas: any = []
  estudantes:Estudante[]=[];
  estudante;

  


  constructor(private messageService: MessageService,private router:Router, public login:LoginService,private route: ActivatedRoute) { }

  ngOnInit() {

    // this.route.params.subscribe(params => {
    //   Submissao.get(params['questaoId']).subscribe(resultado =>{
    //   this.submissao = resultado
   
    //   });
    // });



    this.route.params.subscribe(params => {
      Submissao.getAll().subscribe(resultado =>{
        this.submissoes = resultado

        for(let i=0;i<this.submissoes.length;i++){
          for(let y=0;y<this.submissoes[i].resultadosTestsCases.length;y++){

            if(this.submissoes[i].questaoId == params['questaoId'] && this.submissoes[i].resultadosTestsCases[y].status == true  ){

             this.addSubmissao(this.submissoes[i]);


             for(let i=0;i<this.submissoes.length;i++){
               Estudante.get(this.submissoes[i].estudanteId).subscribe(resultado =>{this.estudante=resultado
              //this.estudantes.push(this.estudante);

             //console.log(this.estudantes);
              console.log(this.estudante);
              //console.log(this.submissoes);


              
              }  );
             }
            } 
          }
        }

      });
    });
  }


  addSubmissao(submissao){

    // for(let i =0; i<this.submissoesQuestao.length;i++ ){
    
        
        if(!this.submissoesQuestao.includes(submissao.id)){
          this.submissoes.push(submissao)

      //}

    }
  }
}
  


