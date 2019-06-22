import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarQuestaoFechadaComponent } from './visualizar-questao-fechada.component';

describe('VisualizarQuestaoFechadaComponent', () => {
  let component: VisualizarQuestaoFechadaComponent;
  let fixture: ComponentFixture<VisualizarQuestaoFechadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarQuestaoFechadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarQuestaoFechadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
