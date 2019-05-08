import { Component, OnInit } from '@angular/core';
import Turma from 'src/app/model/turma';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-turma',
  templateUrl: './listar-turma.component.html',
  styleUrls: ['./listar-turma.component.css']
})
export class ListarTurmaComponent implements OnInit {

  turmas:Turma[];
  cols: any[];
  selectedTurma: Turma;
  items: MenuItem[];
  estudante : Turma;
  id:Turma;
  

constructor(public router : Router, private messageService: MessageService) { }

ngOnInit() {
  Turma.getAll().subscribe  (turma =>{this.turmas = turma});
  
  this.cols = [
    { field: 'vin', header: 'Vin' },
    { field: 'year', header: 'Year' },
    { field: 'brand', header: 'Brand' },
    { field: 'color', header: 'Color' }
];

this.items = [
    { label: 'Vizualizar', icon: 'pi pi-search', command: (event) => this.vizualizar(this.selectedTurma) },
    { label: 'Deletar', icon: 'pi pi-times', command: (event) => this.delete(this.selectedTurma) },
    { label: 'Atualizar', icon: '°', command: (event) => this.atualizar(this.selectedTurma) }
];
}

vizualizar(turma:Turma) {
this.messageService.add({ severity: 'info', summary: 'Car Selected', detail: turma.nome + ' - ' + turma.id});

}

atualizar(turma: Turma){
  this.router.navigate(["main", { outlets: { principal: ['atualizacao-questao', turma.pk()] } } ] );
  //this.router.navigate(["main", { outlets: { principal: ['atualizar-estudante'+ turma.pk()] } }])
  

}


delete (turma:Turma) {
  Turma.delete(turma.pk()).subscribe(resultado=>{ console.log("resultado é " + resultado);
    console.log("PK é "+ turma.pk());

 });
 console.log(turma.pk());

}



deleteTurma(turma:Turma) {
let index = -1;
for (let i = 0; i < this.turmas.length; i++) {
    if (this.turmas[i].id == turma.id) {
        index = i;
       
        break;
  
    }
}
this.turmas.splice(index, 1);
this.delete(turma);
console.log ("Deletado");
this.messageService.add({ severity: 'info', summary: 'Estudante deletado', detail: turma.nome + ' - ' + turma.id});
}
}


