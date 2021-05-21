import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Mensagem from 'src/app/model/chatbot/mensagem';
import { EscapeHtmlPipe } from 'src/app/pipes/keep-html.pipe';
import { ChatbotService } from '../chatbot.service';

import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginService } from 'src/app/login-module/login.service';
import DuvidaEstudante from 'src/app/model/chatbot/duvidaEstudante';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  visibilidade;
  mensagem;

  @ViewChild('divChat')
  divChat: ElementRef;

  constructor(public chatbot: ChatbotService, private ref: DynamicDialogRef, private login:LoginService) {
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

  /* enviar(){
    this.chatbot.receberPedidoAjuda(this.mensagem, this.login.getUsuarioLogado(), )
  } */

  enviar(){
    if(this.mensagem != null){
      let duvidaEstudante = new DuvidaEstudante(null, this.mensagem, this.login.getUsuarioLogado());
      duvidaEstudante.save().subscribe(()=>{

      });
    }
    
  }
}
