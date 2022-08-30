import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RespostaSimilarQuestaoProgramacaoComponent } from './resposta-similar-questao-programacao.component';

describe('RespostaSimilarQuestaoProgramacaoComponent', () => {
  let component: RespostaSimilarQuestaoProgramacaoComponent;
  let fixture: ComponentFixture<RespostaSimilarQuestaoProgramacaoComponent>;

  beforeEach(waitForAsync(() => {
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
