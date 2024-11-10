// Adapted from:
// https://github.com/Poio-NLP/poio-chatbot-ui
// https://github.com/contribution-jhipster-uga/angular-chat-widget-rasa
import { Component, HostListener, Input, OnInit, ElementRef, ViewChild } from '@angular/core'
import { fadeIn, fadeInOut } from '../animations'
import { ChatbotService } from '../chatbot.service';
import { LoginService } from '../../login-module/login.service';
import RegistroMensagensRasa from 'src/app/model/chatbot/registroMensagensRasa';
import { Util } from '../../model/util';

@Component({
  selector: 'chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.css'],
  animations: [fadeInOut, fadeIn],
})

export class ChatWidgetComponent implements OnInit {
  @ViewChild('bottom') private myScrollPosition: ElementRef;
  // ############################### VARIÁVEIS ###############################
  // Tema do chatbot
  @Input() public theme: 'blue' | 'grey' | 'red' = 'blue';
  // Titulo que aparece na janela do chat
  @Input() public botName: string = 'Monitor';
  // Icons dos users que aparecem na conversa
  @Input() public botAvatar: string = "/assets/botAvatar.png";
  @Input() public userAvatar: string = "/assets/userAvatar.jpg";
  // URL para se conectar ao chatbot
  // Primeira mensagem
  @Input() public startingMessage = 'Olá 👋, eu sou um monitor que está aqui para o ajudar. A qualquer momento poderá fazer perguntas como "O que é uma variável?", ou "Qual é um exemplo de uma condição?", que eu farei o meu melhor para responder! Estarei também aqui para quando tiver problemas na resolução dos seus exercicios! 👾'
  // Controla se a janela começa aberta ou fechada
  @Input() public opened: boolean = false;
  // Mensagens
  public exHelpMsg = 'Só relembrar que se precisar de ajuda no exercício me mande um "Me ajuda no exercício?"'
  public suggestionsMsg = "Aqui vão algumas sugestões de perguntas que possam ajudar:"

  // Controla a mensagem de intrpdução (pop up) do chatbot
  public visible_intro = true;
  public stopIntroMessage;
  // Abrir/fechar a janela do chat <--
  public _visible = false;
  userName: any;
  public get visible() { return this._visible; }
  @Input() public set visible(visible) { this._visible = visible; }
  // Mostrar o widget
  public mainVisible = false;
  // TimeOut para fechar a janela 
  public closeWindow;
  public visibleCloseWindow = false;
  // ------------ Variáveis para as mensagens da conversa -------------
  // Contém as mensagens que aparecem na janela do chatbot
  public messages = [];
  // Para controlar a mensagem de novas mensagens
  public controlNewMsg = false;
  // Array com TODAS as mensagens (inclui a primeira mensagem,
  // por exemplo, qual foi o erro, que não se mostra ao estudante)
  public wholeConversation = [];
  public isFirstMessage = false; // !!!!!! Verificar utilidadde !!!!!!
  // Controla de quem é a mensagem
  public monitor;
  public estudante;
  // Verifica se é a mensagem inicial
  public isFirstMsg = true;
  public firstStore = true;
  public registroMensagem;
  // -------------------------------------------------------------------

  // Usada para verificar se o aluno já pode pedir ajuda
  public canAskExHelp = false;
  public timeOutSuggestions;
  // ---- Váriáveis usadas para o exercício de ordenar os conceitos ----
  public isConceptOrderDisabled = true;
  public isConceptSecond = false;
  public conceptsChosen = [];
  public deactivateBtnsIds = [];
  public isInitHelpMsg = true;
  // -------------------------------------------------------------------
  public client;
  public currScrollPosition = 0;
  public newMsgWarningVisible = false;
  // #########################################################################
  public counterSuggestionsOn = false;

  public messagesSub;
  public helpSub;
  public conceptSub;
  public triggerSub;
  public hasGivenSuggestions = false;

  public msgCodeInfo = true;
  public conceptOrderQuestionsGive = false;

  // Controlar a mensagem de "novas mensagens"
  public checkViewedMens() {
    if (this.myScrollPosition.nativeElement.scrollHeight - this.myScrollPosition.nativeElement.scrollTop < this.myScrollPosition.nativeElement.offsetHeight + 10 || !this.controlNewMsg) {
      this.newMsgWarningVisible = false;
      this.controlNewMsg = false;
    }
    else {
      this.newMsgWarningVisible = true;
    }
  }

