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

  decorations;

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
      this.destacarLinha(this.linhaAtual, 'possivelSolucao')
      //this.mudancaLinha.emit(this.linhaAtual);
    }else{
      this.linha[0] = this.traceExecucao.trace[0];
      this.destacarLinha(0, 'possivelSolucao')
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


  destacarLinha(linha, status) {
    if (linha != NaN && linha != undefined) {
      linha = parseInt(linha);
      if (linha > 0 && linha <= this.editor.getModel().getLineCount()) {
        const lineLength = this.editor.getModel().getLineLength(linha);
        let decorations = [
          {
            range: new monaco.Range(linha, 1, linha, lineLength),
            options: {
              isWholeLine: true,
              className: status,
            },
          },
        ];

        
        if( Editor.getInstance().decorations == null){
          Editor.getInstance().decorations = this.editor.deltaDecorations([], [{ range: new monaco.Range(1,1,1,1), options : { } }]);
        }
          
        Editor.getInstance().decorations = this.editor.deltaDecorations(Editor.getInstance().decorations, decorations);
        
        
      }
    }
  }
}
