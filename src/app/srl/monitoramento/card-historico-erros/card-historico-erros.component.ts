import { Component, OnInit, Input } from '@angular/core';
import Erro from 'src/app/model/erro';

@Component({
  selector: 'app-card-historico-erros',
  templateUrl: './card-historico-erros.component.html',
  styleUrls: ['./card-historico-erros.component.css']
})
export class CardHistoricoErrosComponent implements OnInit {

  graficoBarra;
  @Input() erros;

  constructor() { }

  ngOnInit() {
    let dadosBarra = []
    this.graficoBarra = {
      data: dadosBarra,
      labels: [],
      datasets: [
        {
          data: dadosBarra,
          backgroundColor: []
        }]
    };

    let dadosProcessados = Erro.calcularFrequenciaPorTipoErro(this.erros);
    let ranking = Erro.rankErros(dadosProcessados);
    let dadosHistograma = Erro.calcularHistogramaPorRank(ranking, this.erros);
    this.construirGraficoBarras(dadosHistograma, ranking);
  }

  construirGraficoBarras(dadosHistograma, ranking) {

    let labels = []
    let labelTop1 = Erro.getTextoErro(ranking.top1.tipo)
    let corTop1 = Erro.getCorErro(ranking.top1.tipo)
    let labelTop2 = Erro.getTextoErro(ranking.top2.tipo)
    let corTop2 = Erro.getCorErro(ranking.top2.tipo)
    let labelTop3 = Erro.getTextoErro(ranking.top3.tipo)
    let corTop3 = Erro.getCorErro(ranking.top3.tipo)

    let dataTop1 = []
    let dataTop2 = []
    let dataTop3 = []

    for (let key in dadosHistograma) {
      dataTop1.push(dadosHistograma[key].top1.total)
      dataTop2.push(dadosHistograma[key].top2.total)
      dataTop3.push(dadosHistograma[key].top3.total)

      if (key == "0") {
        labels.push("Janeiro")

      } else if (key == "1") {
        labels.push("Fevereiro")
      } else if (key == "2") {
        labels.push("Março")
      } else if (key == "3") {
        labels.push("Abril")
      } else if (key == "4") {
        labels.push("Maio")
      } else if (key == "5") {
        labels.push("Junho")
      } else if (key == "6") {
        labels.push("Julho")
      } else if (key == "7") {
        labels.push("Agosto")
      } else if (key == "8") {
        labels.push("Setembro")
      } else if (key == "9") {
        labels.push("Outubro")
      } else if (key == "10") {
        labels.push("Novembro")
      } else if (key == "11") {
        labels.push("Dezembro")
      }

    }

    this.graficoBarra = {
      labels: labels, // devem ser os meses em que foram identificados
      datasets: [
        {
          data: dataTop1, // devem ter os dados de top1 para todos os meses
          label: labelTop1, // label top1
          backgroundColor: corTop1
        },
        {
          data: dataTop2, // devem ter os dados de top1 para todos os meses
          label: labelTop2, // label top2
          backgroundColor: corTop2
        },
        {
          data: dataTop3, // devem ter os dados de top1 para todos os meses
          label: labelTop3, // label top3
          backgroundColor: corTop3
        }
      ]
    };

  }

}
