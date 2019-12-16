import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarCodigoTurmaComponent } from './cadastrar-codigo-turma.component';

describe('CadastrarCodigoTurmaComponent', () => {
  let component: CadastrarCodigoTurmaComponent;
  let fixture: ComponentFixture<CadastrarCodigoTurmaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarCodigoTurmaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarCodigoTurmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
