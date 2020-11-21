import { Assunto } from 'src/app/model/assunto';
import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MonitoramentoMotivacionalService {

  constructor(dialog: ConfirmationService) { }

  monitorarProgressoAssunto(assunto, estudante) {
    Assunto.calcularPercentualConclusao(assunto, estudante).subscribe(progresso => {
      if(this.exibirDialogProgressoAssunto(progresso)){

      }
    });
  }

  /* Cenários:

  1v - 32
  2v - 40
  3v - 51
  4v - 78 */

  exibirDialogProgressoAssunto(progresso: number) {
    if (progresso < 30 ) {
      return false;
    }

    function superouProgresso(progressoAtual, progressoAnterior, limiteMin, limiteMax) {
      if (progressoAtual >= limiteMin && progressoAtual < limiteMax) {
        if (progressoAnterior >= limiteMin && progressoAnterior < limiteMax) {
          return false;
        }
        return true;
      }
    }

    const progressoAssunto = localStorage.getItem('progressoAssunto');
    if (progressoAssunto == null) {
      localStorage.setItem('progressoAssunto', progresso.toString());
      return true;
    } else {
      const progressoAnterior = parseFloat(progressoAssunto);
      if (progresso >= 30 && progresso < 50) {
        return superouProgresso(progresso, progressoAnterior, 30, 50);
      } else if (progresso >= 50 && progresso < 70) {
        return superouProgresso(progresso, progressoAnterior, 50, 70);
      } else if (progresso >= 70 && progresso < 100) {
        return superouProgresso(progresso, progressoAnterior, 70, 100);
      }else{
        return true;
      }
    }
  }

  getMensagemProgressoAssunto(progresso){
    let percentual;
    if(progresso >= 30 && progresso < 50){
      percentual = "30%"
    }else if(progresso >= 50 && progresso < 70){
      percentual = "50%"
    }else if(progresso >= 70 && progresso < 100){
      percentual = "70%"
    }else{
      percentual = "1000%"
    }

    let mensagem = "Você alcançou "
  }
}
