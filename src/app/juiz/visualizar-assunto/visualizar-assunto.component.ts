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
  

<<<<<<< HEAD
  assunto?
  private id: number;
  private sub: any;
  
=======
  assunto;
>>>>>>> #130

  constructor(private route: ActivatedRoute,private messageService: MessageService, private router:Router){
  
  }

  ngOnInit() {
<<<<<<< HEAD
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      Assunto.get(this.id).subscribe(resultado =>{
      this.assunto= resultado
=======
    this.route.params.subscribe(params => {
      Assunto.get(params['id']).subscribe(resultado =>{
      this.assunto = resultado
   
>>>>>>> #130
      });
    });
  }

  cadastrar(){
    this.router.navigate(["main", { outlets: { principal: ['cadastro-questao', this.assunto.pk()] }}]);
  }

  


}
