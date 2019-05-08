import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarEstudantesComponent } from './cadastrar-estudantes.component';

describe('CadastrarEstudantesComponent', () => {
  let component: CadastrarEstudantesComponent;
  let fixture: ComponentFixture<CadastrarEstudantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarEstudantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarEstudantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
