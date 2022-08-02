import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/api';
import SubSecao from 'src/app/model/livro/subsecao';
import Query from 'src/app/model/firestore/query';
import { Assunto } from 'src/app/model/questoes/assunto';

@Component({
  selector: 'app-menu-livro',
  templateUrl: './menu-livro.component.html',
  styleUrls: ['./menu-livro.component.css']
})
export class MenuLivroComponent implements OnInit {

  menu: MenuItem[];
  @Output()
  onMenuClick:EventEmitter<any>;

  constructor() {
    this.menu = [];
    this.onMenuClick = new EventEmitter();
  }

  ngOnInit() {

    // Carregar todos os assuntos
    Assunto.getAll().subscribe(assuntos => {
      assuntos.forEach(assunto => {
        if (assunto != null && assunto.nome != null && typeof assunto.pk === "function") {
          let subItens = []
          SubSecao.getAllByAssunto(assunto).subscribe(subsecoes => {

            subsecoes.forEach(subsecao => {
              let subItem = {
                model:subsecao,
                id:subsecao.pk(),
                label: subsecao.nome, command: (event) => {
                  //event.originalEvent: Browser event
                  if(event.item.model != null){
                    this.onMenuClick.emit(event.item.model)
                  }
                }
              };
              subItens.push(subItem);
            })
          })

          let itemMenu = { label: assunto.nome, items: subItens };
          this.menu.push(itemMenu)
        }

      })
    })

  }

}
