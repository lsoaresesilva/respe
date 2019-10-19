import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login-module/login.service';

@Component({
  selector: 'app-menu-professor',
  templateUrl: './menu-professor.component.html',
  styleUrls: ['./menu-professor.component.css']
})
export class MenuProfessorComponent implements OnInit {

  items: MenuItem[];
  constructor(private router: Router, private login:LoginService) {
    
   }

  ngOnInit() {
    this.items = [
      {
        label: 'Turmas',
        command: () => { this.router.navigate(["main", { outlets: { principal: ['listagem-turmas-professor'] } }]) }

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
  