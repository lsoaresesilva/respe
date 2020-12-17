import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrafoEstudantesComponent } from './grafo-estudantes.component';

describe('GrafoEstudantesComponent', () => {
  let component: GrafoEstudantesComponent;
  let fixture: ComponentFixture<GrafoEstudantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrafoEstudantesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrafoEstudantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
