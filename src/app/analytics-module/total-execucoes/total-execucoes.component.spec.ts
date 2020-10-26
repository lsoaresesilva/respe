import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalExecucoesComponent } from './total-execucoes.component';

describe('TotalExecucoesComponent', () => {
  let component: TotalExecucoesComponent;
  let fixture: ComponentFixture<TotalExecucoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalExecucoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalExecucoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
