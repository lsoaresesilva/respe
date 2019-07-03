import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/juiz/login.service';
import Submissao from 'src/app/model/submissao';

@Component({
  selector: 'app-listar-submissao-questao',
  templateUrl: './listar-submissao-questao.component.html',
  styleUrls: ['./listar-submissao-questao.component.css']
})
export class ListarSubmissaoQuestaoComponent implements OnInit {
  private submissoes;
  private submissaoSelected;
  private questaoId;
  //private submissoesQuestao:any[];
  submissoesQuestao: Submissao[] = [];
  private  submissoesConcluidas: any = []
  
  


  constructor(private messageService: MessageService,private router:Router, public login:LoginService,private route: ActivatedRoute) { }

  ngOnInit() {


    this.route.params.subscribe(params => {
      Submissao.getAll().subscribe(resultado =>{
        this.submissoes = resultado

        for(let i=0;i<this.submissoes.length;i++){
          for(let y=0;y<this.submissoes[i].resultadosTestsCases.length;y++){

            if(this.submissoes[i].questaoId == params['questaoId'] && this.submissoes[i].resultadosTestsCases[y].status == true  ){
              //console.log("status = "+ this.submissoes[i].resultadosTestsCases[y].status);

             this.addSubmissao(this.submissoes[i]);
            } 
          }
        }

      });
    });
  }


  addSubmissao(submissao){

    // for(let i =0; i<this.submissoesQuestao.length;i++ ){
    
        console.log(submissao.id);
        console.log( this.submissoesQuestao);
        if(!this.submissoesQuestao.includes(submissao.id)){
          this.submissoes.push(submissao)

      }

    // }
  }




 
}
  

