import { inject, TestBed } from '@angular/core/testing';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { FirebaseConfiguracao } from 'src/environments/firebase';
import { DocumentModule } from '../../firestore/document.module';

import pageTracks_controle_positivo from '../../../../../json/pageTracks_controle_positivo.json';
import pageTracks_experimental from '../../../../../json/pageTracks_experimental.json';
import pageTracks_highPerforming from '../../../../../json/pagetrack_high_performing_2_ago_2022.json';
import pageTracks_lowPerforming from '../../../../../json/pagetrack_low_performing_2_ago_2022.json';


import submissoesEstudantes from '../../../../../json/submissoes_27_jan_v2.json';
import Submissao from '../../submissao';
import AnalyticsProgramacao from '../../analytics/analyticsProgramacao';
import AtividadeGrupo from '../../cscl/atividadeGrupo';
import { Util } from '../../util';

import PageTrackRecord from '../../analytics/pageTrack';
import Grafo from '../../modelagem/grafo';
import EstatisticaPageTrack from '../../modelagem/estatisticaPageTrack';
import { Assunto } from '../../questoes/assunto';
import Export from '../export';
import { PageTrack } from '../../../guards/pageTrack.guard';
import AnalyticsUsoSistema from '../../analytics/analyticsUsoSistema';

const estudantesIgnorados = [
  'B3Xgj4IGEOQvjLKoTHI9',
  'JJ8zNeRZBDr4qTElmYJk',
  'xRSUKvyNAYV8Cmvn639q',
  'LYx978JlOUowgMgR7gq0',
  'BmIqbIXvbFLx0D4rqdvo',
  '1flzSjZxDqi7QmmoMRqG',
  'gxDZLmDyYSRoPOw1DkCJ',
  'mb7t9FEckyI2YEFHd8eH',
  'GvyxgiQu8w2UsUzeCZSV',

];

const estudantesGrupo1 = [
  '0tXcE0JVbzGME4825VQp',
  '1flzSjZxDqi7QmmoMRqG',
  '3Bwxn6PXZXHcTVxmszxR',
  '5tw4w2xUn8YHBwzzN7go',
  '7djJPWQ14hNLNM5rWyKG',
  'AClTuaxkU4QBNNYiFtjS',
  'Eyn9kNCBC0zgcXi1ZloQ',
  'KCWXxsAXPj0jIby8yShA',
  'KuLmIQqoO2GHEW3luHFm',
  'WX7vsrbbLyo6kTAa02j1',
  'Z2Id4vvBxRVB6xX7tBnu',
  'fDELm9NgGHeDyGMNDdxq',
  'mgrXUORVlo9woOIRqDrN',
  'miT2WXUYWMPTg7WBy5BY',
  'pqMtkIteoPd7ifSnhTL8',
  'qIwjgwELLkCzT2K5YaJr',
  'sKAIsfb52vrEVIq6AWUY',
  'tVCnwCcm3laQQ3KEQcuh',
  'thlkAsdAb01cWTe88wmq',
  'zwCRM7eJnA5OzcJnj5j4',
];


function incluirAlunoSetentaPorCentoCurso(estudanteId){
  let alunos = ['KuLmIQqoO2GHEW3luHFm',
'fDELm9NgGHeDyGMNDdxq',
'mgrXUORVlo9woOIRqDrN',
'zwCRM7eJnA5OzcJnj5j4',
'DiAvaZqqS46odlwJvwlI',
'Jc64w0CLn07Jv7SbQfD9',
'Oqk8GKqSbfeBMFzCshYp',
'Xqwy12iiwSfYd27o50jT',
'rk2zpvKHhYQ36SKSXKqU',
'xoEyp0Wl7mHTDKQcJZRd',
'0PsFCF7RPljJ0SAn1J5G',
'0dV0X0EF0Rexfrj5nI8U',
'FL7dGBw3G4Nb4E3Rzc9e',
'PFZxLh3TS6S43NTGv7xZ',
'q1gk7XrXK21MxZ21eRbL',
'vHW4tDiQ9IeKYQawCgfC',
'vsDMwOOR05sbVQo2eVLt',
'y5xsnvOkv4N0E7yXTPel',
'iLdani9C389FBJHei011',
'DQ5WX7Y8peXeqNSL4lh0',
'd6Qx0ydf7quJmGirnF35',
'uwL18mtNF2M8Iy4DLFio',
'zVdKYtWtx1myxFvocXSy',
'KVePdVi12Z0yyhsyeJZj']

return alunos.includes(estudanteId);
}

