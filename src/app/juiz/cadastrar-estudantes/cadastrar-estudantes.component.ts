import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import Estudante from 'src/app/model/estudante';

@Component({
  selector: 'app-cadastrar-estudantes',
  templateUrl: './cadastrar-estudantes.component.html',
  styleUrls: ['./cadastrar-estudantes.component.css']
})
export class CadastrarEstudantesComponent implements OnInit {

  id;
  estudantes;

  constructor(public router : Router,private messageService: MessageService, private route: ActivatedRoute) {
   
   }
   
   
  ngOnInit() {
     this.estudantes = new Estudante ( null, null,null, null,null);
     if (this.id= this.route.snapshot.params ["id"]){
      this.route.params.subscribe(params=> {
             this.id = params["id"];
            Estudante.get(this.id).subscribe( atualizarEstudante => {
            this.estudantes = atualizarEstudante;
          }
        )});
    

     }else{
     
    }
  
  
      }
    
  
addSingle() {
    this.messageService.add({severity:'sucesso', summary:'Service Message', detail:'Via MessageService'});
}
addErro() {
  this.messageService.add({severity:'erro', summary:'Service Message', detail:'Via MessageService'});
}
    
  cadastrarEstudante(){
    console.log(this.estudantes);
    if (this.estudantes) {
      this.estudantes.save().subscribe(resultado => {
        this.addSingle(); 
        this.addErro();
        this.messageService.add({  severity: 'info', summary: 'Estudante cadastrado', detail: this.estudantes.nome });
        this.router.navigate(["main", { outlets: { principal: ['listagem-estudantes'] } }]);
  
      },
        err => {
          this.addErro();
          console.log("Resolva o erro");
        });

    }
 
  }
   
  }

