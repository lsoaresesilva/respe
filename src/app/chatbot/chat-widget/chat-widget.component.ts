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
  @Input() public startingMessage = 'Olá 👋, eu sou um monitor que está aqui para o ajudar. A qualquer momento poderá fazer perguntas como "O que é uma variável?", ou "Qual é um exemplo de uma condição?", que eu farei o meu melhor para responder! Estarei também aqui para quando tiver problemas na resolução dos seus exercicios!'
  // Controla se a janela começa aberta ou fechada
  @Input() public opened: boolean = false;

  // Abrir/fechar a janela do chat <--
  public _visible = false;
  userName: any;
  public get visible() { return this._visible; }
  @Input() public set visible(visible) { this._visible = visible; }

  // ------------ Variáveis para as mensagens da conversa -------------
  // Contém as mensagens que aparecem na janela do chatbot
  public messages = [];
  // Array com TODAS as mensagens (inclui a primeira mensagem,
  // por exemplo, qual foi o erro, que não se mostra ao estudante)
  public wholeConversation = [];
  public wholeConversationSent = [];
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


  constructor(private chatbotService: ChatbotService, private login: LoginService) {


    // ################ CHATBOT SERVICE - NOVAS MENSAGENS ################
    // ------------------> Nova mensagem do RASA <-------------------
    // Para quando é mandada uma mensagem ao RASA de outro componente (mensagem de erro, ...)
    this.chatbotService.messageUpdate.subscribe(() => {
      // Novas mensagens
      this.chatbotService.latestMessageArr.subscribe(
        responseMessages => {
          // Se não for a primeira mensagem no array da conversa...
          if (this.messages[0] !== undefined) {
            // Parar animação de estar a escrever (...)
            if (this.messages[this.messages.length - 1].text === "Estou a pesquisar a resposta por favor aguarde") {this.messages.pop(); }
          }
          // Retornar erro se a mensagem do RASA vier vazia
          if (responseMessages.length === 0) {
            if (!this.isFirstMsg) {
              this.addMessage(this.monitor, "Desculpe estou com algumas dificuldades, por favor tente mais tarde 🤕", "erro", 'received');
            }
          }
          // Mostrar mensagem retornada pelo RASA
          else {
            this.organizeMessages(responseMessages);
            this.isFirstMsg = false;
            this.newMsgWarningVisible = true;
            this.checkViewedMens();
          }
        });
      // -------------------------------------------------------------------------------
      // Abrir janela do chat se ela estiver fechada (ao receber mensagem inicial (erro/ajuda))
      if (this.visible === false) {
        this.visible = true;
      }
    });
    // --> Novo conceito para adicionar à tela do algorimo (exercício de ordenar) <--
    this.chatbotService.conceptUpdate.subscribe(() => {
      this.conceptsChosen = this.chatbotService.conceptsClicked;
    });
    // --------> Já pode pedir ajuda no exercício <----------
    this.chatbotService.helpActivate.subscribe(() => {
      this.canAskExHelp = this.chatbotService.canAskHelp;
    });
  }

  public checkViewedMens() {
    if (this.myScrollPosition.nativeElement.scrollHeight - this.myScrollPosition.nativeElement.scrollTop < 580 === true) {
      this.newMsgWarningVisible = false;
    }
  }

  ngOnInit() {
    this.userName = this.login.getUsuarioLogado().pk();
    this.estudante = {
      name: this.login.getUsuarioLogado().pk(),
      avatar: this.userAvatar,
    };
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
    // Array das mensagens que aparecem na janela do chatbot
    this.messages.push({ from, text, type, direction, date: new Date().getTime() })

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
    this.wholeConversation.push({ from, text, type, date: new Date().getTime() });

    // Guardar conversa na base de dados após receber resposta do Chatbot
    if (from === "Monitor") {
      if (this.registroMensagem === undefined) {
        this.registroMensagem = new RegistroMensagensRasa(null, this.userName, this.wholeConversation);
      }
      else {
        this.registroMensagem.conversa = this.wholeConversation;
      }
      this.registroMensagem.save().subscribe(() => { });
      //console.log("Mensagem guardada");
    }
  }

  // TOGGLE CHAT
  // ##################### FUNÇÃO QUE ABRE E FECHA A JANELA DO CHAT #####################
  // Abre e fecha janela do chatbot (quando se toca no seu icon)
  public toggleChat() {
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
      }
      this.isFirstMsg = false;
    }
    if (this.visible === false) {
      this.visible = true;
      // Ao abrir mantém a posição deixada pelo aluno
      setTimeout(() => {
        this.myScrollPosition.nativeElement.scrollTop = this.currScrollPosition;
      }, 1)
    }
    else {
      //this.currScrollPosition = this.myScrollPosition.nativeElement.scrollTop;
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
}