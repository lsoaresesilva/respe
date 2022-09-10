import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent implements OnInit {

  @Output()
  abrirAssuntos = new EventEmitter();

  @Output()
  exportarDados = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }



}
