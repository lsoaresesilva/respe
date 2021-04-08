import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiarioProgramacaoComponent } from './diario-programacao.component';

describe('DiarioProgramacaoComponent', () => {
  let component: DiarioProgramacaoComponent;
  let fixture: ComponentFixture<DiarioProgramacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiarioProgramacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiarioProgramacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
