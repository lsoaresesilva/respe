import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionarioAutorregulacaoComponent } from './questionario-autorregulacao.component';

describe('QuestionarioAutorregulacaoComponent', () => {
  let component: QuestionarioAutorregulacaoComponent;
  let fixture: ComponentFixture<QuestionarioAutorregulacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionarioAutorregulacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionarioAutorregulacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
