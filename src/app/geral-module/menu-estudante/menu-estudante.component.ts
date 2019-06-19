import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-estudante',
  templateUrl: './menu-estudante.component.html',
  styleUrls: ['./menu-estudante.component.css']
})
export class MenuEstudanteComponent implements OnInit {

  Menu: MenuItem[];
  constructor(private router: Router) {
    
   }

  ngOnInit() {
    this.Menu = [
      {
        label: 'Estudantes',
        command: () => { this.router.navigate(["main", { outlets: { principal: ['listagem-estudantes'] } }]) }

      },
      {
        label: 'Assuntos',
        command: () => { this.router.navigate(["main", { outlets: { principal: ['listagem-assuntos'] } }]) }

      },
      {
        label: 'Questões',
        command: () => { this.router.navigate(["main", { outlets: { principal: ['listagem-questoes'] } }]) }

      },
     
      {
        
     
     
      }
    ];
  }
 
  }
  
