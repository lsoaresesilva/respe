import { TestBed } from '@angular/core/testing';

import { ChatbotServiceProprio } from './chatbot-proprio.service';

describe('ChatbotService', () => {
  let service: ChatbotServiceProprio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatbotServiceProprio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
