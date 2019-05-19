import { Component, OnInit } from '@angular/core';
import QuestaoFechada from 'src/app/model/questaoFechada';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-visualizar-questao-fechada',
  templateUrl: './visualizar-questao-fechada.component.html',
  styleUrls: ['./visualizar-questao-fechada.component.css']
})
export class VisualizarQuestaoFechadaComponent implements OnInit {
  
  
  

  private questao;
  private id: number;
  private sub: any;
  private questoes=[];
  
  
  constructor(private route: ActivatedRoute,private router:Router){
    this.questao = new QuestaoFechada(null, null, null, null, [], null, []);
  
  }

  ngOnInit() {
    
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      QuestaoFechada.get(this.id).subscribe(resultado =>{
      this.questao= resultado
      this.questoes.push(this.questao);
   
      });
    });
  }

  ngOnDestroy() {
     this.sub.unsubscribe();
  }
  alterarQuestao(questao: QuestaoFechada) {
    if(questao != undefined){
      this.router.navigate(["main", { outlets: { principal: ['atualizacao-questao-fechada', questao.pk()] } } ] );
    }
  }

  


}
