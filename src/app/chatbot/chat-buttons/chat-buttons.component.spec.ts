import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatButtonsComponent } from './chat-buttons.component';

describe('ChatButtonsComponent', () => {
  let component: ChatButtonsComponent;
  let fixture: ComponentFixture<ChatButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
