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
  sequenciaExecucao = -1; // usado para percorrer o array de traces
  linha:Linha[] = [{event:null,func_name:null,globals:null,heap:null,line:null,ordered_globals:null,stack_to_render:null,stdout:null}] // informações sobre a linha atual em execução

  ngOnInit() {

    this.atualizar();
  }

  visualizar(sequencia){
    if(sequencia == "++")
        this.sequenciaExecucao++;
    else
        this.sequenciaExecucao--;
    let linhaEmExecucao = this.traceExecucao.trace[this.sequenciaExecucao].line;
    if(/*this.traceExecucao.trace[this.sequenciaExecucao].event != "return" && */linhaEmExecucao != undefined){
      this.linhaAtual = linhaEmExecucao
      
      this.atualizar();
    }
  }

  atualizar(){
    if(this.sequenciaExecucao >= 0){
      this.linha[0]=this.traceExecucao.trace[this.sequenciaExecucao];
      this.mudancaLinha.emit(this.linhaAtual);
    }else{
      this.linha[0] = this.traceExecucao.trace[0];
      this.mudancaLinha.emit(0);
    }
    
  }

  isArray(variavel){
    return typeof variavel === "object";
  }

  getValorArray(posicao){
    let valores = this.traceExecucao.trace[this.sequenciaExecucao].heap[posicao]
    
    valores = valores.filter(valor=>{
      if( valor == "LIST")
        return false;
      return true;
    })

    return valores;
  }
}
