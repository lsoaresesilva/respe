import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespostaSimilarQuestaoProgramacaoComponent } from './resposta-similar-questao-programacao.component';

describe('RespostaSimilarQuestaoProgramacaoComponent', () => {
  let component: RespostaSimilarQuestaoProgramacaoComponent;
  let fixture: ComponentFixture<RespostaSimilarQuestaoProgramacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespostaSimilarQuestaoProgramacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespostaSimilarQuestaoProgramacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
