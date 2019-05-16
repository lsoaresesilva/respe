import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, MenuItem } from 'primeng/api';
import { Questao } from 'src/app/model/questao';
import Submissao from 'src/app/model/submissao';
import { Menu } from 'primeng/primeng';

@Component({
  selector: 'app-visualizar-questao',
  templateUrl: './visualizar-questao.component.html',
  styleUrls: ['./visualizar-questao.component.css']
})
export class VisualizarQuestaoComponent implements OnInit {
  
  

  private questao;
  private id: number;
  private sub: any;
  private questoes=[];
  
  
  constructor(private route: ActivatedRoute,private router:Router){
    this.questao = new Questao(null, null, null, null, null, [], null, []);
  
  }

  ngOnInit() {
    
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      Questao.get(this.id).subscribe(resultado =>{
      this.questao= resultado
      this.questoes.push(this.questao);
   
      });
    });
  }

  ngOnDestroy() {
     this.sub.unsubscribe();
  }
  alterarQuestao(questao: Questao) {
    if(questao != undefined){
      this.router.navigate(["main", { outlets: { principal: ['atualizacao-questao', questao.pk()] } } ] );
    }
  }

  


}