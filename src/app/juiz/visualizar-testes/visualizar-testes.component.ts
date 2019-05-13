import { Component, OnInit, Input, OnChanges } from '@angular/core';
import ResultadoTestCase from 'src/app/model/resultadoTestCase';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-visualizar-testes',
  templateUrl: './visualizar-testes.component.html',
  styleUrls: ['./visualizar-testes.component.css']
})
export class VisualizarTestesComponent implements OnInit, OnChanges {
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if(this.testsCases != undefined && this.submissao != undefined){
      let consultas:any = {};
      this.testsCases.forEach(testCase=>{
        
        consultas[testCase.pk()] = ResultadoTestCase.getRecentePorSubmissaoTestCase(testCase, this.submissao);
      })

      forkJoin(consultas).subscribe(resultados=>{

        for(let key in resultados){
          if(resultados[key] != null){
            this.testsCases.forEach(testCase=>{
              if(testCase.pk() == key){
                testCase["resultadoTestCase"] = resultados[key];
              }
            });
          }
          
        }
      })
    }
  }

  @Input() testsCases?:any[];
  @Input() submissao;

  resultadosTestsCases;

  constructor() {
    this.resultadosTestsCases = [];
    this.testsCases = [];
  }

  ngOnInit() {

    
  }



}
