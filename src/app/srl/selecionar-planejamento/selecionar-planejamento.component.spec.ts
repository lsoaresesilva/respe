import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionarPlanejamentoComponent } from './selecionar-planejamento.component';

describe('SelecionarPlanejamentoComponent', () => {
  let component: SelecionarPlanejamentoComponent;
  let fixture: ComponentFixture<SelecionarPlanejamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelecionarPlanejamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecionarPlanejamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
