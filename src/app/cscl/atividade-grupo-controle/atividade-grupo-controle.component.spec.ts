import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtividadeGrupoControleComponent } from './atividade-grupo-controle.component';

describe('AtividadeGrupoControleComponent', () => {
  let component: AtividadeGrupoControleComponent;
  let fixture: ComponentFixture<AtividadeGrupoControleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtividadeGrupoControleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtividadeGrupoControleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
