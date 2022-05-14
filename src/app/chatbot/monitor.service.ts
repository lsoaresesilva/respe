import { Injectable } from '@angular/core';
import Questao from '../model/questoes/questao';
import { QuestaoProgramacao } from '../model/questoes/questaoProgramacao';
import { ErroCompilacao } from 'src/app/model/errors/analise-compilacao/erroCompilacao';
import FrequenciaErro from '../model/errors/analise-compilacao/frequenciaErro';
import Erro from '../model/errors/erro';
import Submissao from '../model/submissao';
import { ChatbotServiceProprio } from './chatbot-proprio.service';
import MensagemSuporteMonitor from '../model/mensagemSuporteMonitor';
import { getLabelPorCategoriaNumero } from '../model/errors/enum/labelCategoriasErro';
import Usuario from '../model/usuario';
import Mensagem from '../model/chatbot/mensagem';
import { CategoriaErro } from '../model/errors/enum/categoriasErro';
import RegistroMensagemChatbot from '../model/chatbot/registroMensagemChatbot';
import { DialogService } from 'primeng/dynamicdialog';
import { DiarioProgramacaoComponent } from '../srl/monitoramento/diario-programacao/diario-programacao.component';
import { TipoDiarioProgramacao } from '../model/srl/enum/tipoDiarioProgramacao';
import DiarioProgramacao from '../model/srl/diarioProgramacao';
import { LoginService } from '../login-module/login.service';
import ErroPreCompilacao from '../model/errors/analise-pre-compilacao/erroPrecompilacao';
import { Groups } from '../model/experimento/groups';
import MensagemChat from '../model/cscl/chat/mensagemChat';
import Grupo from '../model/cscl/grupo';
import Query from '../model/firestore/query';
import { Observable } from 'rxjs';
import { Util } from '../model/util';
import { ChatbotService } from './chatbot.service';
import ParseAlgoritmo from '../model/errors/analise-pre-compilacao/parseAlgoritmo';

@Injectable({
  providedIn: 'root',
})
export class MonitorService {
  // Armazena qual foi o último suporte dado ao estudante
  suporteRecente;
  suporte: Map<CategoriaErro, String[]>;
  suporteMotivacional: String[];

  constructor(
    private chatbot: ChatbotServiceProprio,
    public dialogService: DialogService,
    private login: LoginService,
    private chatbotMonitor:ChatbotService
  ) {
    this.suporte = new Map<CategoriaErro, String[]>();
    this.suporteMotivacional = [];
    this.suporte.set(CategoriaErro.nameError, []);
    this.suporte.set(CategoriaErro.syntaxError, []);
    this.suporte.set(CategoriaErro.typeError, []);
  }

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

  // TODO: usar isso quando o chatbot for mais avançado e exibir mais de uma mensagem. O método a seguir define qual mensagem seria exibida.
  /*  private deveExibirMensagemAjuda(categoria:CategoriaErro, questao) {
    // Verificar a quantidade de vezes que a mensagem já foi apresentada para uma determinada categoria
    const totalExibicoesCategoria = this.suporte.get(categoria);
    // Se não tiver exibido nada, então mostrar a básica
    if(totalExibicoesCategoria < 2){
      // Se já tiver exibido e for a básica então mostrar a avançada
      if(totalExibicoesCategoria == ){

      }
    }else{

    }

    // Se já tiver sido exibida as duas, não faz nada.
  } */

  isEstudanteInteragindo(grupo: Grupo, estudante: Usuario) {
    return new Observable((observer) => {
      if (grupo != null && estudante != null) {
        /* MensagemChat.getAll(
          [new Query('grupoId', '==', grupo.id), new Query('estudanteId', '==', estudante.pk())],
          'data'
        ).subscribe((mensagens) => {
          if (Array.isArray(mensagens) && mensagens.length > 0) {
            let tempoAgora = new Date();
            if (mensagens[mensagens.length - 1].data != null) {
              let tempoUltimaMensagem = Util.firestoreDateToDate(
                mensagens[mensagens.length - 1].data
              );
              let diffMs = tempoAgora.getTime() - tempoUltimaMensagem.getTime();
              let diffMins = Math.round(diffMs / 60000);
              if (diffMins > 5) {
                observer.next(false);
                observer.complete();
              } else {
                observer.next(true);
                observer.complete();
              }
            }
          } else {
            // Aluno ainda não interagiu
            MensagemChat.getAll(new Query('grupoId', '==', grupo.id), 'data').subscribe(
              (mensagens) => {
                let tempoAgora = new Date();
                if(mensagens[0] != null){
                  let tempoPrimeiraMensagem = Util.firestoreDateToDate(mensagens[0].data);
                let diffMs = tempoAgora.getTime() - tempoPrimeiraMensagem.getTime();
                let diffMins = Math.round(diffMs / 60000);
                if (diffMins > 5) {
                  observer.next(false);
                  observer.complete();
                } else {
                  observer.next(true);
                  observer.complete();
                }
                }

              }
            );
          }
        }); */
      }
    });
  }

