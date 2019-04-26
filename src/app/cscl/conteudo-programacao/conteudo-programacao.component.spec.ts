import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConteudoProgramacaoComponent } from './conteudo-programacao.component';

describe('ConteudoProgramacaoComponent', () => {
  let component: ConteudoProgramacaoComponent;
  let fixture: ComponentFixture<ConteudoProgramacaoComponent>;

  beforeEach(async(() => {
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
