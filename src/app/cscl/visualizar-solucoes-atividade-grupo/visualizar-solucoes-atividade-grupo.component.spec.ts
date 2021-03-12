import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarSolucoesAtividadeGrupoComponent } from './visualizar-solucoes-atividade-grupo.component';

describe('VisualizarSolucoesAtividadeGrupoComponent', () => {
  let component: VisualizarSolucoesAtividadeGrupoComponent;
  let fixture: ComponentFixture<VisualizarSolucoesAtividadeGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarSolucoesAtividadeGrupoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarSolucoesAtividadeGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