  constructor(private chatbotService: ChatbotService, private login: LoginService) {

    // ################ CHATBOT SERVICE - NOVAS MENSAGENS ################
    // ------------------> Nova mensagem do RASA <-------------------
    // Para quando é mandada uma mensagem ao RASA de outro componente (mensagem de erro, ...)
    this.triggerSub = this.chatbotService.triggerRasaMessage.subscribe(() => {
      let mensagem = this.chatbotService.mensagemTrigger;
      this.wholeConversation.push({ from: "App", text: mensagem, type: "info", date: new Date().getTime() });
      // Aidicionar as mensagens de info mandandos ao rasa à base de daos
      if (this.registroMensagem === undefined) {
        this.registroMensagem = new RegistroMensagensRasa(null, this.chatbotService.questaoOrdem, this.userName, this.wholeConversation);
      }
      else {
        this.registroMensagem.conversa = this.wholeConversation;
      }
      this.registroMensagem.save().subscribe(() => { });
    });
    // -----------------------------------------------------
    this.messagesSub = this.chatbotService.messageUpdate.subscribe(() => {
      // Novas mensagens
      this.chatbotService.latestMessageArr.subscribe(
        responseMessages => {
          // Se não for a primeira mensagem no array da conversa...
          if (this.messages[0] !== undefined) {
            // Parar animação de estar a escrever (...)
            if (this.messages[this.messages.length - 1].text === "Estou a pesquisar a resposta por favor aguarde") { this.messages.pop(); }
          }
          // Retornar erro se a mensagem do RASA vier vazia
          if (responseMessages.length === 0) {
            if (!this.isFirstMsg) {
              this.addMessage(this.monitor, "Desculpe estou com algumas dificuldades, por favor tente mais tarde 🤕. Tentarei resolver o problema o mais rapidamente possível!", "erro", 'received');
            }
          }
          // Mostrar mensagem retornada pelo RASA
          else {
            this.organizeMessages(responseMessages);
            this.isFirstMsg = false;
            //this.newMsgWarningVisible = true;
            this.checkViewedMens();
            //this.visible = true;
          }
        });
      // -------------------------------------------------------------------------------
      // Abrir janela do chat se ela estiver fechada (ao receber mensagem inicial (erro/ajuda))
      if (!this.visible && !this.msgCodeInfo) {
        this.visible_intro = false;
        clearTimeout(this.stopIntroMessage);
        this.visible = true;
        //TimeOut de 1 millisegundos para dar tempo de carregar as informações do algoritmo
        if (this.messages.length > 1) {
          setTimeout(() => {
            this.myScrollPosition.nativeElement.scrollTop = this.currScrollPosition;
          }, 1)
        }
      }
      this.msgCodeInfo = false;
    });
    // --> Botão selecionado <--
    this.conceptSub = this.chatbotService.conceptUpdate.subscribe(() => {
      this.conceptsChosen = this.chatbotService.conceptsClicked;
    });
    // --------> Já pode pedir ajuda no exercício <----------
    this.helpSub = this.chatbotService.helpActivate.subscribe(() => {
      this.canAskExHelp = this.chatbotService.canAskHelp;
    });
  }

  ngOnInit() {
    // Aparecer o widget apenas passado 3s para dar tempo da página carregar
    setTimeout(() => {
      this.mainVisible = true;
      // Para balão de atenção passado 10s
      this.stopIntroMessage = setTimeout(() => {
        this.visible_intro = false;
      }, 10000);
    }, 3000);

    // Controlar os nomes e os icones
    /* this.userName = this.login.getUsuarioLogado().pk();
    this.estudante = {
      name: this.login.getUsuarioLogado().pk(),
      avatar: this.userAvatar,
    }; */
    this.monitor = {
      name: this.botName,
      avatar: this.botAvatar,
    };
    // CONECTAR AO RASA
    this.chatbotService
      .initRasaChat(this.userName)
      .subscribe(
        data => console.log('Rasa conversa inicializada'),
        error => console.error('Erro ao conectar com RASA'),
      );
  }

