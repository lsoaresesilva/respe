import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TipsRegulacaoComponent } from './tips-regulacao.component';

describe('TipsRegulacaoComponent', () => {
  let component: TipsRegulacaoComponent;
  let fixture: ComponentFixture<TipsRegulacaoComponent>;

  beforeEach(waitForAsync(() => {
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
