import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarPerfilEstudanteComponent } from './visualizar-perfil-estudante.component';

describe('VisualizarPerfilEstudanteComponent', () => {
  let component: VisualizarPerfilEstudanteComponent;
  let fixture: ComponentFixture<VisualizarPerfilEstudanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarPerfilEstudanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarPerfilEstudanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
