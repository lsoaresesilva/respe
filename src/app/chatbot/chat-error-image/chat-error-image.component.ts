import { Component } from '@angular/core';

@Component({
  selector: 'chat-error-image',
  template: `
    <img src="/assets/error_pop_up.png"/>
  `,
  styles: [`
    img {
      position: absolute;
      width: 30px;
      right: 50px;
      bottom: 40px;
    }
  `]
})
export class ChatErrorImageComponent {
}
