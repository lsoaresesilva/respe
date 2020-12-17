import { Component, OnInit, Input } from '@angular/core';
import Erro from 'src/app/model/errors/erro';
import HistogramaErroData from 'src/app/model/errors/analise-compilacao/frequenciaErro';
import { getLabelPorCategoriaNumero } from 'src/app/model/errors/enum/labelCategoriasErro';
import { ErroCompilacao } from 'src/app/model/errors/analise-compilacao/erroCompilacao';
import { CategoriaErro } from 'src/app/model/errors/enum/categoriasErro';
import FrequenciaErro from 'src/app/model/errors/analise-compilacao/frequenciaErro';

@Component({
  selector: 'app-card-historico-erros',
  templateUrl: './card-historico-erros.component.html',
  styleUrls: ['./card-historico-erros.component.css'],
})
export class CardHistoricoErrosComponent implements OnInit {
  graficoBarra;
  opcoes;
  @Input() erros;

  constructor() {}

  ngOnInit() {
    let dadosBarra = [];
    this.graficoBarra = {
      data: dadosBarra,
      labels: [],
      datasets: [
        {
          data: dadosBarra,
          backgroundColor: [],
        },
      ],
    };
    this.opcoes = {
      responsive: true,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              minValue: 0,
            },
          },
        ],
      },
    };
    let frequenciaErrosPorMes = FrequenciaErro.calcularFrequenciaPorMes(this.erros);
    this.construirGraficoBarras(frequenciaErrosPorMes);
  }

  construirGraficoBarras(dadosHistograma) {
    let labels = [];
    let dataSets = [];

    for (let mes in dadosHistograma) {
      if (mes == '0') {
        labels.push('Janeiro');
      } else if (mes == '1') {
        labels.push('Fevereiro');
      } else if (mes == '2') {
        labels.push('Março');
      } else if (mes == '3') {
        labels.push('Abril');
      } else if (mes == '4') {
        labels.push('Maio');
      } else if (mes == '5') {
        labels.push('Junho');
      } else if (mes == '6') {
        labels.push('Julho');
      } else if (mes == '7') {
        labels.push('Agosto');
      } else if (mes == '8') {
        labels.push('Setembro');
      } else if (mes == '9') {
        labels.push('Outubro');
      } else if (mes == '10') {
        labels.push('Novembro');
      } else if (mes == '11') {
        labels.push('Dezembro');
      }

      if (Array.isArray(dadosHistograma[mes])) {
        for (let categoriaErro in dadosHistograma[mes]) {
          if (dadosHistograma[mes][categoriaErro] instanceof HistogramaErroData) {
            let pos = -1;
            for (let i = 0; i < dataSets.length; i++) {
              if (dataSets[0].label == getLabelPorCategoriaNumero(categoriaErro)) {
                pos = i;
              }
            }

            if (pos != -1) {
              dataSets[pos].data.push([dadosHistograma[mes][categoriaErro].contagem]);
            } else {
              dataSets.push({
                label: getLabelPorCategoriaNumero(categoriaErro),
                data: [dadosHistograma[mes][categoriaErro].contagem],
                backgroundColor: ErroCompilacao.getCorErro(categoriaErro),
              });
            }

            // verificar se já tem um dataSet criado
          }
        }
      }
    }

    let options = {
      scale: {
        xAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    this.graficoBarra = {
      labels: labels,
      datasets: dataSets,
    };
  }
}
