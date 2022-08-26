import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CadastrarEstudantesComponent } from './cadastrar-estudantes.component';

describe('CadastrarEstudantesComponent', () => {
  let component: CadastrarEstudantesComponent;
  let fixture: ComponentFixture<CadastrarEstudantesComponent>;

  beforeEach(waitForAsync(() => {
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
