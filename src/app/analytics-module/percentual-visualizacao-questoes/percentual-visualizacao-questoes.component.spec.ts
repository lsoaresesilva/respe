import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentualVisualizacaoQuestoesComponent } from './percentual-visualizacao-questoes.component';

describe('PercentualVisualizacaoQuestoesComponent', () => {
  let component: PercentualVisualizacaoQuestoesComponent;
  let fixture: ComponentFixture<PercentualVisualizacaoQuestoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PercentualVisualizacaoQuestoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PercentualVisualizacaoQuestoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
