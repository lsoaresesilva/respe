import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsTurmaComponent } from './analytics-turma.component';

<<<<<<< HEAD
describe('AnalyticsTurmaComponent', () => {
=======
describe('EstudantesInadimplentesComponent', () => {
>>>>>>> bc14f6a9e419d4632749b2d4dde2c9dff799634e
  let component: AnalyticsTurmaComponent;
  let fixture: ComponentFixture<AnalyticsTurmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
<<<<<<< HEAD
      declarations: [ AnalyticsTurmaComponent ]
    })
    .compileComponents();
=======
      declarations: [AnalyticsTurmaComponent],
    }).compileComponents();
>>>>>>> bc14f6a9e419d4632749b2d4dde2c9dff799634e
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
