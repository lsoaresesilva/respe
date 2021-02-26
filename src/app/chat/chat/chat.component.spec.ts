import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatGrupoComponent } from './chat.component';

describe('ChatComponent', () => {
  let component: ChatGrupoComponent;
  let fixture: ComponentFixture<ChatGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatGrupoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
