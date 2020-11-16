import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatisticasExperimentoComponent } from './estatisticas-experimento.component';

describe('EstatisticasExperimentoComponent', () => {
  let component: EstatisticasExperimentoComponent;
  let fixture: ComponentFixture<EstatisticasExperimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstatisticasExperimentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstatisticasExperimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
