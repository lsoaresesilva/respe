import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportarDadosAnalyticsComponent } from './exportar-dados-analytics.component';

describe('ExportarDadosAnalyticsComponent', () => {
  let component: ExportarDadosAnalyticsComponent;
  let fixture: ComponentFixture<ExportarDadosAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportarDadosAnalyticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportarDadosAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
