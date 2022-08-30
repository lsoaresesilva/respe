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
import { ChatAvatarComponent } from './chat-avatar/chat-avatar.component'
import { ChatButtonsComponent } from './chat-buttons/chat-buttons.component';
import { ChatConfigComponent } from './chat-config/chat-config.component';
import { ChatErrorImageComponent } from './chat-error-image/chat-error-image.component';
import { ChatTypingComponent } from './chat-typing/chat-typing.component';
import { ChatWidgetComponent } from './chat-widget/chat-widget.component';
import { ChatbotService } from './chatbot.service';
import { ChatInputComponent } from './chat-input/chat-input.component';

@NgModule({
    declarations: [ChatComponent, ChatWidgetComponent, ChatTypingComponent, ChatAvatarComponent, ChatButtonsComponent, ChatConfigComponent, ChatErrorImageComponent, ChatInputComponent],
    imports: [CommonModule, DialogModule, FormsModule, InputTextModule, ButtonModule, SharedPipesModule],
    exports: [ChatComponent, ChatConfigComponent, ChatWidgetComponent],
    providers: [DynamicDialogRef, ChatbotService]
})
export class ChatbotModule {}
