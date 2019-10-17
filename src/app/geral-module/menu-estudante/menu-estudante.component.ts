import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

import EstudanteTurma from 'src/app/model/estudanteTurma';
import Query from 'src/app/model/firestore/query';
import Turma from 'src/app/model/turma';
import { LoginService } from 'src/app/login-module/login.service';

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
        label: 'Planejamentos',
        command: () => { this.router.navigate(["main", { outlets: { principal: ['listagem-planejamento'] } }]) }

      },
      {
        label: 'Minha turma',
        command: () => { this.router.navigate(["main", { outlets: { principal: ['minha-turma'] } }]) }

      },
    ];
 
  }
  private logout() {
    if(this.login.logout()){
      return this.router.navigate([""])
    }
  }

  
    
    

 
  }
  
