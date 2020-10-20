import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesempenhoObjetivosExerciciosComponent } from './desempenho-objetivos-exercicios.component';

describe('DesempenhoObjetivosExerciciosComponent', () => {
  let component: DesempenhoObjetivosExerciciosComponent;
  let fixture: ComponentFixture<DesempenhoObjetivosExerciciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesempenhoObjetivosExerciciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesempenhoObjetivosExerciciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
