import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsRegulacaoComponent } from './tips-regulacao.component';

describe('TipsRegulacaoComponent', () => {
  let component: TipsRegulacaoComponent;
  let fixture: ComponentFixture<TipsRegulacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipsRegulacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipsRegulacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
