import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriacaoGrupoComponent } from './criacao-grupo.component';

describe('CriacaoGrupoComponent', () => {
  let component: CriacaoGrupoComponent;
  let fixture: ComponentFixture<CriacaoGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriacaoGrupoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriacaoGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
