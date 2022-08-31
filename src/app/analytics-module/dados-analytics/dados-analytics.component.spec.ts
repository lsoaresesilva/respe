import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DadosAnalyticsComponent } from '../../../../../izzypeazy/src/app/analytics-module/dados-estudante/dados-analytics.component';

describe('DadosEstudanteComponent', () => {
  let component: DadosAnalyticsComponent;
  let fixture: ComponentFixture<DadosAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DadosAnalyticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
