import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';

@Component({
  selector: 'app-cadastro-planejamento',
  templateUrl: './cadastro-planejamento.component.html',
  styleUrls: ['./cadastro-planejamento.component.css']
})
export class CadastroPlanejamentoComponent implements OnInit {

  horas = 1;
  importancia;
  dificuldade;
  dificuldades: SelectItem[];


  constructor() { }

  ngOnInit() {
    this.dificuldades=[
      {label:'Selecione uma dificuldade', value:null},
      {label:'New York', value:{id:1, nome: 'New York', code: 'NY'}},
      {label:'Rome', value:{id:2, nome: 'Rome', code: 'RM'}},
      {label:'London', value:{id:3, nome: 'London', code: 'LDN'}},
      {label:'Istanbul', value:{id:4, nome: 'Istanbul', code: 'IST'}},
      {label:'Paris', value:{id:5, nome: 'Paris', code: 'PRS'}}
    ];
  }

}
