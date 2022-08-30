import { Component, OnInit } from '@angular/core';
import Turma from 'src/app/model/turma';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { LoginService } from '../../login-module/login.service';
import Query from 'src/app/model/firestore/query';

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
    this.usuario = this.login.getUsuarioLogado()
  };

  ngOnInit() {
    Turma.getAll(new Query("professorId", "==", this.usuario.pk())).subscribe(turma => { this.turmas = turma });

    if(this.usuario.perfil == 3){
    this.items = [
      { label: 'Vizualizar', icon: 'pi pi-search', command: (event) => this.visualizar(this.selectedTurma) },
      { label: 'Apagar', icon: 'pi pi-times', command: (event) => this.deletar(this.selectedTurma) },
      { label: 'Alterar', icon: '°', command: (event) => this.atualizar(this.selectedTurma) }
    ];
  }

  }
  // abrirPostagensTurma(turma){
  //   this.router.navigate(['geral/main', { outlets: { principal: ['listar-postagens', turma.pk()] } }]);
  // }
  visualizar(turma: Turma) {
    this.messageService.add({ severity: 'info', summary: 'Estudante selecionado', detail: turma.nome});

  }
  atualizar(turma: Turma) {
    this.router.navigate(["main", { outlets: { principal: ['atualizacao-turma', turma.pk()] } }]);
  }

  cadastrar() {
    this.router.navigate(["main", { outlets: { principal: ['cadastro-turma'] } }]);
  }
  visualizarTurma(turma){
    //this.router.navigate(["main", { outlets: { principal: ['visualizacao-turma', turma.pk()] } }]);
    if(turma != undefined && turma.codigo != null)
      this.router.navigate(["geral/main", { outlets: { principal: ['turma', 'visualizar-turma', turma.codigo] } }]);
  }


  deletar(turma: Turma) {
    Turma.delete(turma.pk()).subscribe(resultado => {
      // TODO: usar o message service
      Turma.getAll().subscribe(turma => { this.turmas = turma });
    });

  }
}


