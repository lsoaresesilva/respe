import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/components/common/menuitem';
import { Router } from '@angular/router';

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
        label: 'Novo',
        command: () => { this.router.navigate(["main", { outlets: { principal: ['editor'] } }]) }

      },
      {
        label: 'Meu progresso',
        command: () => { this.router.navigate(["main", { outlets: { principal: ['progresso'] } }]) }
      },
      {
        label: 'Progresso da turma',
        command: () => { this.router.navigate(["main", { outlets: { principal: ['progressoTurma'] } }]) }
      }
    ];
  }


}
