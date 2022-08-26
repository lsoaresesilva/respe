import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConteudoProgramacaoComponent } from './conteudo-programacao.component';

describe('ConteudoProgramacaoComponent', () => {
  let component: ConteudoProgramacaoComponent;
  let fixture: ComponentFixture<ConteudoProgramacaoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConteudoProgramacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConteudoProgramacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
