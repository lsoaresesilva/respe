import { Component, OnInit } from '@angular/core';
import Estudante from 'src/app/model/estudante';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-estudantes',
  templateUrl: './listar-estudantes.component.html',
  styleUrls: ['./listar-estudantes.component.css']
})
export class ListarEstudantesComponent implements OnInit {
  estudantes: Estudante[];
  selectedEstudante: Estudante;
  items: MenuItem[];
  estudante : Estudante;
  id:Estudante;
 
 

constructor(public router : Router, private messageService: MessageService) { 
  
}

ngOnInit() {

  Estudante.getAll().subscribe  (estudante =>{this.estudantes = estudante , console.log ( this.estudantes)});



  this.items = [
      { label: 'Vizualizar', icon: 'pi pi-search', command: (event) => this.vizualizar(this.selectedEstudante) },
      { label: 'Apagar', icon: 'pi pi-times', command: (event) => this.deleteEstudante(this.selectedEstudante) },
      { label: 'Alterar', icon: '°', command: (event) => this.atualizar(this.selectedEstudante) }
  ];
}

vizualizar(estudante:Estudante) {
this.messageService.add({ severity: 'info', summary: 'Car Selected', detail: estudante.nome + ' - ' + estudante.email});

}

atualizar(estudante : Estudante){
  this.router.navigate(["main", { outlets: { principal: ['atualizacao-estudante'+ estudante.pk()] } }]);
}


delete (estudante:Estudante) {
  Estudante.delete(estudante.pk()).subscribe(resultado=>{ console.log("resultado é " + resultado);
    console.log("PK é "+estudante.pk());

 });
}



deleteEstudante(estudante:Estudante) {
let index = -1;
for (let i = 0; i < this.estudantes.length; i++) {
    if (this.estudantes[i].id == estudante.id) {
        index = i;
       
        break;
  
    }
}
this.estudantes.splice(index, 1);
this.delete(estudante);
this.messageService.add({ severity: 'info', summary: 'Estudante deletado', detail: estudante.nome + ' - ' + estudante.email});
}
}
