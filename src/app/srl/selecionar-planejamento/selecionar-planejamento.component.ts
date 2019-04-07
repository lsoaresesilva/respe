import { Component, OnInit } from '@angular/core';
import { Assunto } from '../../model/assunto';

@Component({
  selector: 'app-selecionar-planejamento',
  templateUrl: './selecionar-planejamento.component.html',
  styleUrls: ['./selecionar-planejamento.component.css']
})
export class SelecionarPlanejamentoComponent implements OnInit {

  assuntos;

  constructor() { }

  ngOnInit() {
    Assunto.getAll().subscribe(assuntos=>{this.assuntos= assuntos});
  }

  cadastrarPlanejamento(nome){
    //cadastrar
  }

}
