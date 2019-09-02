import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/components/common/menuitem';
import { Router } from '@angular/router';
import Usuario from 'src/app/model/usuario';
import { LoginService } from 'src/app/login-module/login.service';
import geradorCodigo from 'src/app/util/geradorCodigo';
import GeradorCodigo from 'src/app/util/geradorCodigo';
import EstudanteTurma from 'src/app/model/estudanteTurma';
import Query from 'src/app/model/firestore/query';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  itens: MenuItem[];
  private usuario;
  private estudanteTurma;
  turmaId;


  constructor(private router: Router, private login:LoginService) { 
    this.usuario = this.login.getUsuarioLogado();
  }

  ngOnInit() {
        EstudanteTurma.getAll(new Query("estudanteId", "==", this.usuario.pk())).subscribe(resultado => {
      this.turmaId = resultado[0].turmaId;
    });

    this.itens = [
      {
        label: 'Planejamento',
        command: () => { this.router.navigate(["main", { outlets: { principal: ['listagem-planejamento'] } }]) }

      },
      {
        label: 'Turmas',
        command: () => { this.router.navigate(["main", { outlets: { principal: ['listagem-turmas'] } }]) }

      },
      {
        label: 'Estudantes',
        command: () => { this.router.navigate(["main", { outlets: { principal: ['listagem-estudantes', this.turmaId] } }]) }

      },
      {
        label: 'Assuntos',
        command: () => { this.router.navigate(["main", { outlets: { principal: ['listagem-assuntos'] } }]) }

      },
      {
        label: 'Logout',
        command: () => {this.logout()}
      }
    ];

  }

  private logout() {
    if(this.login.logout()){
      return this.router.navigate([""])
    }
  }


}
