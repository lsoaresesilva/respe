import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/components/common/menuitem';
import { Router } from '@angular/router';
import Usuario from 'src/app/model/usuario';
import { LoginService } from 'src/app/juiz/login.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  itens: MenuItem[];


  constructor(private router: Router, private login:LoginService) { }

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
        label: 'QuestõesFechadas',
        command: () => { this.router.navigate(["main", { outlets: { principal: ['listagem-questoes-fechadas'] } }]) }

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
    if(this.login.logout()){
      return this.router.navigate([""])
    }
  }


}
