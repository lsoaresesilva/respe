import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Mensagem from 'src/app/model/chatbot/mensagem';
import { EscapeHtmlPipe } from 'src/app/pipes/keep-html.pipe';
import { ChatbotService } from '../chatbot.service';

import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  visibilidade;

  @ViewChild('divChat')
  divChat: ElementRef;

  constructor(public chatbot: ChatbotService, private ref: DynamicDialogRef) {
    this.visibilidade = false;
    this.chatbot.mensagemUpdate.subscribe(() => {
      if (this.chatbot.mensagens.length > 0) {
        this.visibilidade = true;
      }

      this.divChat.nativeElement.scrollTop = this.divChat.nativeElement.scrollHeight;
    });
  }

  ngOnInit(): void {}

  onHide(event) {
    this.chatbot.reinicializar();
  }
}
