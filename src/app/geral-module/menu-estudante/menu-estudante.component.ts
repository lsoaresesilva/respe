import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login-module/login.service';
import EstudanteTurma from 'src/app/model/estudanteTurma';
import Query from 'src/app/model/firestore/query';

@Component({
  selector: 'app-menu-estudante',
  templateUrl: './menu-estudante.component.html',
  styleUrls: ['./menu-estudante.component.css']
})
export class MenuEstudanteComponent implements OnInit {

  private usuario;
  private estudanteTurma;
  turmaId;

  items: MenuItem[];
  constructor(private router: Router, private login:LoginService) {
    this.usuario = login.getUsuarioLogado();
   

    
   }

  ngOnInit() {
     EstudanteTurma.getAll(new Query("estudanteId", "==", this.usuario.pk())).subscribe(resultado => {
      this.turmaId = resultado[0].turmaId;
    });
    this.items = [
      {
        label: 'Planejamento',
        command: () => { this.router.navigate(["main", { outlets: { principal: ['listagem-planejamento'] } }]) }

      },
      {
        label: 'Assuntos',
        command: () => { this.router.navigate(["main", { outlets: { principal: ['listagem-assuntos'] } }]) }

      },
      {
        label: 'Minha turma',
        command: () => { this.router.navigate(["main", { outlets: { principal: ['visualizacao-turma',this.turmaId] } }]) }
        
      },
      {
        label: 'Sair',
        command: () => {this.logout()}

      },
    ];
  }
  private logout() {
    if(this.login.logout()){
      return this.router.navigate([""])
    }
  }

 
  }
  
