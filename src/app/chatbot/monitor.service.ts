import { Injectable } from '@angular/core';
import Questao from '../model/questoes/questao';
import { QuestaoProgramacao } from '../model/questoes/questaoProgramacao';
import { ErroCompilacao } from 'src/app/model/errors/analise-compilacao/erroCompilacao';
import FrequenciaErro from '../model/errors/analise-compilacao/frequenciaErro';

@Injectable({
  providedIn: 'root',
})
export class MonitorService {
  constructor() {}

  analisarDesempenhoQuestao(questao: QuestaoProgramacao, estudante) {
    questao.getErrosEstudante(estudante).subscribe((erros: ErroCompilacao[]) => {
      const frequencia = FrequenciaErro.calcularFrequencia(erros);
    });
  }
}
