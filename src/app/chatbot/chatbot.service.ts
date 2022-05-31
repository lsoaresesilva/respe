import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ChatbotService {
  constructor(private http: HttpClient) { }
  // ------------------ VARIÁVEIS ------------------
  public url: string = "https://www.izzypeazy.com:5005";
  //public url: string = "http://localhost:5005";
  // Mandar as mensagens para o widget
  public messageUpdate = new EventEmitter();
  public latestMessageArr: Observable<any[]>;
  // Avisar que foi emitida uma mensagem de erro/ajuda no exercício
  public triggerRasaMessage = new EventEmitter();
  public mensagemTrigger = {};
  public questaoOrdem;
  public questaoId;
  // Adicionar conceito à tela do algoritmo (quando se pressiona o botão - chat-buttons)
  public conceptUpdate = new EventEmitter();
  public conceptsClicked = [];
  // Ativar e desativar botões de escolha de conceitos (quando é para ordenar)
  public enableButton = new EventEmitter();
  public buttonToEnable;
  // Informar o chatbot que o aluno já pode pedir ajuda no exercício
  public helpActivate = new EventEmitter();
  public canAskHelp = false;
  // Informações para mandar a mensagem ao RASA
  public senderID;
  public currHelpInfo = "";
  public errorsHelped = [];
  public currErrorInfo = "";

  // Usado para desativar/ativar os botões de ordenação à medida que o aluno vai selecionando
  public chooseConcept(concept) {
    let num = concept.split(" ")[0]
    if (/^-?\d+$/.test(num) === true) {
      this.conceptsClicked = this.conceptsClicked.splice(Number(num), 2);
      this.buttonToEnable = Number(num);
      this.enableButton.emit();
    }
    else {
      this.conceptsClicked.push(concept);
    }
    this.conceptUpdate.emit();
  }

  // Usada para informar o chatbot que o aluno já pode pedir ajuda sobre o ex (2 min)
  public enableStudentAskExHelp(message, messageCode) {
    this.sendMessage(messageCode);
    setTimeout(() => {
      this.canAskHelp = true;
      this.sendMessage(message);
      this.helpActivate.emit();
    }, 120000);
  }

  public sendDadosRasa(resposta) {
    let messageCode = `/EXTERNAL_CODE_INFO{"code_message_answer":"${resposta.replace(/"/g, "'")}", "code_question_id":"${this.questaoId}"}`
    return messageCode
  }
  public sendDados(dadosQuestao) {
    this.questaoOrdem = dadosQuestao;
  }

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! RASA !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  // Faz conecção com o RASA (reinicia a conversa --> /restart)
  public initRasaChat(senderID): Observable<any> {
    this.senderID = senderID;
    const trackerEventsUrl = this.url + `/conversations/${senderID}/tracker/events`;
    return this.http
      .post(trackerEventsUrl, {
        event: 'restart'
      })
      .pipe(
        mergeMap(() =>
          this.http.post(trackerEventsUrl, {
            event: 'action',
            name: 'action_listen'
          })
        ),
      );
  }

  // Manda as mensagens ao RASA
  // url: para se conectar ao rasa
  // user: id do user (necessário para o rasa) (estou a fazer de forma aleatória aqui neste service)
  // message: mensagem para mandar ao RASA
  // mensagem para o erro {'contexto': 'Função', 'mensagem': 'Faltou utilizar :'}
  // mensagem para a ajuda no exercício {teste: testCase, resposta: answerCode}
  public sendMessage(message) {
    // ################## REFORMULAR MENSAGEM ##################
    if (typeof message !== 'string') {
      if (message.contexto !== undefined) {
        // Formação da mensagem a enviar ao rasa
        message = `/EXTERNAL_ERROR_MESSAGE{"error_type":"${message.contexto}", "error_message":"${message.mensagem}"}`
        this.mensagemTrigger = message;
        this.triggerRasaMessage.emit();
        // Não perguntar por ajuda se esta já tiver sido dada
        if (this.errorsHelped.includes(message)) {
          return
        }
        // Adicionar mensagem de ajuda a array
        this.errorsHelped.push(message);
      }
      else {
        // Se for um novo exercício dar restart do timer e limpar o array com os erros já ajudados
        if (message !== this.currHelpInfo) {
          this.errorsHelped = [];
          this.currHelpInfo = message;
          this.canAskHelp = false;
          this.helpActivate.emit();
        }
        // O RASA é um pouco estranho com as mensagens que aceita, por isso tenho de as modificar
        // --- Formar a string com o/os input/s e o/os output/s do caso de teste ---
        let test_case_string = "";
        if (message.teste !== undefined) {
          let test_case_inputs = message.teste.entradas;
          let test_case_outputs = message.teste.saida;
          test_case_inputs.forEach(element => test_case_string = test_case_string + "<input>" + element);
          test_case_string = test_case_string + "<sep>";
          if (Array.isArray(test_case_outputs) === true) {
            test_case_outputs.forEach(element => test_case_string = test_case_string + "<output>" + element);
          }
          else {
            test_case_string = test_case_string + "<output>" + test_case_outputs;
          }
        }
        // -------------------------------------------------------------------------
        // Criação de uma string com todos os elementos do array da resposta
        // A resposta é composta por um array [resposta, número da pergunta]
        this.questaoOrdem = message.resposta[1];
        this.questaoId = this.questaoOrdem[2]

        let resposta_código = ""
        message.resposta[0].forEach(linha_código => {
          resposta_código = resposta_código + linha_código + "<new_line><br>";
        });

        let messageCode = this.sendDadosRasa(resposta_código);

        //this.mensagemTrigger = messageCode;
        //this.triggerRasaMessage.emit();

        // Formação da mensagem a enviar ao rasa
        message = `/EXTERNAL_CODE_MESSAGE{"code_test_case":"${test_case_string.replace(/"/g, "'")}", "code_message_answer":"${resposta_código.replace(/"/g, "'")}", "code_question_id":"${this.questaoId}"}`

        // Envio de um trigger para adicionar na base de dados
        this.mensagemTrigger = message;
        this.triggerRasaMessage.emit();

        // Se for a primeira vez que é chamado esperar pelo timer e chamar outra vez
        if (this.canAskHelp === false) {
          this.enableStudentAskExHelp(message, messageCode);
          return
        }
      }
    }
    // #########################################################
    // #################### MANDAR MENSAGEM ####################
    const rasaMessageUrl = this.url + "/webhooks/rest/webhook";
    this.latestMessageArr = this.http
      .post<any[]>(rasaMessageUrl, {
        message,
        sender: this.senderID,
      })
      .pipe(
        map((responseMessages: any[]) =>
          responseMessages.map(m => {
            // ##### -> Para os diferentes tipos de resposta <- #####
            // Para quando a resposta conté botões
            if (m["buttons"] !== undefined) {
              // Verificar se a resposta também contém texto
              if (m["text"] !== undefined) {
                return { message: m["text"], buttons: m["buttons"], type: "buttons" }
              }
              // Apenas contém butões
              else {
                return { buttons: m["buttons"], type: "buttons" }
              }
            }
            else {
              // Estas tags, parecidas a html, foram fabricadas por mim apenas para simbolizar
              // os diferentes tipos te texto
              // --> Resposta contém código <--
              if (m["text"].includes("<code>")) {
                return { message: m["text"].replace("<code>", ""), type: "code" }
              }
              // --> Resposta contém texto para fazer append <--
              if (m["text"].includes("<text>")) {
                return { message: m["text"].replace("<text>", ""), type: "texto" }
              }
              // --> Resposta contém resultado do código <--
              else if (m["text"].includes("<code_print>")) {
                return { message: m["text"].replace("<code_print>", ""), type: "print" }
              }
              // --> Resposta contém resultado do código <--
              else if (m["text"].includes("<ajuda>")) {
                return { message: m["text"].replace("<ajuda>", ""), type: "help" }
              }
              // --> Resposta contém os botões para o exercício de ordenar <--
              else if (m["text"].includes("<buttons_order>")) {
                let btnArr = m["text"].replace("<buttons_order>", "").split("<sep>");
                let btnArrFinal = []
                btnArr.forEach(element => {
                  btnArrFinal.push(element.split("<num>"));
                });
                return { message: btnArrFinal, type: "buttons_order" }
              }
              // --> Resposta contém dicas para o exercício de ordenar <--
              else if (m["text"].includes("<buttons_order_second>")) {
                let btnArr = m["text"].replace("<buttons_order_second>", "").split("<sep>");
                let btnArrFinal = []
                btnArr.forEach(element => {
                  btnArrFinal.push(element.split("<num>"));
                });
                return { message: btnArrFinal, type: "buttons_order_second" }
              }
              // --> Resposta é texto simples <--
              return { message: m["text"], type: "text" }
            }
          })
        ),
      )
    //if (message.split("{")[0] !== "/EXTERNAL_CODE_INFO") {
      // Informar o widget de nova resposta do chatbot
      this.messageUpdate.emit();
      // #########################################################
    //}
  }
}
