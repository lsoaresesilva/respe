import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosEstudanteComponent } from './dados-estudante.component';

describe('DadosEstudanteComponent', () => {
  let component: DadosEstudanteComponent;
  let fixture: ComponentFixture<DadosEstudanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DadosEstudanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosEstudanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
