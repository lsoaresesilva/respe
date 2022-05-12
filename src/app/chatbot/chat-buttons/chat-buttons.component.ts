import { Component, Input, Output, EventEmitter, ViewChildren, ElementRef } from '@angular/core';

@Component({
  selector: 'chat-buttons',
  template: `
    <button (click)="onClick()">
      {{btnLabel}}
    </button>
  `,
  styleUrls: ['./chat-buttons.component.css']
})
export class ChatButtonsComponent {
  @Input() public btnLabel: string
  @Input() public btnPayload: string
  @Output() public send = new EventEmitter()

  onClick() {
    const message = this.btnPayload
    const title = this.btnLabel
    this.send.emit({ message, title })
  }
}
