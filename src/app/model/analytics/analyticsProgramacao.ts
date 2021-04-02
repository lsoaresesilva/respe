import { Assunto } from '../assunto';
import Submissao from '../submissao';
import { Util } from '../util';

export default class AnalyticsProgramacao {
  static calcularExecucoes(submissoes) {
    return Array.isArray(submissoes) ? submissoes.length : 0;
  }



  static calcularTotalErrosProgramacao(submissoes: Submissao[]) {
    if (Array.isArray(submissoes)) {
      let totalErros = 0;
      submissoes.forEach((submissao) => {
        if (submissao.erro != null) {
          totalErros += 1;
        }
      });
      return totalErros;
    } else {
        return null;
    }
  }

  /**
   * Erros lógicos ocorrem quando o algoritmo não apresenta erros de sintaxe, mas os testes cases não estão corretos.
   * @param submissoes
   * @returns
   */
  static calcularTotalErrosLogicos(submissoes: Submissao[]) {
    if (Array.isArray(submissoes)) {
        let totalErros = 0;
        submissoes.forEach((submissao) => {
        let hasErro = false;
        if (submissao.erro == null) {
            submissao.resultadosTestsCases.forEach((resultado) => {
            if (!resultado.status) {
                hasErro = true;
            }
            });

            if (hasErro) {
            totalErros += 1;
            }
        }
        });

        return totalErros;
    }else{
        return null;
    }
    
  }

  static calcularProgressoProgramacao(assuntos:Assunto[], submissoes:Submissao[]){
      let submissoesUnicas = Submissao.getSubmissoesUnicas(submissoes);
      let progresso = 0;
      assuntos.forEach(assunto=>{
          progresso += this._calcularPercentualConclusaoQuestoesProgramacao(assunto, submissoesUnicas);
      })
      if(progresso != 0 && assuntos.length != 0){
        return progresso/assuntos.length;
      }else{
          return progresso;
      }
      
  }

  static _calcularPercentualConclusaoQuestoesProgramacao(assunto, submissoes:Submissao[], margemAceitavel = 0.6){
    const totalQuestoes = assunto.questoesProgramacao.length;
    const questoesRespondidas = [];
    assunto.questoesProgramacao.forEach((questao) => {
      const questaoRespondida = true;
      // for (let j = 0; j < questao.testsCases.length; j++) {
      const resultadoAtualTestCase = null;

      submissoes.forEach(submissao=>{
        if(submissao["questaoId"] == questao.id){
          const totalTestsCases = questao.testsCases.length;
          let totalAcertos = 0;
          if (submissao.resultadosTestsCases.length != 0) {
            submissao.resultadosTestsCases.forEach((resultadoTestCase) => {
              if (resultadoTestCase.status) {
                totalAcertos++;
              }
            });

            const percentual = totalAcertos / totalTestsCases;
            if (percentual >= margemAceitavel) {
              questoesRespondidas.push(questao);
            }
          }
        }
      })
    });
    if(questoesRespondidas.length > 0){
        return questoesRespondidas.length / totalQuestoes;
    }else{
        return 0;
    }
    
  }

  static calculaTentativasQuestoes(submissoes) {
    return Submissao.agruparPorQuestao(submissoes).size;
  }

  static calcularTempoMedioEntreSubmissoes(submissoes: Submissao[]) {
    if (Array.isArray(submissoes)) {
        let tempoEmSegundos = 0;
        let submissoesValidasParaContagem = []
        for (let i = 0; i < submissoes.length; i++) {
        if (submissoes[i + 1] != null) {
            let submissaoAnterior = Util.firestoreDateToDate(submissoes[i].data);
            let submissaoAseguir = Util.firestoreDateToDate(submissoes[i + 1].data);
            let mesmoDia = submissaoAnterior.getDate() == submissaoAseguir.getDate();
            let feitaDentroDezMinutos = ((submissaoAseguir.getTime() - submissaoAnterior.getTime()) / 1000) < 600 
            let difEntreMinutos = submissaoAseguir.getMinutes() - submissaoAnterior.getMinutes();
            if (submissaoAnterior != null && submissaoAseguir != null && mesmoDia == true && feitaDentroDezMinutos == true) { // Apenas comparar duas submissões do mesmo dia
                tempoEmSegundos += ((submissaoAseguir.getTime() - submissaoAnterior.getTime()) / 1000);
                submissoesValidasParaContagem.push({d1:submissaoAnterior, d2:submissaoAseguir, tempo:(submissaoAseguir.getTime() - submissaoAnterior.getTime()) / 1000})
            }

            
        }
        }

        if (tempoEmSegundos != 0 && submissoes.length != 0) {
        return tempoEmSegundos / submissoesValidasParaContagem.length;
        }

        return 0;
    }else{
        return null;
    }

    
  }
}
