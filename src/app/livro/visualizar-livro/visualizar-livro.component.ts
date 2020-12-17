import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visualizar-livro',
  templateUrl: './visualizar-livro.component.html',
  styleUrls: ['./visualizar-livro.component.css']
})
export class VisualizarLivroComponent implements OnInit {

  subsecao;

  constructor() { }

  ngOnInit() {
  }

  onMenuClick(subsecao){
    this.subsecao = subsecao;
  }

}