  monitorarInteracaoEstudante(grupo: Grupo, estudante: Usuario) {
    this.isEstudanteInteragindo(grupo, estudante).subscribe((isInteragindo) => {
      if (!isInteragindo) {
        const mensagemSuporte = MensagemSuporteMonitor.getMensagem('faltaInteracao');
        let registroMensagem = new RegistroMensagemChatbot(null, mensagemSuporte, estudante);
        registroMensagem.save().subscribe(() => {});
        this.chatbot.enviarMensagem(mensagemSuporte);
      }
    });
  }

  ajudarProblemSolving(estudante, fase) {
    const mensagemSuporte = MensagemSuporteMonitor.getMensagem('problemSolving', fase);
    let registroMensagem = new RegistroMensagemChatbot(null, mensagemSuporte, estudante);
    registroMensagem.save().subscribe(() => {});
    this.chatbot.enviarMensagem(mensagemSuporte);
  }

  monitorarErrosEstudante(
    questao: QuestaoProgramacao,
    estudante: Usuario,
    erro: ErroPreCompilacao
  ) {
    let enviarMensagem = false;
    let mensagens: Mensagem[] = [];

    // TODO: Precisa melhorar, pois está parecido com as mensagens do console.
    /* if (erro != null) {
      mensagens.push(new Mensagem('Há um erro no seu algoritmo...', null));
      mensagens.push(new Mensagem('Possivelmente ' + erro.mensagem, null));
    } */
    Submissao.getPorQuestao(questao, estudante).subscribe((submissoes) => {
      const errorQuotient = this.calcularErrorQuotient(submissoes);
      // Estabelecemos esse valor de 30% de error quotient arbitrariamente.
      // TODO: modificar o valor a partir dos dados de outros alunos. Identificar o % ideal que pode aumentar com o tempo.
      if (errorQuotient > 0.3) {
        // Não é para pegar o principalErro, mas sim o mais recente.
        /* const erros = Submissao.getAllErros(submissoes);
        const frequencia = FrequenciaErro.calcularFrequencia(erros);

        const principalErro = FrequenciaErro.identificarPrincipalErro(frequencia); */
        const submissao = Submissao.filtrarRecente(submissoes);
        if (submissao.erro != null) {
          let algorimoParser = new ParseAlgoritmo(submissao.linhasAlgoritmo());
          let mensagemRASA = algorimoParser.getMainError(submissao.erro.traceback);
          this.chatbotMonitor.sendMessage(estudante.pk(), mensagemRASA);

          /* const suporteParaCategoria = this.suporte.get(submissao.erro.categoria);

          if (!suporteParaCategoria.includes(questao.id)) {
            this.suporteRecente = submissao.erro.categoria;
            enviarMensagem = true;
            suporteParaCategoria.push(questao.id);
            const mensagemSuporte = MensagemSuporteMonitor.getMensagem(
              getLabelPorCategoriaNumero(submissao.erro.categoria)
            );

            if (mensagemSuporte != null && mensagemSuporte.texto != null) {
              mensagens.push(mensagemSuporte);
              let registroMensagem = new RegistroMensagemChatbot(null, mensagemSuporte, estudante);
              registroMensagem.save().subscribe(() => {});

            } */
          //}
          /* else {
            if (errorQuotient > 0.7) {
              if (!this.suporteMotivacional.includes(questao.id)) {
                this.suporteMotivacional.push(questao.id);
                const mensagemSuporteMotivacional = MensagemSuporteMonitor.getMensagem(
                  'mensagensMotivacionais'
                );
                if (
                  mensagemSuporteMotivacional != null &&
                  mensagemSuporteMotivacional.texto != null
                ) {
                  let registroMensagem = new RegistroMensagemChatbot(
                    null,
                    mensagemSuporteMotivacional.texto,
                    estudante
                  );
                  registroMensagem.save().subscribe(() => {});
                  mensagens.push(mensagemSuporteMotivacional);
                }
              }
            }
          } */
        }
      }
      //this.chatbot.enviarMensagem(mensagens);
    });
  }

  /* oferecerMaisAjuda() {
    if (this.suporteRecente == CategoriaErro.nameError) {
      const mensagemSuporte = MensagemSuporteMonitor.getMensagem(
        getLabelPorCategoriaNumero('NameErrorParteDois')
      );
      if (mensagemSuporte.texto != null) {
        this.chatbot.enviarMensagem(mensagemSuporte.mensagens);
      }
    }
  } */
}
