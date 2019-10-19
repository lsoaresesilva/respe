import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login-module/login.service';


@Component({
  selector: 'app-menu-adm',
  templateUrl: './menu-adm.component.html',
  styleUrls: ['./menu-adm.component.css']
})
export class MenuAdmComponent implements OnInit {

  items: MenuItem[];
  constructor(private router: Router,  private login:LoginService) { 
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Assuntos',
        command: () => { this.router.navigate(["main", { outlets: { principal: ['listagem-assuntos'] } }]) }

      },
      {
        label: 'Turmas',
        command: () => { this.router.navigate(["main", { outlets: { principal: ['listagem-turmas'] } }]) }

      },
      {
        label: 'Professores',
        command: () => { this.router.navigate(["main", { outlets: { principal: ['listagem-professores'] } }]) }
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
