import { Component, OnInit } from '@angular/core';
import { Assunto } from 'src/app/model/assunto';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-visualizar-assunto',
  templateUrl: './visualizar-assunto.component.html',
  styleUrls: ['./visualizar-assunto.component.css']
})
export class VisualizarAssuntoComponent implements OnInit {
  

  assunto;

  constructor(private route: ActivatedRoute,private messageService: MessageService, private router:Router){
  
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      Assunto.get(params['id']).subscribe(resultado =>{
      this.assunto = resultado
   
      });
    });
  }

  cadastrar(){
    this.router.navigate(["main", { outlets: { principal: ['cadastro-questao', this.assunto.pk()] }}]);
  }

  


}
