import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SumarioSubsecoesComponent } from './sumario-subsecoes.component';

describe('SumarioSubsecoesComponent', () => {
  let component: SumarioSubsecoesComponent;
  let fixture: ComponentFixture<SumarioSubsecoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SumarioSubsecoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SumarioSubsecoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
