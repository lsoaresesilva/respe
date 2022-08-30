import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CardDesempenhoComponent } from './card-desempenho.component';

describe('CardDesempenhoComponent', () => {
  let component: CardDesempenhoComponent;
  let fixture: ComponentFixture<CardDesempenhoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CardDesempenhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDesempenhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