function incluirHighStudents(estudanteId) {
  let estudantesHighPerforming = [
    'WBN7iBrLgbtQQufUcHUl',
    'XV1Do4jBDAYR0x8DTKwh',
    'AClTuaxkU4QBNNYiFtjS',
    'fDELm9NgGHeDyGMNDdxq',
    'hESX6uYwfdfI8fdC0MLK',
    '9KcXtMtAIMyji0CUi4xM',
    '2qXDozyRLm09FsQa8Ss2',
    '5tw4w2xUn8YHBwzzN7go',
    '9ZndTz0PiLn3rSFbYCKN',
    'YUeSqIQKAv4ZBNzhRv37',
    'HkwZM3zhnEatlTSAZfv4',
    'giEygz2EC9Ioeb21HfBq',
    'ZE3AZqq9KN6uTjQAw8LS',
    'bBqzCttYCys2ykOAReoX',
    'kaprL0AVdVbHVZBCGhbn',
    'il4Zx5lpyPacSFo7c9Bz',
    'WX7vsrbbLyo6kTAa02j1',
    'mgrXUORVlo9woOIRqDrN',
    '0XQMMGnf8fO0v3ypOIxo',
    'fwvNcONxtaPLT1WnWVWa',
    'uqqsPnUvjguXc5nPAGtV',
    '0tXcE0JVbzGME4825VQp',
    'UZUlZT6N4iEPs0eyljVo',
    'miT2WXUYWMPTg7WBy5BY',
    'KuLmIQqoO2GHEW3luHFm',
    'SAh5KzQMmn44WrHcNWnu',
    'T7m08acxezz82QGk29rC',
    'afHpF5YD0yWO8O6A0ySZ',
    'j4pgzs4DpvDtVGZZKC24',
    'pqMtkIteoPd7ifSnhTL8',
    '24tTt0DoTXLyysO9sxDN',
    'M4bWBpDVzcX3F3U36iTW',
  ];
  if (estudantesHighPerforming.includes(estudanteId)) {
    return true;
  }

  return false;
}


