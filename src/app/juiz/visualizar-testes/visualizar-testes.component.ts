import { Component, OnInit, Input, OnChanges } from '@angular/core';
import ResultadoTestCase from 'src/app/model/resultadoTestCase';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-visualizar-testes',
  templateUrl: './visualizar-testes.component.html',
  styleUrls: ['./visualizar-testes.component.css']
})
export class VisualizarTestesComponent implements OnInit, OnChanges {
  
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void { // PROBLEMA: mudou a estrutura, não há mais resultado test case. apenas submissao
    
    
    if(this.submissao != undefined && this.submissao.resultadosTestsCases != undefined && this.testsCases != undefined){
      this.submissao.resultadosTestsCases.forEach(resultadoTestCase=>{
        this.testsCases.forEach(testCase=>{
          if(testCase.id == resultadoTestCase.testCase.id){
            testCase["resultadoTestCase"] = resultadoTestCase;
          }
        });
      })
    }
  }

  @Input() submissao?;
  @Input() testsCases?;

  resultadosTestsCases;

  constructor() {
    this.resultadosTestsCases = [];
  }

  ngOnInit() {

    
  }



}
