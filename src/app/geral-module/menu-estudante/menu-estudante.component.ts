import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/juiz/login.service';

@Component({
  selector: 'app-menu-estudante',
  templateUrl: './menu-estudante.component.html',
  styleUrls: ['./menu-estudante.component.css']
})
export class MenuEstudanteComponent implements OnInit {

  items: MenuItem[];
  constructor(private router: Router, private login:LoginService) {
    
   }

  ngOnInit() {
    this.items = [
      {
        label: 'Estudantes',
        command: () => { this.router.navigate(["main", { outlets: { principal: ['listagem-estudantes'] } }]) }

      },
      {
        label: 'Assuntos',
        command: () => { this.router.navigate(["main", { outlets: { principal: ['listagem-assuntos'] } }]) }

      },
      {
        label: 'Turmas',
        command: () => { this.router.navigate(["main", { outlets: { principal: ['listagem-turmas'] } }]) }

      },
      {
        label: 'Logout',
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
  
