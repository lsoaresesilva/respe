import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarSubmissaoQuestaoComponent } from './visualizar-submissao-questao.component';

describe('VisualizarSubmissaoQuestaoComponent', () => {
  let component: VisualizarSubmissaoQuestaoComponent;
  let fixture: ComponentFixture<VisualizarSubmissaoQuestaoComponent>;

  beforeEach(async(() => {
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
