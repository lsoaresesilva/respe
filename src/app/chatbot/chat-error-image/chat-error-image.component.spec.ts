import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatErrorImageComponent } from './chat-error-image.component';

describe('ChatErrorImageComponent', () => {
  let component: ChatErrorImageComponent;
  let fixture: ComponentFixture<ChatErrorImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatErrorImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatErrorImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
