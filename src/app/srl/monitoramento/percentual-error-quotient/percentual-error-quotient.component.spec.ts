import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentualErrorQuotientComponent } from './percentual-error-quotient.component';

describe('PercentualErrorQuotientComponent', () => {
  let component: PercentualErrorQuotientComponent;
  let fixture: ComponentFixture<PercentualErrorQuotientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PercentualErrorQuotientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PercentualErrorQuotientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
