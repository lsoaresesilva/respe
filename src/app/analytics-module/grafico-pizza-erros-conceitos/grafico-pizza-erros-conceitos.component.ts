import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import MapeamentoErrosConceituais from 'src/app/model/analytics/mapeamentoErrosConceituais';
import { Assunto } from 'src/app/model/aprendizagem/questoes/assunto';
import Conceito from 'src/app/model/aprendizagem/questoes/conceito';
import { Util } from 'src/app/model/util';

@Component({
  selector: 'app-grafico-pizza-erros-conceitos',
  templateUrl: './grafico-pizza-erros-conceitos.component.html',
  styleUrls: ['./grafico-pizza-erros-conceitos.component.css'],
})
export class GraficoPizzaErrosConceitos implements OnInit {
  @Input() errosConceitos: Map<Assunto, Map<string, number>>;
  @Input() cabecalho:string;
  dadosProcessados;

  grafico;

  @ViewChild('dought') chart: any;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.errosConceitos != null) {
      this.construirGraficoPizza(this.errosConceitos);
    }
  }

  ngOnInit() {
    this.grafico = {
      labels: [],
      datasets: [],
    };
  }

  construirGraficoPizza(frequencias: Map<Assunto, Map<string, number>>) {
    if (frequencias != undefined) {
      const labels = [];
      const backgroundColors = [];
      const data = [];

      Conceito.getAll().subscribe(conceitos=>{
        frequencias.forEach((frequeciasConceitos, assunto) => {
          frequeciasConceitos.forEach((numero, conceitoId)=>{
            conceitos.forEach(conceito=>{
              if(conceito.id == conceitoId){
                labels.push(conceito.nome);
              }


            })
            backgroundColors.push(Util.getRandomColor());
            data.push(numero);
          })

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
      })


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
