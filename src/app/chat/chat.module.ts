import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatGrupoComponent } from './chat/chat.component';
import { ChatService } from '../cscl/chat.service';
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
import { NbChatModule, NbFocusMonitor, NbStatusService } from '@nebular/theme';


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
    NbChatModule
  ],
  exports:[ChatGrupoComponent],
  providers:[ChatService, GravacaoVideoService, MonitorService, NbStatusService, NbFocusMonitor]
})
export class ChatModule { }
