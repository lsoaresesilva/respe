import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaliseDesempenhoEstudanteComponent } from './analise-desempenho-estudante.component';

describe('AnaliseDesempenhoEstudanteComponent', () => {
  let component: AnaliseDesempenhoEstudanteComponent;
  let fixture: ComponentFixture<AnaliseDesempenhoEstudanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnaliseDesempenhoEstudanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnaliseDesempenhoEstudanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
