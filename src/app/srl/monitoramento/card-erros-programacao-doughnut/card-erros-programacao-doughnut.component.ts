import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ErroCompilacao } from 'src/app/model/errors/analise-compilacao/erroCompilacao';
import FrequenciaErro from 'src/app/model/errors/analise-compilacao/frequenciaErro';
import { getLabelPorCategoriaNumero } from 'src/app/model/errors/enum/labelCategoriasErro';

@Component({
  selector: 'app-card-erros-programacao-doughnut',
  templateUrl: './card-erros-programacao-doughnut.component.html',
  styleUrls: ['./card-erros-programacao-doughnut.component.css'],
})
export class CardErrosProgramacaoDoughnutComponent implements OnInit {
  @Input() erros;
  dadosProcessados;
  grafico;

  @ViewChild('dought') chart: any;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.erros != null) {
      const frequenciaPorTipoErro = FrequenciaErro.calcularFrequenciaPorTipoErro(this.erros);
      this.construirGraficoPizza(frequenciaPorTipoErro);
    }
  }

  ngOnInit() {
    this.grafico = {
      labels: [],
      datasets: [],
    };
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
}
