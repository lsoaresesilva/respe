import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-visualizar-testes',
  templateUrl: './visualizar-testes.component.html',
  styleUrls: ['./visualizar-testes.component.css']
})
export class VisualizarTestesComponent implements OnInit {

  @Input() resultados;

  constructor() { 
    
    
  }

  ngOnInit() {


  }

}
