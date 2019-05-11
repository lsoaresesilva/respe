import { Component, OnInit, Input } from '@angular/core';
import ResultadoTestCase from 'src/app/model/resultadoTestCase';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-visualizar-testes',
  templateUrl: './visualizar-testes.component.html',
  styleUrls: ['./visualizar-testes.component.css']
})
export class VisualizarTestesComponent implements OnInit {

  @Input() testsCases;
  @Input() submissao;

  resultadosTestsCases;

  constructor() {
    this.resultadosTestsCases = [];
  }

  ngOnInit() {

    if(this.testsCases != undefined && this.submissao != undefined){
      let consultas = [];
      this.testsCases.forEach(testCase=>{
        consultas.push(ResultadoTestCase.getRecentePorSubmissaoTestCase(testCase, this.submissao));
      })

      forkJoin(consultas).subscribe(resultados=>{
        this.resultadosTestsCases = resultados;
      })
    }
  }

  getResultado(testCase){
    this.resultadosTestsCases.forEach(resultado=>{
      if(resultado.testCase.pk() == testCase.pk()){
        return resultado;
      }
    })
  }



}
