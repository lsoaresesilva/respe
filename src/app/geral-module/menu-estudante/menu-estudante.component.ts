import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login-module/login.service';

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
  
