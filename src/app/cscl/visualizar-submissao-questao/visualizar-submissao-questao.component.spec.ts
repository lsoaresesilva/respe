import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VisualizarSubmissaoQuestaoComponent } from './visualizar-submissao-questao.component';

describe('VisualizarSubmissaoQuestaoComponent', () => {
  let component: VisualizarSubmissaoQuestaoComponent;
  let fixture: ComponentFixture<VisualizarSubmissaoQuestaoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarSubmissaoQuestaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarSubmissaoQuestaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
