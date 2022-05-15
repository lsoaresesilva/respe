import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChatbotService } from '../chatbot.service';

@Component({
  selector: 'chat-buttons',
  template: `
    <button [title]="this.titleBtn" [class.disabled]='this.clicked === true' [class.enabled]='this.clicked === false' (click)="onClick()">
      {{btnLabel}}
    </button>
  `,
  styleUrls: ['./chat-buttons.component.css']
})

export class ChatButtonsComponent {
  @Input() public btnLabel: string;
  @Input() public titleBtn: string;
  @Input() public btnPayload: string;
  @Input() public disabled: boolean;
  @Input() public clicked = false;
  @Input() public id;
  public idNew = 0;
  @Output() public send = new EventEmitter()

  constructor(private chatbotService: ChatbotService) {
    this.chatbotService.enableButton.subscribe(() => {
      if (this.idNew > this.chatbotService.buttonToEnable) {
        this.titleBtn = "Clique para selecionar opção"
        this.clicked = false;
        this.btnLabel = this.btnLabel.slice(2);
      }
    });
  }

  onClick() {
    const title = this.btnLabel;
    if (this.btnPayload !== undefined) {
      const message = this.btnPayload
      this.send.emit({ message, title })
    }
    else {
      if (this.clicked == false) {
        this.titleBtn = "Clique para remover opção"
        this.clicked = true;
        this.chatbotService.chooseConcept(title);
        this.idNew = this.chatbotService.conceptsClicked.length + 1;
        this.btnLabel = this.chatbotService.conceptsClicked.length + " " + this.btnLabel;
      }
      else {
        this.idNew = 0;
        this.titleBtn = "Clique para selecionar opção"
        this.clicked = false;
        this.chatbotService.chooseConcept(title);
        this.btnLabel = this.btnLabel.slice(2);
      }
    }
  }
}