  // ADD MESSAGE
  // ###################### FUNÇÃO PARA ADICIONAR NOVAS MENSAGENS #######################
  // O type, é simplesmente para controlar o css dos diferentes tipos (texto, codigo, botões, ...)
  public addMessage(from, text, type, direction: 'received' | 'sent') {
    // Se for mensagem do aluno parar o timer de fechar a janela
    if (!this.visibleCloseWindow && type !== "help") {
      clearTimeout(this.closeWindow);
    }
    // Se for mensagem de trigger, avisar que é para fechar a janela
    else if (type === "help" || this.visibleCloseWindow) {
      // -------------> Fechar janela do chat <---------------
      if (this.visibleCloseWindow || (text === this.exHelpMsg && !this.messages.includes(text))) {
        if (this.closeWindow !== undefined) {
          clearTimeout(this.closeWindow);
        }
        this.closeWindow = setTimeout(() => {
          this.visible = false;
        }, 20000);
      }
      // -----------------------------------------------------
    }

    // ----------------> Mostrar Sugestões <----------------
    // Não mostrar as sugestões se já tiverem sido pedidas pelo aluno
    if (text === this.suggestionsMsg) {
      this.hasGivenSuggestions = true;
      clearTimeout(this.timeOutSuggestions);
    }
    // Mostrar 1 min depois da mensagem de ajuda no algo
    // Mostrar as sugestões apenas se elas não tiverem já sido dadas
    else if (text === this.exHelpMsg && !this.hasGivenSuggestions) {
      // Mandar mensagem ao rasa para pedir as sugestões
      this.timeOutSuggestions = setTimeout(() => {
        // Adicionar mensagem de trigger à base de dados 
        this.wholeConversation.push({ from: "App", text: "me dá sugestões", type: "ajuda", date: new Date().getTime() });
        this.chatbotService.sendMessage("me dá sugestões");
        this.visibleCloseWindow = true;
      }, 60000);
    }
  
    if (text) {
      this.messages.push({ from, text, type, direction, date: new Date().getTime() })
      if (this.messages.length > 1) {
        this.controlNewMsg = true;
        this.checkViewedMens();
      }
    }

    // Array com TODAS as mensagens
    from = from.name;
    // Fazer novo map array, pois este estava a dar erro porque era 
    if (type === "buttons_order") {
      let newText = []
      text.forEach(element => {
        newText.push({ "text": element[1] })
      });
      text = newText;
    }
    if (text) {
      this.wholeConversation.push({ from, text, type, date: new Date().getTime() });
    }

    // Guardar conversa na base de dados após receber resposta do Chatbot
    if (from === "Monitor") {
      if (this.registroMensagem === undefined) {
        this.registroMensagem = new RegistroMensagensRasa(null, this.chatbotService.questaoOrdem, this.userName, this.wholeConversation);
      }
      else {
        this.registroMensagem.conversa = this.wholeConversation;
      }
      this.registroMensagem.save().subscribe(() => { });
    }
    // -----------------------------------------------------
    // Se a mensagem for do aluno
    if (from !== "App" && from !== "Monitor") {
      // Não fechar a janela do chat
      this.visibleCloseWindow = false;
      // Se o timer das sugestões estiver on, esperar mais 1 min
      if (!this.hasGivenSuggestions) {
        if (this.timeOutSuggestions !== undefined) {
          // Parar o outro timer
          clearTimeout(this.timeOutSuggestions);
          // Recomeçar timer
          this.timeOutSuggestions = setTimeout(() => {
          // Abrir janela se estiver fechada
          this.visible = true;
          // Adicionar mensagem de trigger à base de dados
          this.wholeConversation.push({ from: "App", text: "me dá sugestões", type: "ajuda", date: new Date().getTime() });
          // Mandar mensagem ao rasa para obter as sugestões
          this.chatbotService.sendMessage("me dá sugestões");
          this.hasGivenSuggestions = true;
          // Fechar janela se não houver interação
          this.visibleCloseWindow = true;
        }, 60000);
      }
    }
  }
}

