import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarPlanejamentoComponent } from './visualizar-planejamento.component';

describe('VizualizarPlanejamentoComponent', () => {
  let component: VisualizarPlanejamentoComponent;
  let fixture: ComponentFixture<VisualizarPlanejamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarPlanejamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarPlanejamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
