import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login-module/login.service';
import Submissao from 'src/app/model/submissao';
import { Tutor } from 'src/app/model/tutor';
import Query from 'src/app/model/firestore/query';
import Erro from 'src/app/model/erro';

@Component({
  selector: 'app-acompanhar-desempenho',
  templateUrl: './acompanhar-desempenho.component.html',
  styleUrls: ['./acompanhar-desempenho.component.css']
})
export class AcompanharDesempenhoComponent implements OnInit {

  errorQuotient;
  erros;

  constructor(private loginService: LoginService) {

  }

  ngOnInit() {
    Submissao.getAll(new Query("estudanteId", "==", this.loginService.getUsuarioLogado().pk()), "data").subscribe(submissoes => {
      this.errorQuotient = Tutor.calcularErrorQuotient(submissoes);

    })

    Erro.getAllErrosEstudante(this.loginService.getUsuarioLogado()).subscribe(resultados => {
      
      this.erros = resultados;
      /*let ranking = Erro.rankErros(dados);
      let dadosHistograma = Erro.calcularHistogramaPorRank(ranking, resultados);
      this.construirGraficoBarras(dadosHistograma, ranking);*/
    })
  }

}
