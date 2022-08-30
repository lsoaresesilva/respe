import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListarEstudantesComponent } from './listar-estudantes.component';

describe('ListarEstudantesComponent', () => {
  let component: ListarEstudantesComponent;
  let fixture: ComponentFixture<ListarEstudantesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarEstudantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarEstudantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
