import { Component, OnInit } from '@angular/core';
import Erro from 'src/app/model/erro';
import Query from 'src/app/model/firestore/query';
import { TipoErro } from 'src/app/model/tipoErro';
import { Mes } from 'src/app/model/mes';

@Component({
  selector: 'erros-programacao',
  templateUrl: './erros-programacao.component.html',
  styleUrls: ['./erros-programacao.component.css']
})
export class ErrosProgramacaoComponent implements OnInit {

  grafico;
  graficoBarra;
  

  constructor() {

   }

  ngOnInit() {
    let dados = []
    this.grafico = {
      data: dados,
      labels: [],
      datasets: [
        {
          data: dados,
          backgroundColor: []
        }]
    };

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

      Erro.getAll(new Query("estudanteId", "==", "12345")).subscribe(resultados=>{
        let dados = Erro.calcularFrequenciaPorTipoErro(resultados);
        this.construirGraficoPizza(dados)
        let ranking = Erro.rankErros(dados);
        let dadosHistograma = Erro.calcularHistogramaPorRank(ranking, resultados);
        this.construirGraficoBarras(dadosHistograma, ranking);
      })

  }

  construirGraficoBarras(dadosHistograma, ranking){
    
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

    for(let key in dadosHistograma){
      dataTop1.push(dadosHistograma[key].top1.total)
      dataTop2.push(dadosHistograma[key].top2.total)
      dataTop3.push(dadosHistograma[key].top3.total)

      if( key == "0" ){
        labels.push("Janeiro")
        
      }else if( key == "1" ){
        labels.push("Fevereiro")
      }else if( key == "2" ){
        labels.push("Março")
      }else if( key == "3" ){
        labels.push("Abril")
      }else if( key == "4" ){
        labels.push("Maio")
      }else if( key == "5" ){
        labels.push("Junho")
      }else if( key == "6" ){
        labels.push("Julho")
      }else if( key == "7" ){
        labels.push("Agosto")
      }else if( key == "8" ){
        labels.push("Setembro")
      }else if( key == "9" ){
        labels.push("Outubro")
      }else if( key == "10" ){
        labels.push("Novembro")
      }else if( key == "11" ){
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

  construirGraficoPizza(dados){

    

    let labels = [];
    let backgroundColors = []
    let data = []

    if(dados.comparacaoApenasUmaIgualdade > 0){
      labels.push(TipoErro.comparacaoApenasUmaIgualdadeTexto);
      backgroundColors.push(Erro.getCorErro(TipoErro.comparacaoApenasUmaIgualdade));
      data.push(dados.comparacaoApenasUmaIgualdade);
    }if(dados.declaracaoVariavelComDoisIguais > 0){
      labels.push(TipoErro.declaracaoVariavelComDoisIgualsTexto);
      backgroundColors.push(Erro.getCorErro(TipoErro.declaracaoVariavelComDoisIguais));
      data.push(dados.declaracaoVariavelComDoisIguais);
    }if(dados.espacoNoNomeVariavel > 0){
      labels.push(TipoErro.espacoNoNomeVariavelTexto);
      backgroundColors.push(Erro.getCorErro(TipoErro.espacoNoNomeVariavel));
      data.push(dados.espacoNoNomeVariavel);
    }if(dados.faltaDoisPontosCondicaoTexto > 0){
      labels.push(TipoErro.faltaDoisPontosCondicaoTexto);
      data.push(dados.faltaDoisPontosCondicao);
      backgroundColors.push(Erro.getCorErro(TipoErro.faltaDoisPontosCondicao));
    }if(dados.faltaDoisPontosFuncao > 0){
      labels.push(TipoErro.faltaDoisPontosFuncaoTexto);
      backgroundColors.push(Erro.getCorErro(TipoErro.faltaDoisPontosFuncao));
      data.push(dados.faltaDoisPontosFuncao);
    }if(dados.faltaParentesis > 0){
      labels.push(TipoErro.faltaParentesisTexto);
      backgroundColors.push(Erro.getCorErro(TipoErro.faltaParentesis));
      data.push(dados.faltaParentesis);
    }if(dados.faltaVirgulaParametros > 0){
      labels.push(TipoErro.faltaVirgulaParametrosTexto);
      backgroundColors.push(Erro.getCorErro(TipoErro.faltaVirgulaParametros));
      data.push(dados.faltaVirgulaParametros);
    }if(dados.numeroDecimalComVirgula > 0){
      labels.push(TipoErro.numeroDecimalComVirgulaTexto);
      backgroundColors.push(Erro.getCorErro(TipoErro.numeroDecimalComVirgula));
      data.push(dados.numeroDecimalComVirgula);
    }if(dados.parDadosComparacao > 0){
      labels.push(TipoErro.parDadosComparacaoTexto);
      backgroundColors.push(Erro.getCorErro(TipoErro.parDadosComparacao));
      data.push(dados.parDadosComparacao);
    }if(dados.variavelNaoDeclarada > 0){
      labels.push(TipoErro.variavelNaoDeclaradaTexto);
      data.push(dados.variavelNaoDeclarada);
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

  }

}
