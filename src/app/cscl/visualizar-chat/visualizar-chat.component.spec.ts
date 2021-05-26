import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarChatComponent } from './visualizar-chat.component';

describe('VisualizarChatComponent', () => {
  let component: VisualizarChatComponent;
  let fixture: ComponentFixture<VisualizarChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
