import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CadastrarTurmaComponent } from './cadastrar-turma.component';

describe('CadastrarTurmaComponent', () => {
  let component: CadastrarTurmaComponent;
  let fixture: ComponentFixture<CadastrarTurmaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarTurmaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarTurmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
