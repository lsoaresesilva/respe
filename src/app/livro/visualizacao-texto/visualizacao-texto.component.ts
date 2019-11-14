import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-visualizacao-texto',
  templateUrl: './visualizacao-texto.component.html',
  styleUrls: ['./visualizacao-texto.component.css']
})
export class VisualizacaoTextoComponent implements OnInit {

  @Input() texto;

  constructor() { }

  ngOnInit() {
  }

}
