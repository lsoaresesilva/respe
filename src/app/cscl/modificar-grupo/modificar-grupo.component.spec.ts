import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarGrupoComponent } from './modificar-grupo.component';

describe('ModificarGrupoComponent', () => {
  let component: ModificarGrupoComponent;
  let fixture: ComponentFixture<ModificarGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarGrupoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
