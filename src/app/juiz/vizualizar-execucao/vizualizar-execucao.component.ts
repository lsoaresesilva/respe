import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Linha } from 'src/app/model/linha';

@Component({
  selector: 'visualizar-execucao',
  templateUrl: './vizualizar-execucao.component.html',
  styleUrls: ['./vizualizar-execucao.component.css']
})
export class VisualizarExecucacao implements OnInit {
  

  @Input("traceExecucao") traceExecucao;
  @Output() mudancaLinha = new EventEmitter();

  constructor() { }

  linhaAtual = 0 ;
  sequenciaExecucao = 0; // usado para percorrer o array de traces
  linha:Linha[] = [{event:null,func_name:null,globals:null,heap:null,line:null,ordered_globals:null,stack_to_render:null,stdout:null}] // informações sobre a linha atual em execução

  ngOnInit() {

    this.atualizar();
  }

  visualizar(sequencia){
    let linhaEmExecucao = this.traceExecucao.trace[this.sequenciaExecucao].line;
    if(linhaEmExecucao != undefined){
      this.linhaAtual = linhaEmExecucao
      if(sequencia == "++")
        this.sequenciaExecucao++;
      else
        this.sequenciaExecucao--;
      this.atualizar();
    }
  }

  atualizar(){
    this.linha[0]=this.traceExecucao.trace[this.sequenciaExecucao];
    this.mudancaLinha.emit(this.linhaAtual);
  }
}
