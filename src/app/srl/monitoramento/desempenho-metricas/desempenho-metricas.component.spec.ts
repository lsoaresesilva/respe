import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesempenhoMetricasComponent } from './desempenho-metricas.component';

describe('DesempenhoMetricasComponent', () => {
  let component: DesempenhoMetricasComponent;
  let fixture: ComponentFixture<DesempenhoMetricasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesempenhoMetricasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesempenhoMetricasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
