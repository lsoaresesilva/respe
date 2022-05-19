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
