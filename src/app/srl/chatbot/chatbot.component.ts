import { Component, OnInit } from '@angular/core';
import MensagemChat from 'src/app/model/mensagemChat';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  
  display: boolean = false;
  mensagem;
  constructor() { 
    this.mensagem = MensagemChat;
  }


  ngOnInit() {
  }
  showDialog() {
    this.display = true;
  }

}
