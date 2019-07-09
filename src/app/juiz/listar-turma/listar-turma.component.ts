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

  turmas: Turma[];
  cols: any[];
  selectedTurma: Turma;
  items: MenuItem[];
  estudante: Turma;
  id: Turma;


  constructor(public router: Router, private messageService: MessageService) { }

  ngOnInit() {
    Turma.getAll().subscribe(turma => { this.turmas = turma });

    this.items = [
      { label: 'Vizualizar', icon: 'pi pi-search', command: (event) => this.visualizar(this.selectedTurma) },
      { label: 'Apagar', icon: 'pi pi-times', command: (event) => this.deletar(this.selectedTurma) },
      { label: 'Alterar', icon: '°', command: (event) => this.atualizar(this.selectedTurma) }
    ];
  }

  visualizar(turma: Turma) {
    this.messageService.add({ severity: 'info', summary: 'Car Selected', detail: turma.nome + ' - ' + turma.estudantes });

  }
  abrirPerfilTurma(turma){
    this.router.navigate(['main', { outlets: { principal: ['visualizacao-turma', turma.pk()] } }]);

  }

  atualizar(turma: Turma) {
    this.router.navigate(["main", { outlets: { principal: ['atualizacao-turma', turma.pk()] } }]);
  }

  cadastrar() {
    this.router.navigate(["main", { outlets: { principal: ['cadastro-turma'] } }]);
  }


  deletar(turma: Turma) {
    Turma.delete(turma.pk()).subscribe(resultado => {
      // TODO: usar o message service
      Turma.getAll().subscribe(turma => { this.turmas = turma });
    });

  }
}


