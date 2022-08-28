import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsTurmaComponent } from './analytics-turma.component';

describe('EstudantesInadimplentesComponent', () => {
  let component: AnalyticsTurmaComponent;
  let fixture: ComponentFixture<AnalyticsTurmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnalyticsTurmaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsTurmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
