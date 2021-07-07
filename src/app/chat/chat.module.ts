import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatGrupoComponent } from './chat/chat.component';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import { VoiceChatComponent } from './voice-chat/voice-chat.component';
import { GravacaoVideoService } from './gravacao-video.service';
import { CabecachoChatComponent } from './cabecacho-chat/cabecacho-chat.component';
import { HttpClientModule } from '@angular/common/http';
import { ChatbotModule } from '../chatbot/chatbot.module';
import { MonitorService } from '../chatbot/monitor.service';
import { NgChatModule } from 'ng-chat';
import { ChatService } from './chat.service';


@NgModule({
  declarations: [ChatGrupoComponent, VoiceChatComponent, CabecachoChatComponent],
  imports: [
    CommonModule,
    DialogModule,
    FormsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    ScrollPanelModule,
    HttpClientModule,
    ChatbotModule,
    NgChatModule
  ],
  exports:[ChatGrupoComponent],
  providers:[ChatService, GravacaoVideoService, MonitorService]
})
export class ChatModule { }
