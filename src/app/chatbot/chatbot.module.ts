import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Footer } from 'primeng/api';

@NgModule({
  declarations: [ChatComponent],
  imports: [CommonModule, DialogModule, InputTextModule, ButtonModule],
  exports: [ChatComponent],
})
export class ChatbotModule {}
