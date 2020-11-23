import { Assunto } from 'src/app/model/assunto';
import { Injectable } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { FelicitacoesComponent } from './felicitacoes/felicitacoes.component';

@Injectable({
  providedIn: 'root'
})
export class MonitoramentoMotivacionalService {

  constructor(public dialogService: DialogService) { }

  exibirDialog(header, mensagem){
    const ref = this.dialogService.open(FelicitacoesComponent, {
      header: header,
      data: {
        mensagem: mensagem
      },
      width: '70%'
  });
  }

  monitorarProgressoAssunto(assunto, estudante) {
    Assunto.calcularPercentualConclusao(assunto, estudante).subscribe(progresso => {
      if (this.exibirDialogProgressoAssunto(progresso)) {
        this.exibirDialog("Parabéns!", this.getMensagemProgressoAssunto(progresso));
      }
    });
  }

  monitorarErrorQuotient(errorQuotient){
    if(errorQuotient > 0.8){
      // verificar se já foi exibido na semana
      const exibirDialog = this.exibirDialogErrorQuotient();

      if(exibirDialog){

        this.exibirDialog("", "Não tem problema..."); // TODO: colocar em um arquivo .json
      }

    }
  }

  exibirDialogErrorQuotient():boolean{
    const msgErrorQuotient = localStorage.getItem("msgErrorQuotient");
    let exibirDialog = false;

    if(msgErrorQuotient != null){
      let dado = JSON.parse(msgErrorQuotient);
      if(dado != null){
        const semanaAtras = new Date();
        const diffTime = semanaAtras.getTime() - dado.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));
        if (diffDays >= 3) {
          exibirDialog = true;
        }
      }
    }else{
      exibirDialog = true;
    }

    if(exibirDialog){
      localStorage.setItem("msgErrorQuotient", JSON.stringify(new Date()));
    }

    return exibirDialog;
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
      } else {
        return true;
      }
    }
  }

  getMensagemProgressoAssunto(progresso) {
    let percentual;
    if (progresso >= 30 && progresso < 50) {
      percentual = '30%'
    } else if (progresso >= 50 && progresso < 70) {
      percentual = '50%'
    } else if (progresso >= 70 && progresso < 100) {
      percentual = '70%'
    }

    if(progresso == 100){
      return "Você concluiu o assunto!";
    }

    return  `Você ultrapassou ${percentual} do progresso no assunto!`; // TODO: colocar em um arquivo .json
  }
}
