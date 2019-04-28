import { Component, OnInit } from '@angular/core';
import { Questao } from 'src/app/model/questao';
import { ActivatedRoute } from '@angular/router';
import TestCase from 'src/app/model/testCase';
import { MessageService } from 'primeng/api';

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
  

  constructor(private route: ActivatedRoute,private messageService: MessageService){
  
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      Questao.get(this.id).subscribe(resultado =>{
      this.questao= resultado
      this.questoes.push(this.questao);
    console.log("assuntos = " + this.questao.assuntos[0]);
    console.log("testsCases = " + this.questao.testsCases[0]);
    console.log(this.questao);
   // this.questaoVisualizada();
      });
    });
  }

  ngOnDestroy() {
     this.sub.unsubscribe();
  }


  // questaoVisualizada(){
  //   this.messageService.add({severity:'info', summary:'Questão visualizada', detail:'informações sobre a questão'});
  // }


}
