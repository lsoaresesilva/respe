import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [ChatComponent],
  imports: [CommonModule, DialogModule],
})
export class ChatbotModule {}
