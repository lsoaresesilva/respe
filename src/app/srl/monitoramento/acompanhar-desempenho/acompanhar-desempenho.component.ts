import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login-module/login.service';
import Submissao from 'src/app/model/submissao';
import { Tutor } from 'src/app/model/tutor';
import Query from 'src/app/model/firestore/query';
import Erro from 'src/app/model/errors/erro';
import { ErroCompilacao } from 'src/app/model/errors/analise-compilacao/erroCompilacao';

@Component({
  selector: 'app-acompanhar-desempenho',
  templateUrl: './acompanhar-desempenho.component.html',
  styleUrls: ['./acompanhar-desempenho.component.css']
})
export class AcompanharDesempenhoComponent implements OnInit {

  
  erros;

  constructor(private loginService: LoginService) {

  }

  ngOnInit() {
    Submissao.getAll(new Query("estudanteId", "==", this.loginService.getUsuarioLogado().pk()), "data").subscribe(submissoes => {
      this.erros = ErroCompilacao.getAllErros(submissoes);
      
      //this.errorQuotient = Tutor.calcularErrorQuotient(submissoes);
      //let ranking = Erro.rankErros(dados);
      //let dadosHistograma = Erro.calcularHistogramaPorRank(ranking, submissoes);
      //this.construirGraficoBarras(dadosHistograma, ranking);
    })
    /*ErroCompilacao.getAllErrosEstudante(this.loginService.getUsuarioLogado()).subscribe(resultados => {
    //Erro.getAllErrosEstudante(this.loginService.getUsuarioLogado()).subscribe(resultados => {
      
      this.erros = resultados;
      
      
    })*/
  }

  

}