  // TOGGLE CHAT
  // ##################### FUNÇÃO QUE ABRE E FECHA A JANELA DO CHAT #####################
  // Abre e fecha janela do chatbot (quando se toca no seu icon)
  public toggleChat() {
    // Parar o timer de fechar a janela
    if (this.closeWindow !== undefined) {
      clearTimeout(this.closeWindow);
    }
    // Apagar popup de introdução se estiver ativo e o aluno abrir o chat
    if (this.visible_intro) {
      this.visible_intro = false;
      clearTimeout(this.stopIntroMessage);
    }
    if (this.messages.length === 0) {
      // Começa função de store das mensagens
      // Mostrar mensagem inicial mais informativa
      if (sessionStorage.getItem("chatbot-presentation-message") === null) {
        sessionStorage.setItem("chatbot-presentation-message", "exists");
        this.addMessage(this.monitor, this.startingMessage, 'text', 'received');
      }
      // Mostrar mensagem inicial mais simples
      else {
        this.addMessage(this.monitor, "Olá 👋 em que posso ajudar?", 'text', 'received');
        this.visibleCloseWindow = false;
      }
      this.visibleCloseWindow = false;
      this.isFirstMsg = false;
    }
    if (this.visible === false) {
      this.visible = true;
      // Ao abrir mantém a posição deixada pelo aluno
      setTimeout(() => {
        this.myScrollPosition.nativeElement.scrollTop = this.currScrollPosition;
      }, 10)
    }
    else {
      this.currScrollPosition = this.myScrollPosition.nativeElement.scrollTop;
      this.visible = false;
    }
  }

  // SEND MESSAGE
  // ############### FUNÇÃO QUE MANDA AS MENSAGENS DO ALUNO AO RASA ##################
  // Função que: Faz a conecção com o chatbot.service para mandar as mensagens ao RASA
  // Adicina as mensagens que o RASA retorna ao messages array
  public sendMessage({ message }) {
    // ---------------------------------------------------------------------
    // 1º (SIM) Verificar se o aluno se encontra no exercício de ordenar conceitos
    // ---------------------------------------------------------------------
    if (this.isConceptOrderDisabled === false) {
      let reallyDisable = true;
      // 1.1º (NÃO) Verificar se o aluno escrevreveu algo no input
      if (message === "") {
        // 1.1.1º (NÃO) Verificar se o aluno selecionou algum conceito
        if (this.conceptsChosen.length === 0) {
          // Não enviar nada ao RASA
          return
        }
        // 1.1.2º (SIM) Verificar se o aluno selecionou algum conceito
        else {
          // Verificar se existem butões (se sim, remover para o estudante nao poder clicar)
          for (let i = 0; i < this.messages.length; i++) {
            if (this.messages[i].type === "buttons_order") {
              this.messages.splice(i, 1);
            }
          }
          // Adiciona mensagem pré-definidas ao array da conversa, como resposta do estudante
          this.addMessage(this.estudante, "Ordem definida", "text", 'sent');
          // Adicionar ... (bot está a escrever) animação
          this.addMessage(this.monitor, "Estou a pesquisar a resposta por favor aguarde", "text", 'received');
          // Enviar conceitos escolhidos ao RASA
          this.chatbotService.sendMessage(this.sendOrderConcepts());
        }
        // Apagar conceitos que tinham sido escolhidos pelo estudante
        this.conceptsChosen = [];
      }
      // 1.2º (SIM) Verificar se o aluno escreveu algo no input
      else {
        // 1.2.1º (SIM) Verificar se o aluno escreveu que queria parar
        if (message.toLowerCase() === "parar" || message.toLowerCase() === "para") {
          // Verificar se existem butões (se sim, remover para o estudante nao poder clicar)
          for (let i = 0; i < this.messages.length; i++) {
            if (this.messages[i].type === "buttons_order" || this.messages[i].type === "buttons_order_second") {
              this.messages.splice(i, 1);
            }
          }
          // Adiciona a mensagem do estudante ao array da conversa
          this.addMessage(this.estudante, message, "text", 'sent');
          // Adiciona uma animação como se o bot estivesse a escrever
          this.addMessage(this.monitor, "Estou a pesquisar a resposta por favor aguarde", "text", 'received');
          // Manda mensagem ao RASA
          this.chatbotService.sendMessage(message);
        }
        // 1.2.1º (NÃO) Verificar se o aluno escreveu que queria parar
        else {
          // Enviar mensagem de aviso ao estudante
          this.addMessage(this.monitor, "Se quiser parar diga, PARAR", "text", 'received');
          this.isConceptOrderDisabled = false;
          reallyDisable = false;
        }
      }
      // 1.3º Se realmente for para para exercício:
      if (reallyDisable === true) {
        // Fechar tela de ordenação do algoritmo
        this.isConceptOrderDisabled = true
        // Apagar conceitos escolhidos
        this.conceptsChosen = [];
      }
    }
    // ---------------------------------------------------------------------
    // 2º (NÃO) Verificar se o aluno se encontra no exercício de ordenar conceitos
    // ---------------------------------------------------------------------
    // MENSAGEM NORMAL
    else {
      if (message[0] == '"') { message = message.substring(1, message.length - 1); }
      // Não retorna nada se o input estiver vazio
      if (message.trim() === '') { return }
      // Verificar se existem butões (se sim, remover para o estudante nao poder clicar)
      for (let i = 0; i < this.messages.length; i++) {
        if (this.messages[i].type === "buttons") { this.messages.splice(i, 1); }
      }
      // Adiciona a mensagem do estudante ao array da conversa
      let lastMsg = this.wholeConversation[this.wholeConversation.length - 1];

      if (lastMsg !== undefined) {
        if (!(lastMsg.text === "Sim" && lastMsg.from == this.monitor) && !(lastMsg.text === "Não" && lastMsg.from == this.monitor)) {
          this.addMessage(this.estudante, message, "text", 'sent');
        }
      }
      else {
        this.addMessage(this.estudante, message, "text", 'sent');
      }
      // Adiciona uma animação como se o bot estivesse a escrever
      this.addMessage(this.monitor, "Estou a pesquisar a resposta por favor aguarde", "text", 'received');
      // Mandar mensagem ao RASA
      this.chatbotService.sendMessage(message)
    }
    // -----------------------------------------------------------------------------
  }

