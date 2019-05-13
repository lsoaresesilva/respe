import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/components/common/menuitem';
import { Router } from '@angular/router';
import Usuario from 'src/app/model/usuario';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  itens: MenuItem[];


  constructor(private router: Router) { }

  ngOnInit() {

    this.itens = [
      {
        label: 'Planejamento',
        command: () => { this.router.navigate(["main", { outlets: { principal: ['listagem-planejamento'] } }]) }

      },
      {
        label: 'Questões',
        command: () => { this.router.navigate(["main", { outlets: { principal: ['listagem-questoes'] } }]) }

      },
      {
        label: 'Turmas',
        command: () => { this.router.navigate(["main", { outlets: { principal: ['listagem-turmas'] } }]) }

      },
      {
        label: 'Estudantes',
        command: () => { this.router.navigate(["main", { outlets: { principal: ['listagem-estudantes'] } }]) }

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
    if(Usuario.logout()){
      return this.router.navigate([""])
    }
  }


}
