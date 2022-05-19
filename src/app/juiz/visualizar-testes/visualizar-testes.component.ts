import { Component, OnInit, Input, OnChanges } from '@angular/core';
import ResultadoTestCase from 'src/app/model/resultadoTestCase';
import { forkJoin, Observable } from 'rxjs';
import { LoginService } from 'src/app/login-module/login.service';
import Usuario from 'src/app/model/usuario';

@Component({
  selector: 'app-visualizar-testes',
  templateUrl: './visualizar-testes.component.html',
  styleUrls: ['./visualizar-testes.component.css']
})
export class VisualizarTestesComponent implements OnInit, OnChanges {

  @Input()
  questao;

  @Input() submissao?;
  
  estudante:Usuario;

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    // PROBLEMA: mudou a estrutura, não há mais resultado test case. apenas submissao

    if (
      this.submissao != undefined &&
      this.submissao.resultadosTestsCases != undefined &&
      this.questao != undefined &&
      this.questao.testsCases != undefined
    ) {
      // Remover o quarto caso de teste 
      if (this.questao.testsCases.length === 4) {
        this.questao.testsCases.pop();
      }
      
      this.submissao.resultadosTestsCases.forEach((resultadoTestCase) => {
        this.questao.testsCases.forEach((testCase) => {
          if (testCase.id == resultadoTestCase.testCase.id) {
            testCase['resultado'] = resultadoTestCase;
          }
        });
      });
    }
  }

  apresentarSaidas(saida) {
    if (Array.isArray(saida)) {
      let retorno = '';
      saida.forEach(function (valor) {
        retorno += valor + '</br>';
      });

      return retorno;
    }

    return saida;
  }

  


  constructor(private login:LoginService) {
    this.estudante = this.login.getUsuarioLogado();
  }

  ngOnInit() {

    
  }



}
