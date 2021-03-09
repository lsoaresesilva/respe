import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarAtividadeGrupoProfessorComponent } from './visualizar-atividade-grupo-professor.component';

describe('VisualizarAtividadeGrupoComponent', () => {
  let component: VisualizarAtividadeGrupoProfessorComponent;
  let fixture: ComponentFixture<VisualizarAtividadeGrupoProfessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarAtividadeGrupoProfessorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarAtividadeGrupoProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
