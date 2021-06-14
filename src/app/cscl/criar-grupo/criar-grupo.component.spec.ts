import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarGrupoComponent } from './criar-grupo.component';

describe('CriarGrupoComponent', () => {
  let component: CriarGrupoComponent;
  let fixture: ComponentFixture<CriarGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarGrupoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
