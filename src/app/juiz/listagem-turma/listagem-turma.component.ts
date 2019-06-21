import { Component, OnInit } from '@angular/core';
import Turma from 'src/app/model/turma';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listagem-turma',
  templateUrl: './listagem-turma.component.html',
  styleUrls: ['./listagem-turma.component.css']
})
export class ListagemTurmaComponent implements OnInit {


  turmas: Turma[];
  turmass: Turma;

    cols: any[];

    selectedTurma: Turma;

    selectTurma: Turma[];

    items: MenuItem[];
  turmaCollection: any;
 
  

  constructor(public router : Router, private messageService: MessageService) {
    

   }

   deletar(turma){
    this.turmaCollection.doc(turma).delete();
  }
  ngOnInit() {
    Turma.getAll().subscribe (turma =>{this.turmas = turma});
    
    this.cols = [
      { field: 'vin', header: 'Vin' },
      { field: 'year', header: 'Year' },
      { field: 'brand', header: 'Brand' },
      { field: 'color', header: 'Color' }
  ];

  this.items = [
      { label: 'View', icon: 'pi pi-search', command: (event) => this.viewCar(this.selectedTurma) },
      { label: 'Delete', icon: 'pi pi-times', command: (event) => this.deletar(this.selectTurma) }
  ];
}

viewCar(turma: Turma) {
  this.messageService.add({ severity: 'info', summary: 'Car Selected', detail: turma.nome + ' - ' + turma.estudantes});
}
deletarTurma(turma: Turma) {
  let index = -1;
  for (let i = 0; i < this.turmas.length; i++) {
      if (this.turmas[i].id == turma.id) {
          index = i;
          break;
      }
  }
  this.turmas.splice(index, 1);

  this.messageService.add({ severity: 'info', summary: 'Estudante deletado', detail: turma.nome + ' - ' + turma.id });
}
}

  
