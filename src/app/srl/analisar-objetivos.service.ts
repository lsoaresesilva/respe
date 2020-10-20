import { Injectable } from '@angular/core';
import Query from '../model/firestore/query';
import { Planejamento } from '../model/planejamento';
import Usuario from '../model/usuario';
import { forkJoin, Observable } from 'rxjs';
import Submissao from '../model/submissao';
import TempoOnline from '../model/tempoOnline';

@Injectable({
  providedIn: 'root',
})
export class AnalisarObjetivosService {
  constructor() {}

  /*
    TODO: Melhorar a performance dessa função, pois está carregando todas as submissões de um usuário, o que deve ser um número grande.
    Verificar a possibilidade de usar um where para um intervalo de datas diretamente no firestore
  */
  verificarObjetivoExercicios(estudante: Usuario) {
    return new Observable((observer) => {
      if (estudante != null && estudante.pk != null) {
        // Recuperar o total de exercícios esperados por semana
        forkJoin([
          Planejamento.getByQuery(new Query('estudanteId', '==', estudante.pk())),
          Submissao.getExerciciosTrabalhadosUltimaSemana(estudante),
        ]).subscribe((resultados) => {
          const numeroExerciciosSemana = resultados[0]['objetivoExercicio'];
          const numeroExerciciosTrabalhados = Array.isArray(resultados[1])
            ? resultados[1].length
            : 0;
          const percentual =
            numeroExerciciosTrabalhados > 0
              ? ((numeroExerciciosTrabalhados / numeroExerciciosSemana) * 100).toFixed(2)
              : 0;
          observer.next(percentual);
          observer.complete();
        });
      }
    });
  }

  verificarObjetivoTempoOnline(estudante: Usuario) {
    return new Observable((observer) => {
      if (estudante != null && estudante.pk != null) {
        forkJoin([
          Planejamento.getByQuery(new Query('estudanteId', '==', estudante.pk())),
          TempoOnline.getTempoOnlineUltimaSemana(estudante),
        ]).subscribe((resultados) => {
          const numeroTempoOnlineSemana = resultados[0]['tempoEstudo'];
          const tempoOnline = Array.isArray(resultados[1]) ? resultados[1].length : 0;
          const percentual =
            tempoOnline > 0 ? ((tempoOnline / numeroTempoOnlineSemana) * 100).toFixed(2) : 0;
          observer.next(percentual);
          observer.complete();
        });
      }
    });
  }
}