  // ORGANIZE MESSAGES
  // ############# FUNÇÃO QUE ORGANIZA AS MENSAGENS RETORNADAS PELO RASA ################
  // Função que organiza as mensagens consoante o seu tipo (botões, código, normal, ...)
  public organizeMessages(messages) {
    let i = 0
    while (messages[i]) {
      let code_str = ""
      // -------------------------> BOTÕES - NORMAIS <-------------------------
      if (messages[i].type === "buttons") {
        // Verificar se também contém texto
        if (messages[i].message !== undefined) {
          this.addMessage(this.monitor, messages[i].message, "text", 'received');
        }
        this.addMessage(this.monitor, messages[i].buttons, messages[i].type, 'received');
      }
      // ---------------> BOTÕES - ORDENAR CONCEITOS > PISTAS <----------------
      else if (messages[i].type === "buttons_order_second") {
        console.log(messages[i].message);
      }
      // --------> BOTÕES - ORDENAR CONCEITOS > PARA ESCOLHA DO ALUNO <--------
      else if (messages[i].type === "buttons_order") {
        // Verificar se botão pertence a uma das pistas dadas
        for (let x = 0; x < messages[i].message.length; x++) {
          let disable = false;
          for (let y = 0; y < this.deactivateBtnsIds.length; y++) {
            if (this.deactivateBtnsIds[y] == messages[i].message[x][0]) {
              disable = true; // Se sim, desativar botão
            }
          }
          messages[i].message[x].push(disable);
        }
        // Adcionar botões aos arrays
        this.addMessage(this.monitor, messages[i].message, messages[i].type, 'received');
        // Mostrar tela do algoritmo
        this.isConceptOrderDisabled = false;
      }
      // ------------------------------> CÓDIGO <------------------------------
      // Ver se mensagem é código (código vem com tabs pelo meio o que separa em
      // várias mensagens, então temos de fazer concat dessas strings)
      else if (messages[i].type === "code") {
        while (messages[i].message.includes("</code>") === false) {
          code_str = code_str + messages[i].message + "\n\n";
          i++;
        }
        code_str = code_str + messages[i].message.replace("</code>", "").substring(-1);
        if (code_str[0] === "\n") { code_str = code_str.substring(1); }
        this.addMessage(this.monitor, code_str, "code", 'received');
      }
      else if (messages[i].type === "print") {
        while (messages[i].message.includes("</code_print>") === false) {
          code_str = code_str + messages[i].message + "\n\n";
          i++;
        }
        code_str = code_str + messages[i].message.replace("</code_print>", "").substring(-1);
        if (code_str[0] === "\n") { code_str = code_str.substring(1); }
        this.addMessage(this.monitor, code_str, "print", 'received');
      }
      else if (messages[i].type === "texto") {
        while (messages[i].message.includes("</text>") === false) {
          code_str = code_str + messages[i].message + "\n\n";
          i++;
        }
        code_str = code_str + messages[i].message.replace("</text>", "").substring(-1);
        if (code_str[0] === "\n") { code_str = code_str.substring(1); }
        this.addMessage(this.monitor, code_str, "text", 'received');
      }
      else if (messages[i].type === "help") {
        while (messages[i].message.includes("</ajuda>") === false) {
          code_str = code_str + messages[i].message + "\n\n";
          i++;
        }
        code_str = code_str + messages[i].message.replace("</ajuda>", "").substring(-1);
        if (code_str[0] === "\n") { code_str = code_str.substring(1); }
        this.addMessage(this.monitor, code_str, "help", 'received');
      }
      // -----------------------------> SIMPLES <------------------------------
      else {
        if (messages[i].message === "VERIFICAR PODE PEDIR AJUDA") {
          this.wholeConversation.push({ from: this.monitor, text: messages[i].message, type: messages[i].type, date: new Date().getTime() });
          let newMsg = "";
          if (this.canAskExHelp === true) {
            newMsg = "Sim";
          }
          else {
            newMsg = "Não";
          }
          this.wholeConversation.push({ from: this.monitor, text: newMsg, type: messages[i].type, date: new Date().getTime() });
          this.sendMessage({ message: newMsg });
        }
        else {
          this.addMessage(this.monitor, messages[i].message, messages[i].type, 'received');
        }
      }
      i++;
    }
  }