describe('Testes para process mining', () => {
  let estudantesGrupo3 = [
    '0PsFCF7RPljJ0SAn1J5G',
    '0dV0X0EF0Rexfrj5nI8U',
    '24tTt0DoTXLyysO9sxDN',
    '3QY8EyDqvM19kb7okR9c',
    '9GrPLbDbfBtAda8xSofl',
    'Eb7rKqrrnaqwel4JoeGE',
    'FL7dGBw3G4Nb4E3Rzc9e',
    'HkwZM3zhnEatlTSAZfv4',
    'HpoIV24aeukWLKeeJxI8',
    'IQ5914tOM48ihWDnL65t',
    'M4bWBpDVzcX3F3U36iTW',
    'NAy1fZ1vOyMjytZipefC',
    'PFZxLh3TS6S43NTGv7xZ',
    'SAh5KzQMmn44WrHcNWnu',
    'UZUlZT6N4iEPs0eyljVo',
    'WsNiDCtNWnHLEMgIXg3Z',
    'XV1Do4jBDAYR0x8DTKwh',
    'aGYH6jayocWQuzNt8P9E',
    'afHpF5YD0yWO8O6A0ySZ',
    'fIzhRocFtYEI66vohDGk',
    'g3uJYOAIdwW7ivCdcbzi',
    'giEygz2EC9Ioeb21HfBq',
    'hESX6uYwfdfI8fdC0MLK',
    'il4Zx5lpyPacSFo7c9Bz',
    'j4pgzs4DpvDtVGZZKC24',
    '0x7ADeL2wiqASd3Hh4zz',
    'kaprL0AVdVbHVZBCGhbn',
    'vHW4tDiQ9IeKYQawCgfC',
    'vsDMwOOR05sbVQo2eVLt',
    'wQMGyoawsUaOOO5o0h3h',
    'x8kO6wUbv70VQVWrvd1U',
    'y5xsnvOkv4N0E7yXTPel',
    'zIatf4iwesH8hfLxmSnT',
    'C237gqDQZQlw3snj96JY',
    'bEsUIFQvM7fpGdUDAMOc',
    'bT0HYGprp7qG1tjuw502',
    'cc0dI1GyKeCdXB3jbDxa',
    'dk0lN6fFL1mTAXdHQr1o',
    'o1H9L7DEb1IPBEX0pLpW',
    'sBk3MRjGCcRAf22MkRb7',
    'tiaOUfNoGD0LJKsraNtj',
    'z321SrWJxdKZlLgMg7JT',
    ''

  ];



  let estudantesGrupo2 = [
    '139MdLNtSKa62Ip83e76',
    '62mDrZy9baANf8oiEYgV',
    '8Dj8zbKgaw2zCLB0u3s4',
    '9KcXtMtAIMyji0CUi4xM',
    'DQ5WX7Y8peXeqNSL4lh0',
    'EWdvX2ympgrHvMhkFWvE',
    'T7m08acxezz82QGk29rC',
    'WBN7iBrLgbtQQufUcHUl',
    'YUeSqIQKAv4ZBNzhRv37',
    'ZE3AZqq9KN6uTjQAw8LS',
    'bBqzCttYCys2ykOAReoX',
    'd6Qx0ydf7quJmGirnF35',
    'erEfwziVvlqZluGBA16Y',
    'f4JGIqpSqiurSdenJ9fi',
    'fwvNcONxtaPLT1WnWVWa',
    'g9zic1jMOnstBHQbf7NF',
    'nnquS2cCcfXWIt03eUEr',
    'tmvt3Irt6o1jmk3RYgRH',
    'uqqsPnUvjguXc5nPAGtV',
    'uwL18mtNF2M8Iy4DLFio',
    'y0c15f1wYbqZTrrC7IiR',
    'zVdKYtWtx1myxFvocXSy',
  ];

  let paginasExcluir = ['pedido-ajuda', 'atividade-grupo'];

  function ignorar(questaoId) {
    let questoesIgnoradas = [
      '947713cc-17bf-11eb-adc1-0242ac120002',
      '6012cdd4-3a9a-4865-9d3f-99a29d5bbe0c',
      '77016fcf-56d1-4a0e-bdd5-89f872c81e6c',
      '878ef656-32e7-4e12-9273-851cc28e5002',
      'a9fbc2c1-97f5-4136-a870-6c3e265e8fef',
      '057bb964-7f4d-4555-b432-bf1e1dea26fb',
      'd71b2ce8-2a29-4424-8f87-5eae8b37b3d9',
      'e1a534cf-06d3-4f33-9e51-72c48e06d0ae',
      'a985f95d-94c5-4675-a7ea-f33703c94caa',
    ];
    if (questoesIgnoradas.includes(questaoId)) {
      return true;
    }

    return false;
  }

  function imprimirMatrizTransicao(estudanteId, matriz, quantidadeSubmissoes) {
    let objeto = { id: estudanteId };
    matriz.forEach((frequenciaEventos, evento, map) => {
      frequenciaEventos.forEach((frequencia, e, map) => {
        objeto[evento + ' -> ' + e] = frequencia / quantidadeSubmissoes;
        //console.log(evento+" -> "+e+" : "+frequencia)
      });
    });

    return objeto;
  }

  let app: firebase.app.App;
  let afs: AngularFirestore;

  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1200000;
    TestBed.configureTestingModule({
      imports: [
        DocumentModule,
        AngularFireModule.initializeApp(FirebaseConfiguracao),
        AngularFirestoreModule, //.enablePersistence()
      ],
    });
    inject([FirebaseApp, AngularFirestore], (_app: firebase.app.App, _afs: AngularFirestore) => {
      app = _app;
      afs = _afs;
    })();
  });

  xit("Deve carregar usuários que não devem ter os dados coletados para análise de pagetrack", (done)=>{
    Export.getUsuariosExperimento().subscribe(usuarios=>{
      console.log(usuarios);
      done();
    })
  })

  xit("Deve carregar os pagetracks de high-performing", (done)=>{
    Export.getPageTracks(null).subscribe(pageTracks=>{
      done();
    })
  })

  function fatiar_array_sem_inicio(tracks_ordenados){
    let hasInicio = false;
    let sliceInicio = -1;
    let sliceFim = -1;

    for(let i = 0; i < tracks_ordenados.length; i++){
      if(tracks_ordenados[i].pagina == "erro_sintaxe" || tracks_ordenados[i].pagina == "finalizada"){
        if(!hasInicio && sliceInicio == -1){
          sliceInicio = i;
        }

      }else{
        if(tracks_ordenados[i].pagina == "visualizar-assunto"){
          if(sliceInicio != -1){
            sliceFim = i;
            break;
            /* pares.push(sliceInicio, sliceFim);
            sliceInicio = -1;
            sliceFim = -1;
            hasInicio = false; */
          }/* else{
            if(hasInicio == true){
              hasInicio = false;
            }else{
              hasInicio = true;
            }

          } */
        }
      }
    }

    if(sliceInicio != -1 && sliceFim != -1){
      tracks_ordenados = tracks_ordenados.splice(sliceInicio, sliceFim-sliceInicio);
      return fatiar_array_sem_inicio(tracks_ordenados);
    }else{
      return tracks_ordenados;
    }
  }

  xit("Deve identificar o fluxo de ações entre o uso das features Debug e Planner visualization e des. código", ()=>{
    let tracks = AnalyticsUsoSistema.gerarTracks("high");

    function transformarSubmissoesEmPagetracks(){

      let estudantes_permitidos = AnalyticsUsoSistema.identificarEstudantesPelasTracks(tracks);

      let submissoes = AnalyticsProgramacao.gerarSubmissoes(estudantes_permitidos);
      let tracksApartirDeSubmissoes = [];
      for(let i = 0; i < submissoes.length; i++){

        let status = "";

        if(submissoes[i].erro != null){
          status = "erro_sintaxe";
        }else if(submissoes[i].isFinalizada()){
          status = "finalizada";
        }else if(submissoes[i].erro == null){
          status = "erro_logico";
        }else{
          status = "indefinido";
        }

        if(status != ""){
          let pTrack = new PageTrackRecord(null, status, submissoes[i].estudante);
          pTrack.data = submissoes[i].data;
          tracksApartirDeSubmissoes.push(pTrack);
        }


      }

      return tracksApartirDeSubmissoes;
    }

    let dataInicioCodigo = null;
    let dataInicioFeature = null;
    let dataFimFeature = null;
    let estudante = null;
    let questao = null;

    let tracksSubmissoes = transformarSubmissoesEmPagetracks();

    tracks = tracks.concat(tracksSubmissoes);

    /*let tracksAgrupados = PageTrackRecord.agruparPorEstudante(tracks);
    tracksAgrupados.forEach( (tracks, estudanteId) => {

      let tracksAgrupadoSemana = PageTrackRecord.agruparPorSemana(tracks);
      tracksAgrupadoSemana.forEach( (tracks, semana) => {
        let tracksOrdenados = PageTrackRecord.ordernarPorData(tracks);
        tracksAgrupadoSemana.set(semana, tracksOrdenados);
      });

      tracksAgrupados.set(estudanteId, tracksAgrupadoSemana);

    })

    let analises = new Map<string, any[]>();
    let fluxos = new Map<string, Map<string, any[]>>();

     tracksAgrupados.forEach( (pages, estudanteId) => {
      pages.forEach( (tracks, dia_semana) => {
        for(let i = 0; i < tracks.length; i++){

          if(fluxos.get(estudanteId) == null){
            fluxos.set(estudanteId, new Map<string, any[]>());
          }

          if(tracks[i].pagina == "editor" && dataInicioCodigo == null){
            dataInicioCodigo = tracks[i].data;
            let dia = dataInicioCodigo.getDate();
            let mes = dataInicioCodigo.getMonth();
            if(fluxos.get(estudanteId).get(dia+"-"+mes) == null || !Array.isArray(fluxos.get(estudanteId).get(dia+"-"+mes))){
              fluxos.get(estudanteId).set(dia+"-"+mes, []);
            }

            if(!Array.isArray(fluxos.get(estudanteId).get(dia+"-"+mes))){
              console.log("Buuug");
            }else{
              fluxos.get(estudanteId).get(dia+"-"+mes).push(tracks[i]);
            }

          }

          if(dataInicioCodigo != null){

          }

          if(tracks[i].pagina == "visualizacao-algoritmo" && dataInicioFeature == null){
            dataInicioFeature = tracks[i].data;
            estudante = estudanteId;
            let dia = dataInicioFeature.getDate();
            let mes = dataInicioFeature.getMonth();

            if(!Array.isArray(fluxos.get(estudanteId).get(dia+"-"+mes))){
              console.log("Buuug");
            }else{
              fluxos.get(estudanteId).get(dia+"-"+mes).push(tracks[i]);
            }
          }

            if(tracks[i].pagina != "visualizacao-algoritmo" &&
                tracks[i].pagina != "editor" &&
                tracks[i].pagina != "self-instruction" &&
                tracks[i].pagina != "visualizacao-resposta-questao" &&
                tracks[i].pagina != "erro_sintaxe" &&
                tracks[i].pagina != "finalizada"){
                  if(dataInicioCodigo != null){
                    dataFimFeature = tracks[i].data;
                  let dia = dataFimFeature.getDate();
                    let mes = dataFimFeature.getMonth();

                    if(!Array.isArray(fluxos.get(estudanteId).get(dia+"-"+mes))){
                      console.log("Buuug");
                    }else{
                      fluxos.get(estudanteId).get(dia+"-"+mes).push(tracks[i]);
                    }


                  }

              }else{
                let dia = tracks[i].data.getDate();
                    let mes = tracks[i].data.getMonth();
                let ar = fluxos.get(estudanteId).get(dia+"-"+mes);

                let paginas_permitidas = [""]

                if(!Array.isArray(fluxos.get(estudanteId).get(dia+"-"+mes))){
                  fluxos.get(estudanteId).set(dia+"-"+mes, []);
                }
                  fluxos.get(estudanteId).get(dia+"-"+mes).push(tracks[i]);

              }

          if(dataInicioCodigo != null && dataFimFeature != null){
            let estudanteAnalise = analises.get(estudanteId);
            if(estudanteAnalise == null){
              analises.set(estudanteId, []);
            }
            analises.get(estudanteId).push([dataInicioCodigo, dataFimFeature]);
            dataInicioCodigo = null;
            dataInicioFeature = null;
            dataFimFeature = null;
          }
        }
      });




    }); */

    let fluxos_filtrados_com_srl = new Map<string, Map<string, any[]>>();

    /* let submissoesAgrupadas = Submissao.agruparPorEstudante(gerarSubmissoes()); */

    let tracks_finais_analise_markov = [];
    let tracksOrdenados = PageTrackRecord.ordernarPorData(tracks);

    // Faz slice do array em caso de não ter identificado o início da interação
    fatiar_array_sem_inicio(tracksOrdenados);

    // Está duplicando alguns elementos, realiza a limpeza

    let tracksOrdenados_sem_duplicatas = [];
    tracksOrdenados.forEach(track_ordenado=>{
      let add = true;
      for(let i = 0; i < tracksOrdenados_sem_duplicatas.length; i++){
        if(track_ordenado.id != null){
          if(tracksOrdenados_sem_duplicatas[i].id == track_ordenado.id){
            add = false;
            break;
          }
        }

      }

      if(add){
        tracksOrdenados_sem_duplicatas.push(track_ordenado);
      }

    })

    let g = new Grafo(tracksOrdenados_sem_duplicatas);
    let m = g.criarMatrizSomada(tracksOrdenados_sem_duplicatas);
    m.forEach((probabilidadeEventos, evento, map) => {
      console.log(evento);

      probabilidadeEventos.forEach((probabilidade, e, map) => {
        console.log(e + ' : ' + probabilidade);
      });
    });


    /* fluxos.forEach((datas_desenvolvimentos, estudanteId)=>{
      datas_desenvolvimentos.forEach((tracks,data)=>{

        let deveAnalisar = false; // Variável de controle, pois a análise só deve ocorrer se houve episódio de SRL

        for(let i = 0; i < tracks.length; i++){
          if(tracks[i].pagina == "visualizacao-algoritmo"){
            deveAnalisar = true;
            break;
          }
        }

        if(deveAnalisar){
          if(fluxos_filtrados_com_srl.get(estudanteId) == null){
            fluxos_filtrados_com_srl.set(estudanteId, new Map<string, any[]>());
          }

          let tracksOrdenados = PageTrackRecord.ordernarPorData(tracks);

          // Faz slice do array em caso de não ter identificado o início da interação
          fatiar_array_sem_inicio(tracksOrdenados);

          // Está duplicando alguns elementos, realiza a limpeza

          let tracksOrdenados_sem_duplicatas = [];
          tracksOrdenados.forEach(track_ordenado=>{
            let add = true;
            for(let i = 0; i < tracksOrdenados_sem_duplicatas.length; i++){
              if(track_ordenado.id != null){
                if(tracksOrdenados_sem_duplicatas[i].id == track_ordenado.id){
                  add = false;
                  break;
                }
              }

            }

            if(add){
              tracksOrdenados_sem_duplicatas.push(track_ordenado);
            }

          })

          tracks_finais_analise_markov = tracks_finais_analise_markov.concat(tracksOrdenados_sem_duplicatas)


          let z = 1;

          // Ordenar tracks para ver a sequência de como as coisas aconteceram

        }


        // PAREI AQUI.
        // # Pegar todas as submissões dentro do intervalo datas[0] e datas[1]
        // Fazer MARKOV
      })
    }) */



    /* let g = new Grafo(tracks_finais_analise_markov);
    let m = g.criarMatrizSomada(tracks_finais_analise_markov);
    m.forEach((probabilidadeEventos, evento, map) => {
      console.log(evento);

      probabilidadeEventos.forEach((probabilidade, e, map) => {
        console.log(e + ' : ' + probabilidade);
      });
    }); */

    console.log("Fim análise")
    /* analises.forEach((datas_desenvolvimentos_codigo, estudanteId)=>{
      datas_desenvolvimentos_codigo.forEach(datas=>{
        let submissoesFiltradasSecao = Submissao.filtrarDataRange(submissoesAgrupadas[estudanteId], datas[0], datas[1]);
        let y = submissoesFiltradasSecao;
        // PAREI AQUI.
        // # Pegar todas as submissões dentro do intervalo datas[0] e datas[1]
        // Fazer MARKOV
      })

    }) */


    /* tracks.forEach(pageTrack=>{
      if(pageTrack.pagina == "visualizacao-algoritmo" && dataInicioFeature == null){
          dataInicioFeature = Util.firestoreDateToDate(pageTrack.data);
          estudante = pageTrack.estudante;
      }


    })

    let submissoes = gerarSubmissoes();
    let submissoesDia = [];
    let agrupado = Submissao.agruparPorEstudante(submissoes);
    let submissoesDoEstudante = agrupado[estudante];
    if (submissoesDoEstudante != null) {
      submissoesDoEstudante.forEach((submissaoEstudante) => {
        let dataSubmissao = submissaoEstudante.data;
      });
    } */
  })

  xit("Deve identificar métricas no nível de criação de programas", ()=>{
    let tracks = AnalyticsUsoSistema.gerarTracks("high");
    let estudantes = AnalyticsUsoSistema.identificarEstudantesPelasTracks(tracks);
    let todasSubmissoes = AnalyticsProgramacao.gerarSubmissoes(estudantes);

    let submissoesAgrupadas = Submissao.agruparPorEstudante(todasSubmissoes);

    Object.keys(submissoesAgrupadas).forEach((estudanteId) => {
      let submissoes = submissoesAgrupadas[estudanteId];
      Submissao._orderByDate(submissoes);
      let tempomedioEntreExecucoes = Math.round(AnalyticsProgramacao.calcularTempoMedioEntreSubmissoes(submissoes));
      let mediaSubmissoesAcerto = Math.round(AnalyticsProgramacao.calcularMediaSubmissoesParaAcerto(submissoes));
      let mediaSubmissoesCorrigirErro =  Math.round(AnalyticsProgramacao.calcularMediaSubmissoesCorrigirErro(submissoes));
      let mediaExecucoes = Math.round(AnalyticsProgramacao.calcularExecucoes(submissoes));
      let mediaQuestoesSemana = Math.round(AnalyticsProgramacao.calcularMediaQuestoesSemana(submissoes));
      let melhoriasCodigoAposFinalizacao = Math.round(AnalyticsProgramacao.identificarMelhoriasSubmissaoAposConclusao(submissoes));
      // média erros sintaxe
      // média erros lógicos
      let dados = [estudanteId, tempomedioEntreExecucoes, mediaSubmissoesAcerto, mediaSubmissoesCorrigirErro, mediaExecucoes];
      console.log(dados.toString());
    });





  })

  it("Deve gerar uma contagem no acesso às features", ()=>{
    let pTrack = AnalyticsUsoSistema.gerarTracks("low");

    let navegacao = EstatisticaPageTrack.contarAcessos(pTrack);
    navegacao.forEach((navegacoes, estudante)=>{
        let contagens = [estudante,
          navegacoes.get("visualizacao-resposta-questao"),
          navegacoes.get("self-instruction"),
          navegacoes.get("ranking"),
          navegacoes.get("listagem-diarios"),
          navegacoes.get("visualizacao-algoritmo"),
          navegacoes.get("meu-desempenho"),
        ]
          /* let meudesempenho = navegacoes.get("visualizacao-resposta-questao");
      if(meudesempenho == null){
        meudesempenho = 0;
      } */

      console.log(contagens.toString());
    });

    /* let g = new Grafo(pTrack);
    let matriz = g.criarMatriz(pTrack);
    let x = matriz; */
  })

  xit('Deve gerar uma matriz de transição', () => {

    let pTrack = AnalyticsUsoSistema.gerarTracks("high");

    let g = new Grafo(pTrack);
    let m = g.criarMatrizSomada(pTrack);
    m.forEach((probabilidadeEventos, evento, map) => {
      console.log(evento);

      probabilidadeEventos.forEach((probabilidade, e, map) => {
        console.log(e + ' : ' + probabilidade);
      });
    });
  });

  xit('Deve identificar quantas atividades foram entregas no prazo pelos alunos', () => {
    /* 1. Pegar o grupo ok
          2. Pegar todas as submissoes de cada usuário associada à questãoId da atividade colaborativa. ok
          3. Verificar apenas as do dia limite da atividade Grupo ok
          4. Verificar se há alguma com status concluído */

    let submissoes = AnalyticsProgramacao.gerarSubmissoes([]);

    let agrupado = Submissao.agruparPorEstudante(submissoes);

    let resultadoGrupoExperimental = new Map<string, any>();
    resultadoGrupoExperimental.set('curso2021b', { totalCorretas: 0, totalIncorretas: 0 });
    resultadoGrupoExperimental.set('2021a', { totalCorretas: 0, totalIncorretas: 0 });
    resultadoGrupoExperimental.set('curso2021j', { totalCorretas: 0, totalIncorretas: 0 });

    Assunto.getAll().subscribe((assuntos) => {
      AtividadeGrupo.getAll().subscribe((atividades) => {
        atividades.forEach((atividade) => {
          console.log('AtividadeId = ' + atividade.nome);

          //if(atividade.id == "cvMBP6aW7Qf32kFA6kmi"){
          if (atividade.turmaCodigo == '2021a') {
            let atividadeColaborativa = null;

            assuntos.forEach((assunto) => {
              let atvCL = assunto.getQuestaoColaborativaById(atividade.questaoColaborativaId);
              if (atvCL != null) {
                atividadeColaborativa = atvCL;
              }
            });

            let totalRespostasCertas = 0;
            let totalRespostasErradas = 0;

            atividade.grupos.forEach((grupo) => {
              let submissoesDessaAtividade = [];
              let isRespondida = false;
              grupo.estudantes.forEach((estudante) => {
                let submissoesDoEstudante = agrupado[estudante];
                if (submissoesDoEstudante != null) {
                  submissoesDoEstudante.forEach((submissaoEstudante) => {
                    if (
                      submissaoEstudante.questaoId ==
                      /* atividade.questaoColaborativaId */ atividadeColaborativa.questao.id
                    ) {
                      let dataA = submissaoEstudante.data;
                      let dataB = Util.firestoreDateToDate(atividade.dataExpiracao);
                      if (dataA <= dataB) {
                        submissoesDessaAtividade.push(submissaoEstudante);
                      }
                    }
                  });
                }

                submissoesDessaAtividade.forEach((sub) => {
                  if (sub.isFinalizada()) {
                    isRespondida = true;
                  }
                });

                //submissoesDessaAtividade = submissoesDessaAtividade.concat(agrupado[estudante]);
              });

              let resultadosTurma = resultadoGrupoExperimental.get(atividade.turmaCodigo);

              if (resultadosTurma != null) {
                if (isRespondida) {
                  resultadosTurma.totalCorretas += 1;
                } else {
                  resultadosTurma.totalIncorretas += 1;
                }
              }

              console.log('GrupoId = ' + grupo.id + ' Status = ' + isRespondida);
            });
          }
        });
        let x = resultadoGrupoExperimental;
      });
    });
  });

  xit("Deve exportar as submissões", (done)=>{
    /* Export.submissoes().subscribe(submissoes=>{
      console.log(submissoes);
      done();
    }) */

    let submissoes = [];

    submissoesEstudantes['submissoes'].forEach((s) => {
      let submissao = Submissao.fromJson(s);

       if(submissao.data.getDate() == 28 && submissao.data.getMonth() == 6)

          submissoes.push(submissao);
    });

    let x = submissoes;
  })

  xit('Deve gerar métricas para análise dos algoritmos', () => {
    function ignorarEstudantes(estudanteId) {


      if (estudantesIgnorados.includes(estudanteId)) {
        return true;
      }

      return false;
    }



    function incluirEstudantes(estudanteId) {
      let estudantes = estudantesGrupo2;

      if (estudantes.includes(estudanteId)) {
        return true;
      }

      return false;
    }

    let submissoesAgrupadasPosFiltro = {};

    let soma = 0;

    let submissoes = [];

    submissoesEstudantes['submissoes'].forEach((s) => {
      if (!ignorar(s['questaoId'])) {
        let submissao = Submissao.fromJson(s);
        submissao['estudanteId'] = submissao.estudante.pk();
        submissoes.push(submissao);
      }
    });

    let agrupado = Submissao.agruparPorEstudante(submissoes);

    Object.keys(agrupado).forEach((estudanteId) => {
      if (!ignorarEstudantes(estudanteId)) {
        if (agrupado[estudanteId].length >= 5) {
          /* if( !incluirHighStudents(estudanteId) ){ */
          if (incluirEstudantes(estudanteId)) {
            soma += agrupado[estudanteId].length;
            submissoesAgrupadasPosFiltro[estudanteId] = agrupado[estudanteId];
          }
          /* } */
        }
      }
    });

    let estatisticas = {};

    let estadosAlgoritmo = [];

    let jsons = [];

    Object.keys(submissoesAgrupadasPosFiltro).forEach((estudanteId) => {
      estatisticas[estudanteId] = {};
      estatisticas[estudanteId][
        'mediaErrosSintaxe'
      ] = AnalyticsProgramacao.calcularMediaErrosSintaxeProgramacao(
        submissoesAgrupadasPosFiltro[estudanteId]
      );
      estatisticas[estudanteId][
        'totalQuestoesComErrosLogico'
      ] = AnalyticsProgramacao.calcularTotalErrosLogicos(submissoesAgrupadasPosFiltro[estudanteId]);
      estatisticas[estudanteId]['totalDesistencias'] = AnalyticsProgramacao.calcularDesistencias(
        submissoesAgrupadasPosFiltro[estudanteId]
      );
      estatisticas[estudanteId][
        'mediaSubmissoesParaAcerto'
      ] = AnalyticsProgramacao.calcularMediaSubmissoesParaAcerto(
        submissoesAgrupadasPosFiltro[estudanteId]
      );
      estatisticas[estudanteId][
        'mediaSubmissoesCorrecaoErro'
      ] = AnalyticsProgramacao.calcularMediaSubmissoesCorrigirErro(
        submissoesAgrupadasPosFiltro[estudanteId]
      );
      estatisticas[estudanteId]['totalExecucoes'] = AnalyticsProgramacao.calcularExecucoes(
        submissoesAgrupadasPosFiltro[estudanteId]
      );
      estatisticas[estudanteId][
        'tentativasQuestoes'
      ] = AnalyticsProgramacao.calculaTentativasQuestoes(submissoesAgrupadasPosFiltro[estudanteId]);
      estatisticas[estudanteId][
        'mediaComentarios'
      ] = AnalyticsProgramacao.calcularCodigosComentados(submissoesAgrupadasPosFiltro[estudanteId]);
      estatisticas[estudanteId][
        'totalQuestoesCorretas'
      ] = AnalyticsProgramacao.calcularTotalQuestoesCorretas(
        submissoesAgrupadasPosFiltro[estudanteId]
      );
      estatisticas[estudanteId][
        'totalRefatoramentos'
      ] = AnalyticsProgramacao.identificarMelhoriasSubmissaoAposConclusao(
        submissoesAgrupadasPosFiltro[estudanteId]
      );
      estatisticas[estudanteId][
        'mediaQuestoesPorSemana'
      ] = AnalyticsProgramacao.calcularMediaQuestoesSemana(
        submissoesAgrupadasPosFiltro[estudanteId]
      );
      let estadosEstudante = AnalyticsProgramacao.identificarSequenciaEstados(
        submissoesAgrupadasPosFiltro[estudanteId]
      );
      estadosAlgoritmo = estadosAlgoritmo.concat(estadosEstudante);
      let matriz = AnalyticsProgramacao.criarMatrizTransicao(estadosEstudante);
      //console.log("Estudante: "+estudanteId);
      jsons.push(
        imprimirMatrizTransicao(
          estudanteId,
          matriz,
          submissoesAgrupadasPosFiltro[estudanteId].length
        )
      );
    });

    //console.log("JSON")
    //console.log(JSON.stringify(jsons));

    let matriz = AnalyticsProgramacao.criarMatrizTransicao(estadosAlgoritmo);
    let matrizProbabilidade = AnalyticsProgramacao.calcularProbabilidadesMatriz(matriz);

    matrizProbabilidade.forEach((probabilidadeEventos, evento, map) => {
      console.log(evento);

      probabilidadeEventos.forEach((probabilidade, e, map) => {
        console.log(e + ' : ' + probabilidade);
      });
    });

    console.log(JSON.stringify(matrizProbabilidade));
  });
});
