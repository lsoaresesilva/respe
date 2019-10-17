import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrosProgramacaoComponent } from './erros-programacao.component';

describe('ErrosProgramacaoComponent', () => {
  let component: ErrosProgramacaoComponent;
  let fixture: ComponentFixture<ErrosProgramacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrosProgramacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrosProgramacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
