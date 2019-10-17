import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroPlanejamentoComponent } from './cadastro-planejamento.component';

describe('CadastroPlanejamentoComponent', () => {
  let component: CadastroPlanejamentoComponent;
  let fixture: ComponentFixture<CadastroPlanejamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroPlanejamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroPlanejamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
