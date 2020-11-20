import { Component, OnInit } from '@angular/core';
import Mensagem from 'src/app/model/chatbot/mensagem';
import { ChatbotService } from '../chatbot.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  constructor(public chatbot: ChatbotService) {}

  ngOnInit(): void {}
}
