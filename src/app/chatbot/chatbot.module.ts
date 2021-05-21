import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Footer } from 'primeng/api';
import { EscapeHtmlPipe } from '../pipes/keep-html.pipe';
import { SharedPipesModule } from '../pipes/shared-pipes.module';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ChatComponent],
  imports: [CommonModule, DialogModule, FormsModule, InputTextModule, ButtonModule, SharedPipesModule],
  exports: [ChatComponent],
  providers: [DynamicDialogRef],
})
export class ChatbotModule {}
