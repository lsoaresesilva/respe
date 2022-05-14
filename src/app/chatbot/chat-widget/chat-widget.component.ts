// Adapted from:
// https://github.com/Poio-NLP/poio-chatbot-ui
// https://github.com/contribution-jhipster-uga/angular-chat-widget-rasa
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core'
import { fadeIn, fadeInOut } from '../animations'
import { ChatbotService } from '../chatbot.service';
import { LoginService } from '../../login-module/login.service';

@Component({
  selector: 'chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.css'],
  animations: [fadeInOut, fadeIn],
})
export class ChatWidgetComponent implements OnInit {
  @ViewChild('bottom') bottom: ElementRef;
  // Para mudar o tema
  @Input() public theme: 'blue' | 'grey' | 'red' = 'blue';
  // Titulo que aparece na janela do chat
  @Input() public botName: string = 'Monitor';
  // Imagens que aparecem na conversa
  @Input() public botAvatar: string = "/assets/botAvatar.png";
  @Input() public userAvatar: string = "/assets/userAvatar.jpg";
  // URL para se conectar ao chatbot
  // Primeira mensagem
  @Input() public startingMessage = 'Olá 👋, eu sou um monitor que está aqui para o ajudar. A qualquer momento poderá fazer perguntas como "O que é uma variável?", ou "Qual é um exemplo de uma condição?", que eu farei o meu melhor para responder! Estarei também aqui para quando tiver problemas na resolução dos seus exercicios!'
  // Controla se a janela aparece aberta ou fechada
  @Input() public opened: boolean = false;

  // Array com as mensagens que aparacem na janela do chat
  public messages = [];
  // Array com TODAS as mensagens (inclui a primeira mensagem,
  // por exemplo, qual foi o erro, que não se mostra ao estudante)
  public wholeConversation = [];

  public isFirstMessage = false;

  public _visible = false;
  public operator;
  public client;

  // ID do user para passar ao RASA, faço-o mais à frente de maneira aleatória
  // Depois faço store na session storage (o que pode não ser o melhor, mas é para poder )
  public userName: string;

  constructor(private chatbotService: ChatbotService, private login:LoginService) {

    this.userName = this.login.getUsuarioLogado().pk();

    // Abrir o chat ao receber erro, se este tiver fechado
    this.chatbotService.messageUpdate.subscribe(() => {
      if (this.visible === false) {
        this.messages = [];
      }
      this.chatbotService.latestMessageArr.subscribe(
        responseMessages => {
          // Parar a animação do chatbot estar a escrever
          if (this.messages[0] !== undefined) {
            if (this.messages[0].type === "typing") {
              this.messages.shift();
            }
          }
          // Se o RASA não retornar nada mandar erro
          if (responseMessages.length === 0) {
            if (this.isFirstMessage !== true) {
              this.addMessage(this.operator, "Desculpe estou com algumas dificuldades, por favor tente mais tarde 🤕", "erro", 'received');
            }
            else {
              // Mostrar mensagem inicial
              this.addMessage(this.operator, this.startingMessage, "text", 'received');
              this.isFirstMessage = false;
            }
          }
          else {
            // Mostrar mensagem retornada pelo RASA
            this.organizeMessages(responseMessages)
          }
        });
      if (this.visible === false) {
        this.visible = true;
      }
    });
  }

  public get visible() {
    return this._visible;
  }

  // Abre/fecha a janela do chat
  @Input() public set visible(visible) {
    this._visible = visible;
  }

  // Função para: adicionar mensagens
  // O type, é simplesmente para controlar o css dos diferentes tipos (texto, codigo, botões, ...)
  public addMessage(from, text, type, direction: 'received' | 'sent') {
    if (this.isFirstMessage === false) {
      // Adiciona as mensagens no começo do array (messages)
      this.messages.unshift({from, text, type, direction, date: new Date().getTime()})
    }
    // Adiciona as mensagens no final do array (wholeConversation)
    // Este seria então o array, a que certo ponto se faria save na base de dados
    this.wholeConversation.push({from, text, type, date: new Date().getTime()})
  }

  /*public scrollToBottom() {
    if (this.bottom.nativeElement.scrollTop < -100) {
      this.isNearBottom = true;
      this.currentWindowPosition = 0;
    }
  }*/

  /*public focusMessage() {
    this.focus.next(true)
  }*/

  ngOnInit() {
    this.client = {
      name: this.chatbotService.senderID,
      avatar: this.userAvatar,
    };
    this.operator = {
      name: this.botName,
      avatar: this.botAvatar,
    };
    if (this.opened) {
      setTimeout(() => this.visible = true, 1000)
    }
    // Fazer a conecção com o RASA
    this.chatbotService
      .initRasaChat(this.chatbotService.url, this.userName)
      .subscribe(
        data => console.log('Rasa conversa inicializada'),
        error => {
          console.error('Erro ao conectar com RASA')
        }
      );
  }

  public toggleChat() {
    if (this.messages.length === 0) {
      if (sessionStorage.getItem("chatbot-presentation-message") !== null) {
        this.addMessage(this.operator, "Olá 👋 em que posso ajudar?", 'text', 'received');
        this.isFirstMessage = false;
      }
      else {
        sessionStorage.setItem("chatbot-presentation-message", "exists");
        this.addMessage(this.operator, this.startingMessage, 'text', 'received');
        this.isFirstMessage = false;
      }
    }
    if (this.visible === true) {
      this.messages = [];
      this.chatbotService
        .sendMessage(this.userName, "/restart")
      this.isFirstMessage = true;
    }
    this.visible = !this.visible
  }

  // Função que: Faz a conecção com o chatbot.service para mandar as mensagens ao RASA
  // Adicinar as mensagens que o RASA retorna ao messages array (através da função addMessage)
  public sendMessage({message}) {
    if (message[0] == '"'){
      message = message.substring(1, message.length - 1);
    }
    // Não retorna nada se o input estiver vazio
    if (message.trim() === '') {
      return
    }
    // If button was written instead of clicking the button
    if (this.messages[0] !== undefined && this.messages[0].type === "buttons") {
      this.messages.shift();
    }
    // Adiciona a mensagem do estudante ao array da conversa
    this.addMessage(this.client, message, "text", 'sent');

    // Adiciona uma animação como se o bot estivesse a escrever
    this.addMessage(this.operator, message, "typing", 'received');
    this.chatbotService
      // Manda mensagem ao RASA --> chatbot.service.ts
      .sendMessage(this.chatbotService.senderID, message)
  }

  public organizeMessages(messages) {
    let i = 0
    while (messages[i]) {
      let code_str = ""
      // Se a mensagem contiver botões, verificar se també contém texto
      if (messages[i].type === "buttons") {
        if (messages[i].message !== undefined) {
          this.addMessage(this.operator, messages[i].message, "text", 'received');
        }
        this.addMessage(this.operator, messages[i].buttons, messages[i].type, 'received');
      }
      // Ver se mensagem é código (código vem com tabs pelo meio o que separa em
      // várias mensagens, então temos de fazer concat dessas strings)
      else if (messages[i].type === "code") {
        while (messages[i].message.includes("</code>") === false) {
          code_str = code_str + messages[i].message + "\n\n";
          i++;
          console.log(code_str)
        }
        code_str = code_str + messages[i].message.replace("</code>", "").substring(-1);
        if (code_str[0] === "\n"){
          code_str = code_str.substring(1);
        }
        this.addMessage(this.operator, code_str, "code", 'received');
      }
      else {
        this.addMessage(this.operator, messages[i].message, messages[i].type, 'received');
      }
      i++;
    }
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
