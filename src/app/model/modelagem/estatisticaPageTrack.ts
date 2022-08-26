import { Observable, forkJoin } from 'rxjs';
import { PerfilUsuario } from '../enums/perfilUsuario';
import { Groups } from '../experimento/groups';
import Grafo from './grafo';
import Submissao from '../submissao';
import Usuario from '../usuario';
import AnalyticsProgramacao from '../analytics/analyticsProgramacao';
import PageTrackRecord from '../analytics/pageTrack';
import { Assunto } from '../questoes/assunto';

export default class EstatisticaPageTrack {

  static contarAcessos(tracks:any[]){
    let grafo = new Grafo(tracks);
    //let tracksAgrupados = grafo.prepararDados();
    let estados = new Map<string, Map<string, number>>();
    let navegacao = [];
    /* tracksAgrupados.forEach((mTrack) => {

      navegacao.push(grafo.criarMatrizTransicaoAgrupadaEstudante(mTrack));
    }); */
    let x = navegacao;

    let navegacaoEstudantes = new Map<string, Map<string, number>>();
    for (let i = 0; i < tracks.length; i++) {
      let source = tracks[i].pagina; // De onde ele estava
      let target = tracks[i + 1]; // Para onde ele foi
      if (target != undefined && (target.pagina != "atividade-grupo")) {

        if((source == "editor" && target.pagina == "self-instruction") ||
        target.pagina == "ranking" || target.pagina == "listagem-diarios" ||
        target.pagina == "meu-desempenho" || target.pagina == "visualizacao-algoritmo" ||
        target.pagina == "visualizacao-resposta-questao"){
              let estudanteId = tracks[i].estudante.id;
              let contagens = navegacaoEstudantes.get(estudanteId);
              if(contagens == null){
                contagens = new Map<string, number>();
                navegacaoEstudantes.set(estudanteId, contagens);
              }

              let contagem = contagens.get(target.pagina);
              if (contagem == null) {
                contagens.set(target.pagina, 0);
              }
              contagem = contagens.get(target.pagina);
              contagens.set(target.pagina, contagem + 1);
        }



      }
    }

    return navegacaoEstudantes;
  }


  static estrategiasSRLsemanas(pageTrack:object){
    // Agrupar por semanas
    let pageTracks = []
    for (let [estudanteId, p] of Object.entries(pageTrack)) {
        pageTracks = pageTracks.concat(p);
    }

    let mapaSeamanas = PageTrackRecord.agruparPorSemana(pageTracks);

    return mapaSeamanas;
}

  static gerarDadosPageTrack(pageTracks: object, assuntos: Assunto[], submissoes: object) {
    let registros = [];

    for (let [estudanteId, tracks] of Object.entries(pageTracks)) {
      registros.push(
        Object.assign(
          {},
          { estudanteId: estudanteId },
          PageTrackRecord.contarVisualizacoesPorPagina(tracks)
        )
      );
      let markov = new Grafo(tracks).criar();
    }



    for (let [estudanteId, s] of Object.entries(submissoes)) {
      // Procurar em registro pelo estudante.

      // Na sua submissão incluir como um atributo do seu objeto
      let usuario = new Usuario(
        estudanteId,
        '',
        '',
        PerfilUsuario.estudante,
        Groups.experimentalA,
        ''
      );
      let submissoesEstudante = s as Submissao[];
      let progresso = AnalyticsProgramacao.calcularProgressoProgramacao(
        assuntos,
        submissoesEstudante
      );
      registros.forEach((registro) => {
        if (registro['estudanteId'] == estudanteId) {
          registro['progresso'] = progresso*100;
        }
      });
    }
    return registros;
  }
}
