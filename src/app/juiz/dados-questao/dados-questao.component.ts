import { Component, OnInit, Input } from '@angular/core';
import { Questao } from 'src/app/model/questao';

@Component({
  selector: 'dados-questao',
  templateUrl: './dados-questao.component.html',
  styleUrls: ['./dados-questao.component.css']
})
export class DadosQuestaoComponent implements OnInit {

  @Input("questao")
  questao?:Questao;

  constructor() { 

  }

  ngOnInit() {
  }

}
