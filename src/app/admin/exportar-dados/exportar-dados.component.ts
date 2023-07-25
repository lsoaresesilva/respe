import { Component, OnInit } from '@angular/core';
import PageTrackRecord from 'src/app/model/analytics/pageTrack';
import Query from 'src/app/model/firestore/query';
import Submissao from 'src/app/model/submissao';
import Turma from 'src/app/model/turma';
import { SelectItem } from 'primeng/api';
//import pageTracks from '../../../../json/pageTracks.json';

//import estudantesJson from '../../../../json/estudantes.json';
import Usuario from 'src/app/model/usuario';
import EstatisticaPageTrack from 'src/app/model/modelagem/estatisticaPageTrack';
import { Assunto } from '../../model/aprendizagem/questoes/assunto';

@Component({
  selector: 'app-exportar-dados',
  templateUrl: './exportar-dados.component.html',
  styleUrls: ['./exportar-dados.component.css'],
})
export class ExportarDadosComponent implements OnInit {
  json;
  colecoes: SelectItem[];
  colecaoSelecionada: string;

  /*  data;
  opcoes; */

  constructor() {
    this.colecoes = [{
      value: null,
      label: 'Selecionar coleção'
      },
      {
      value: 'assuntos',
      label: 'Assuntos'
    }];
    /* this.json = [];
    this.opcoes = {
      legend: {
          labels: {
              fontColor: '#495057'
          }
      },
      scales: {
          xAxes: [{
              ticks: {
                  fontColor: '#495057'
              }
          }],
          yAxes: [{
              ticks: {
                  fontColor: '#495057'
              }
          }]
      }
  }; */
  }

  exportarDados(){
    if(this.colecaoSelecionada === 'assuntos'){
      Assunto.exportToJson().subscribe(json=>{
        this.json = json;
      })
    }
  }

  ngOnInit(): void {
    /* Turma.getAllEstudantes("2021a").subscribe(estudantes=>{
        estudantes.forEach(estudante=>{
          this.json.push(estudante.toJson());
        })

        this.json = JSON.stringify(this.json);

    }) */
    /*  Submissao.exportToJson().subscribe(resultados=>{
      this.json = resultados;
    }); */
    /* Submissao.getAll(new Query("estudanteId", "==", "d6Qx0ydf7quJmGirnF35")).subscribe(submissoes=>{
      this.json = JSON.stringify(submissoes);
    }) */
    //this.gerarDataset();
  }

  /* gerarDataset() {
    let estudantes: Usuario[] = [];
    estudantesJson.estudantes.forEach((e) => {
      estudantes.push(Usuario.fromJson(e));
    });

    let pTrack: PageTrackRecord[] = [];

    pageTracks.pageTrack.forEach((p) => {
      pTrack.push(PageTrackRecord.fromJson(p));
    });

    let pageTracksAgrupados = {};

    pTrack.forEach((track) => {
      for (let i = 0; i < estudantes.length; i++) {
        if (track.estudante.pk() == estudantes[i].pk()) {
          if (pageTracksAgrupados[track.estudante.pk()] == null) {
            pageTracksAgrupados[track.estudante.pk()] = [];
          }

          pageTracksAgrupados[track.estudante.pk()].push(track);
          break;
        }
      }
    });

    let mapaSemanas = EstatisticaPageTrack.estrategiasSRLsemanas(pageTracksAgrupados);
    let dataSets = [];

    function getTotalPagina(pagina, mapaSemana) {
      return mapaSemana.get(pagina) != null ? mapaSemana.get(pagina) : 0;
    }

    this.data = { labels: [], datasets: [] };
    let visualizacoesListagemDiario = [];
    let visualizacoesMeuDesempenho = [];
    let visualizacoesSelfInstructionEditor = [];

    let semanas = [];
    let inicio = 1;
    mapaSemanas.forEach((visualizacoes, semana) => {
      semanas.push(inicio);
      inicio += 1;
      let totalListagemDiarios = getTotalPagina('listagem-diarios', visualizacoes);
      visualizacoesListagemDiario.push(totalListagemDiarios);
      let totalMeuDesempenho = getTotalPagina('meu-desempenho', visualizacoes);
      visualizacoesMeuDesempenho.push(totalMeuDesempenho);

      let totalSelfInstructionEditor = getTotalPagina('self-instruction-editor', visualizacoes);
      visualizacoesSelfInstructionEditor.push(totalSelfInstructionEditor);
    });

    semanas.pop();
    visualizacoesListagemDiario.pop();
    visualizacoesMeuDesempenho.pop();
    visualizacoesSelfInstructionEditor.pop();

    this.data.labels = semanas;
    this.data.datasets.push({
      label: 'Learning Journal',
      fill: false,
      data: visualizacoesListagemDiario,
      borderColor: '#FFA726',
    });

    this.data.datasets.push({
      label: 'Meu desempenho',
      fill: false,
      data: visualizacoesMeuDesempenho,
      borderColor: '#42A5F5',
    });

    this.data.datasets.push({
      label: 'Self-instruction',
      fill: false,
      data: visualizacoesSelfInstructionEditor,
      borderColor: '#66BB6A',
    });
  } */
}
