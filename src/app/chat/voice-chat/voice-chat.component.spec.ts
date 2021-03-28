import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceChatComponent } from './voice-chat.component';

describe('VoiceChatComponent', () => {
  let component: VoiceChatComponent;
  let fixture: ComponentFixture<VoiceChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoiceChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoiceChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
