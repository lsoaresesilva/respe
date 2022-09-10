import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import Erro from 'src/app/model/errors/erro';
import { ErroCompilacao } from 'src/app/model/errors/analise-compilacao/erroCompilacao';
import {
  LabelCategoriasErros,
  getLabelPorCategoriaNumero,
} from 'src/app/model/errors/enum/labelCategoriasErro';
import { CategoriaErro } from 'src/app/model/errors/enum/categoriasErro';
import FrequenciaErro from 'src/app/model/errors/analise-compilacao/frequenciaErro';

@Component({
  selector: 'app-card-erros-programacao-pizza',
  templateUrl: './card-erros-programacao-pizza.component.html',
  styleUrls: ['./card-erros-programacao-pizza.component.css'],
})
export class CardErrosProgramacaoPizzaComponent implements OnInit, OnChanges {
  @Input() erros;
  dadosProcessados;
  grafico;

  @ViewChild('chart') chart: any;

  constructor() {
    this.grafico = {
      labels: [],
      datasets: [],
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.erros != null && Array.isArray(this.grafico.datasets) && this.grafico.datasets.length == 0) {
      const frequenciaPorTipoErro = FrequenciaErro.calcularFrequenciaPorTipoErro(this.erros);
      this.construirGraficoPizza(frequenciaPorTipoErro);
    }
  }

  ngOnInit() {

  }

  construirGraficoPizza(frequencias: FrequenciaErro[]) {
    if (frequencias != undefined && Array.isArray(frequencias)) {
      const labels = [];
      const backgroundColors = [];
      const data = [];

      frequencias.forEach((frequencia) => {
        labels.push(getLabelPorCategoriaNumero(frequencia.categoriaErro));
        backgroundColors.push(ErroCompilacao.getCorErro(frequencia.categoriaErro));
        data.push(frequencia.contagem);
      });

      this.grafico = {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: backgroundColors,
          },
        ],
      };

      this.grafico = Object.assign({}, this.grafico);
    }
  }

  getCorErro(tipo) {
    switch (tipo) {
      case 1:
        return '#FFBF00';
      case 2:
        return '#80FF00';
      case 3:
        return '#A9F5F2';
      case 4:
        return '#08298A';

      default:
        return '';
    }
  }

  /*construirGraficoPizza() {



    let labels = [];
    let backgroundColors = []
    let data = []

    if (this.dadosProcessados.ComparacaoApenasUmaIgualdade > 0) {
      labels.push(TipoErro.comparacaoApenasUmaIgualdadeTexto);
      backgroundColors.push(Erro.getCorErro(TipoErro.comparacaoApenasUmaIgualdade));
      data.push(this.dadosProcessados.comparacaoApenasUmaIgualdade);
    }
    if (this.dadosProcessados["declaracaoVariavelComDoisIguais"] > 0) {
      labels.push(TipoErro.declaracaoVariavelComDoisIguaisTexto);
      backgroundColors.push(Erro.getCorErro(TipoErro.declaracaoVariavelComDoisIguais));
      data.push(this.dadosProcessados.declaracaoVariavelComDoisIguais);
    } if (this.dadosProcessados.espacoNoNomeVariavel > 0) {
      labels.push(TipoErro.espacoNoNomeVariavelTexto);
      backgroundColors.push(Erro.getCorErro(TipoErro.espacoNoNomeVariavel));
      data.push(this.dadosProcessados.espacoNoNomeVariavel);
    } if (this.dadosProcessados.faltaDoisPontosCondicaoTexto > 0) {
      labels.push(TipoErro.faltaDoisPontosCondicaoTexto);
      data.push(this.dadosProcessados.faltaDoisPontosCondicao);
      backgroundColors.push(Erro.getCorErro(TipoErro.faltaDoisPontosCondicao));
    } if (this.dadosProcessados.faltaDoisPontosFuncao > 0) {
      labels.push(TipoErro.faltaDoisPontosFuncaoTexto);
      backgroundColors.push(Erro.getCorErro(TipoErro.faltaDoisPontosFuncao));
      data.push(this.dadosProcessados.faltaDoisPontosFuncao);
    } if (this.dadosProcessados.faltaParentesis > 0) {
      labels.push(TipoErro.faltaParentesisTexto);
      backgroundColors.push(Erro.getCorErro(TipoErro.faltaParentesis));
      data.push(this.dadosProcessados.faltaParentesis);
    } if (this.dadosProcessados.faltaVirgulaParametros > 0) {
      labels.push(TipoErro.faltaVirgulaParametrosTexto);
      backgroundColors.push(Erro.getCorErro(TipoErro.faltaVirgulaParametros));
      data.push(this.dadosProcessados.faltaVirgulaParametros);
    } if (this.dadosProcessados.numeroDecimalComVirgula > 0) {
      labels.push(TipoErro.numeroDecimalComVirgulaTexto);
      backgroundColors.push(Erro.getCorErro(TipoErro.numeroDecimalComVirgula));
      data.push(this.dadosProcessados.numeroDecimalComVirgula);
    } if (this.dadosProcessados.parDadosComparacao > 0) {
      labels.push(TipoErro.parDadosComparacaoTexto);
      backgroundColors.push(Erro.getCorErro(TipoErro.parDadosComparacao));
      data.push(this.dadosProcessados.parDadosComparacao);
    } if (this.dadosProcessados.variavelNaoDeclarada > 0) {
      labels.push(TipoErro.variavelNaoDeclaradaTexto);
      data.push(this.dadosProcessados.variavelNaoDeclarada);
      backgroundColors.push(Erro.getCorErro(TipoErro.variavelNaoDeclarada));
    }


    this.grafico = {
      data: data,
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: backgroundColors
        }]
    };

  }*/
}
