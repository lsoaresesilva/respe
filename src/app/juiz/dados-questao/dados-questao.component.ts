import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Questao } from 'src/app/model/questao';
import Submissao from 'src/app/model/submissao';
import { LoginService } from 'src/app/login-module/login.service';
import { ApresentacaoService } from 'src/app/geral-module/apresentacao.service';

@Component({
  selector: 'dados-questao',
  templateUrl: './dados-questao.component.html',
  styleUrls: ['./dados-questao.component.css']
})
export class DadosQuestaoComponent implements AfterViewInit {

  @Input()
  questao?:Questao;

  @Input()
  submissao?:Submissao;

  constructor(private login:LoginService, private apresentacao:ApresentacaoService) { 

  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void { // PROBLEMA: mudou a estrutura, não há mais resultado test case. apenas submissao
    
    
    if(this.submissao != undefined && this.submissao.resultadosTestsCases != undefined && this.questao.testsCases != undefined){
      this.submissao.resultadosTestsCases.forEach(resultadoTestCase=>{
        this.questao.testsCases.forEach(testCase=>{
          if(testCase.id == resultadoTestCase.testCase.id){
            testCase["resultado"] = resultadoTestCase;
          }
        });
      })
    }
  }

  ngAfterViewInit() {
    this.apresentacao.apresentarEditor(this.login.getUsuarioLogado());
  }


}
