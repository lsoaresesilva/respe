import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTurmaProfessorComponent } from './listar-turma-professor.component';

describe('ListarTurmaProfessorComponent', () => {
  let component: ListarTurmaProfessorComponent;
  let fixture: ComponentFixture<ListarTurmaProfessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarTurmaProfessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarTurmaProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
