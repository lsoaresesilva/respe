import { Component, OnInit } from '@angular/core';
import { Assunto } from 'src/app/model/assunto';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-visualizar-assunto',
  templateUrl: './visualizar-assunto.component.html',
  styleUrls: ['./visualizar-assunto.component.css']
})
export class VisualizarAssuntoComponent implements OnInit {
  

  private assunto;
  private id: number;
  private sub: any;
  private assuntos=[];
  

  constructor(private route: ActivatedRoute,private messageService: MessageService){
  
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      Assunto.get(this.id).subscribe(resultado =>{
      this.assunto= resultado
      this.assuntos.push(this.assunto);
   
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