  // SEND ORDER CONCEPTS
  // ####################### VOLTA A ORGANIZAR AS ESCOLHAS DO ALUNO ########################
  // Função que retorna as opções escolhidas pelo aluno ao seu texto inicial para depois enviar ao RASA
  public sendOrderConcepts() {
    let answer = "";
    this.conceptsChosen.forEach(concept => {
      answer = answer + concept + "<sep>"
    });
    return answer;
  }
  // ##########################################################################

  public cleanWindow() {
    this.messages = [];
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === '/') {
      //this.focusMessage()
    }
    if (event.key === '?' && !this._visible) {
      this.toggleChat()
    }
  }


  ngOnDestroy() {
    this.messagesSub.unsubscribe();
    this.helpSub.unsubscribe();
    this.conceptSub.unsubscribe();
    this.triggerSub.unsubscribe();


    this.counterSuggestionsOn = false;
    this.messagesSub;
    this.helpSub;
    this.conceptSub;
    this.triggerSub;
    this.hasGivenSuggestions = false;
    this.msgCodeInfo = true;
    this.conceptOrderQuestionsGive = false;

    this.visible_intro = true;
    this.stopIntroMessage;
    this._visible = false;
    this.userName;
    this.mainVisible = false;
    this.closeWindow;
    this.visibleCloseWindow = false;
    this.messages = [];
    this.controlNewMsg = false;
    this.wholeConversation = [];
    this.isFirstMessage = false; // !!!!!! Verificar utilidadde !!!!!!
    this.monitor;
    this.estudante;
    this.isFirstMsg = true;
    this.firstStore = true;
    this.registroMensagem;
    this.canAskExHelp = false;
    this.timeOutSuggestions;
    this.isConceptOrderDisabled = true;
    this.isConceptSecond = false;
    this.conceptsChosen = [];
    this.deactivateBtnsIds = [];
    this.isInitHelpMsg = true;
    this.client;
    this.currScrollPosition = 0;
    this.newMsgWarningVisible = false;
    this.chatbotService.mensagemTrigger = {};
    this.chatbotService.questaoOrdem;
    this.chatbotService.questaoId;
    this.chatbotService.conceptsClicked = [];
    this.chatbotService.buttonToEnable;
    this.chatbotService.canAskHelp = false;
    this.chatbotService.senderID;
    this.chatbotService.currHelpInfo = "";
    this.chatbotService.errorsHelped = [];
    this.chatbotService.currErrorInfo = "";
    clearTimeout(this.chatbotService.exercise_help);
  }

}