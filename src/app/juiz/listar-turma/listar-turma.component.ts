import { Component, OnInit } from '@angular/core';
import Turma from 'src/app/model/turma';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

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
  usuario;


  constructor(public router: Router, private messageService: MessageService, private login:LoginService) { 
    this.usuario = this.login.getUsuarioLogado()};

  ngOnInit() {
    Turma.getAll().subscribe(turma => { this.turmas = turma });

    if(this.usuario.perfil == 3){
    this.items = [
      { label: 'Vizualizar', icon: 'pi pi-search', command: (event) => this.visualizar(this.selectedTurma) },
      { label: 'Apagar', icon: 'pi pi-times', command: (event) => this.deletar(this.selectedTurma) },
      { label: 'Alterar', icon: '°', command: (event) => this.atualizar(this.selectedTurma) }
    ];
  }
  
  }
  abrirPerfilTurma(turma){
    this.router.navigate(['main', { outlets: { principal: ['visualizacao-turma', turma.pk()] } }]);
  }
  visualizar(turma: Turma) {

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


