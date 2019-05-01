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
        command: () => { this.router.navigate(["main", { outlets: { principal: ['cadastro-planejamento'] } }]) }

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
