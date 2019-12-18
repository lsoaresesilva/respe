import { Component, OnInit } from '@angular/core';
import Turma from 'src/app/model/turma';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { LoginService } from '../../login-module/login.service';

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
      { label: 'Deletar', icon: 'pi pi-times', command: (event) => this.deletar(this.selectedTurma) }
    ];
  }

  
  
  }
  // abrirPostagensTurma(turma){
  //   this.router.navigate(['main', { outlets: { principal: ['listar-postagens', turma.pk()] } }]);
  // }

  

  atualizar(turma: Turma) {
    if(Turma != undefined){
      this.router.navigate(["main", { outlets: { principal: ['atualizacao-turma', turma.pk()] } } ] );
    }
  }

  cadastrar() {
    this.router.navigate(["main", { outlets: { principal: ['cadastro-turma'] } }]);
  }
  visualizarTurma(turma){
    this.router.navigate(["main", { outlets: { principal: ['visualizacao-turma', turma.pk()] } }]);
  }


  deletar(turma: Turma) {
    Turma.delete(turma.pk()).subscribe(resultado => {
      Turma.getAll().subscribe(turma => { this.turmas = turma });
    });
   this.messageDeletar();
  }

  messageDeletar() {
    this.messageService.add({severity:'error', summary:'Deletado!', detail:"Essa turma foi apagada!"});
  }
}


