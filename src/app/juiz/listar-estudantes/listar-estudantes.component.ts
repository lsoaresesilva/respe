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
  cols: any[];
  selectedEstudante: Estudante;
  selectEstudante: Estudante[];
  items: MenuItem[];
  estudante : Estudante;
  id:Estudante;
  ehAdm=true;
 

constructor(public router : Router, private messageService: MessageService) { 
  
}

ngOnInit() {

  Estudante.getAll().subscribe  (estudante =>{this.estudantes = estudante , console.log ( this.estudantes)});


  this.cols = [
      { field: 'vin', header: 'Vin' },
      { field: 'year', header: 'Year' },
      { field: 'brand', header: 'Brand' },
      { field: 'color', header: 'Color' }
  ];

  this.items = [
      { label: 'Vizualizar', icon: 'pi pi-search', command: (event) => this.vizualizar(this.selectedEstudante) },
      { label: 'Deletar', icon: 'pi pi-times', command: (event) => this.deleteEstudante(this.selectedEstudante) },
      { label: 'Atualizar', icon: '°', command: (event) => this.atualizar(this.selectedEstudante) }
  ];
}

vizualizar(estudante:Estudante) {
this.messageService.add({ severity: 'info', summary: 'Car Selected', detail: estudante.nome + ' - ' + estudante.email});

}

atualizar(estudante : Estudante){
  this.router.navigate(["main", { outlets: { principal: ['cadastro-estudante/'+ estudante.pk()] } }]);
}


delete (estudante:Estudante) {
  Estudante.delete(estudante.pk()).subscribe(resultado=>{ console.log("resultado é " + resultado);
    console.log("PK é "+estudante.pk());

 });
 console.log(estudante.pk());

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
console.log ("Deletado");
this.messageService.add({ severity: 'info', summary: 'Estudante deletado', detail: estudante.nome + ' - ' + estudante.email});
}
}
