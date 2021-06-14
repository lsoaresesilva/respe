import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarAtividadeGrupoComponent } from './criar-atividade-grupo.component';

describe('CriacaoGrupoComponent', () => {
  let component: CriarAtividadeGrupoComponent;
  let fixture: ComponentFixture<CriarAtividadeGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarAtividadeGrupoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarAtividadeGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
