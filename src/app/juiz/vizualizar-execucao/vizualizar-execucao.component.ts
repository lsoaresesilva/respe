import { Component, OnInit } from '@angular/core';
import { Linha } from 'src/app/model/Linha';

@Component({
  selector: 'app-vizualizar-execucao',
  templateUrl: './vizualizar-execucao.component.html',
  styleUrls: ['./vizualizar-execucao.component.css']
})
export class VizualizarExecucaoComponent implements OnInit {

  constructor() { }

  linhaAtual =0;
  linha:Linha[] = [{event:null,func_name:null,globals:null,heap:null,line:null,ordered_globals:null,stack_to_render:null,stdout:null}]

  traceExecucao = {
    "code": "a = 2\nx = 3\ny = 4",
    "trace": [
    {
    "line": 1,
    "event": "step_line",
    "func_name": "",
    "globals": {},
    "ordered_globals": [],
    "stack_to_render": [],
    "heap": {},
    "stdout": ""
    },
    {
    "line": 2,
    "event": "step_line",
    "func_name": "",
    "globals": {
    "a": 2
    },
    "ordered_globals": [
    "a"
    ],
    "stack_to_render": [],
    "heap": {},
    "stdout": ""
    },
    {
    "line": 3,
    "event": "step_line",
    "func_name": "",
    "globals": {
    "a": 2,
    "x": 3
    },
    "ordered_globals": [
    "a",
    "x"
    ],
    "stack_to_render": [],
    "heap": {},
    "stdout": ""
    },
    {
    "line": 3,
    "event": "return",
    "func_name": "",
    "globals": {
    "a": 2,
    "x": 3,
    "y": 4
    },
    "ordered_globals": [
    "a",
    "x",
    "y"
    ],
    "stack_to_render": [],
    "heap": {},
    "stdout": ""
    }
    ]
    }

  ngOnInit() {
    this.atualizar();
  }
  avancar(){
    this.linhaAtual++;
    this.atualizar();
  }
  voltar(){
    this.linhaAtual--;
    this.atualizar();
  }
  atualizar(){
    this.linha[0]=this.traceExecucao.trace[this.linhaAtual];
  }
}
