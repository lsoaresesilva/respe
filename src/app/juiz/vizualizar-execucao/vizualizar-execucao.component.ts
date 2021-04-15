import { Component, OnInit, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
import Editor from 'src/app/model/editor';
import { Linha } from 'src/app/model/linha';

declare var monaco: any;

@Component({
  selector: 'visualizar-execucao',
  templateUrl: './vizualizar-execucao.component.html',
  styleUrls: ['./vizualizar-execucao.component.css']
})
export class VisualizarExecucacao implements OnInit {
  

  @Input("traceExecucao") traceExecucao;
  @Input()
  editor;


  visualizacao;

  constructor() { }
  
  

  linhaAtual = 0 ;
  sequenciaExecucao = -1; // usado para percorrer o array de traces
  linha:Linha[] = [{event:null,func_name:null,globals:null,heap:null,line:null,ordered_globals:null,stack_to_render:null,stdout:null}] // informações sobre a linha atual em execução

  ngOnInit() {
    this.visualizacao = [];
    this.atualizar();
  }

  prepararVisualizacao(dadosLinha){
    if(Array.isArray(dadosLinha.ordered_globals)){
      let dados = [];
      dadosLinha.ordered_globals.forEach(variavel => {
        let valor = undefined;
        if(Array.isArray(dadosLinha.globals[variavel])){
          valor = this.getValorArray(dadosLinha.globals[variavel][1])
        }else{
          valor = dadosLinha.globals[variavel];
        }
  
        let tipo = typeof valor;
        dados.push({
          variavel:variavel,
          valor:valor,
          tipo:tipo
        })
      });
      
  
      return dados;
    }
    
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
      /* this.linha[0]=this.traceExecucao.trace[this.sequenciaExecucao]; */
      let visualizacao = this.prepararVisualizacao(this.traceExecucao.trace[this.sequenciaExecucao]);
      if(visualizacao.length > 0){
        this.visualizacao = visualizacao;
      }
      
      Editor.getInstance().destacarLinha(this.linhaAtual, 'possivelSolucao', this.editor)
      //this.mudancaLinha.emit(this.linhaAtual);
    }else{
      /* this.linha[0] = this.traceExecucao.trace[0]; */
      let visualizacao = this.prepararVisualizacao(this.traceExecucao.trace[0]);
      if(visualizacao.length > 0){
        this.visualizacao = visualizacao;
      }
      Editor.getInstance().destacarLinha(0, 'possivelSolucao', this.editor)
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


  

  getTipoVariavelNaoPrimitiva(posicao){
    console.log("ble")
    return typeof this.getValorArray(posicao);
  }

  getTipoVariavelPrimitiva(variavel){
    console.log("bla")
    return typeof variavel;
  }
}
