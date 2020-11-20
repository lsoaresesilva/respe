import { Injectable } from '@angular/core';
import Questao from '../model/questoes/questao';
import { QuestaoProgramacao } from '../model/questoes/questaoProgramacao';
import { ErroCompilacao } from 'src/app/model/errors/analise-compilacao/erroCompilacao';
import FrequenciaErro from '../model/errors/analise-compilacao/frequenciaErro';
import Erro from '../model/errors/erro';
import Submissao from '../model/submissao';
import { ChatbotService } from './chatbot.service';
import MensagemSuporteMonitor from '../model/mensagemSuporteMonitor';
import { getLabelPorCategoriaNumero } from '../model/errors/enum/labelCategoriasErro';
import Usuario from '../model/usuario';
import Mensagem from '../model/chatbot/mensagem';

@Injectable({
  providedIn: 'root',
})
export class MonitorService {
  constructor(private chatbot: ChatbotService) {}

  /**
         * Given two compilation events, we first check
            whether both compilations ended in error. If they did, we assign a
            penalty. We then compare the error messages encountered. If
            they are the same, another penalty is imposed. If the errors
            occurred on the same line numbers, a third penalty is imposed.
            Finally, the programmer incurs a fourth penalty if the edit location
            of the source code on both events are the same. The penalties are
            normalized and averaged across all pairs of compilations to arrive
            at the final EQ score of the session.
            An EQ score ranges from 0 to 1.0, where 0 is a perfect score
                    */
  calcularErrorQuotient(submissoes: Submissao[]) {
    if (submissoes == null) {
      throw new Error('Estudante precisa ser informado para calcular o seu Error Quotient.');
    }

    // formar pares
    if (submissoes.length > 1) {
      const scores = [];

      for (let i = 0; i < submissoes.length; i++) {
        if (i % 2 == 0) {
          const score = this.getEQ(submissoes[i], submissoes[i + 1]);
          if (score != null) {
            scores.push(score);
          }
        }
      }

      let calcularErrorQuotient = 0;
      scores.forEach((score) => {
        calcularErrorQuotient += score;
      });

      calcularErrorQuotient = calcularErrorQuotient / scores.length;

      return calcularErrorQuotient;
    } else {
      return null;
    }
  }

  /**
   * Calcula o ErrorQuotient entre duas submissões.
   * @param submissaoUm
   * @param submissaoDois
   */
  getEQ(submissaoUm, submissaoDois) {
    if (
      submissaoUm == undefined ||
      submissaoDois == undefined ||
      submissaoDois == null ||
      submissaoUm == null
    ) {
      return null;
    }

    let score = 0;

    if (
      submissaoUm.erro instanceof ErroCompilacao &&
      submissaoDois.erro instanceof ErroCompilacao
    ) {
      score = 8;

      if (submissaoUm.erro.categoria === submissaoDois.erro.categoria) {
        score += 3;
      }
    }

    return score / 11;
  }

  apresentarAjudaEstudanteErroSintaxe(questao: QuestaoProgramacao, estudante) {
    Submissao.getPorQuestao(questao, estudante).subscribe((submissoes) => {
      const errorQuotient = this.calcularErrorQuotient(submissoes);
      // Estabelecemos esse valor de 30% de error quotient arbitrariamente.
      // TODO: modificar o valor a partir dos dados de outros alunos. Identificar o % ideal que pode aumentar com o tempo.
      if (errorQuotient > 0.3) {
        const erros = Submissao.getAllErros(submissoes);
        const frequencia = FrequenciaErro.calcularFrequencia(erros);
        const principalErro = FrequenciaErro.identificarPrincipalErro(frequencia);
        const mensagemSuporte = MensagemSuporteMonitor.getMensagem(
          getLabelPorCategoriaNumero(principalErro.categoriaErro)
        );
        if (Array.isArray(mensagemSuporte)) {
          mensagemSuporte.forEach((mensagem) => {
            this.chatbot.enviarMensagem(new Mensagem(mensagem, this.chatbot.usuario));
          });
        }
        //
      }
    });
  }
}
