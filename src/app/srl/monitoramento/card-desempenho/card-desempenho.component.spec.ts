import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDesempenhoComponent } from './card-desempenho.component';

describe('CardDesempenhoComponent', () => {
  let component: CardDesempenhoComponent;
  let fixture: ComponentFixture<CardDesempenhoComponent>;

  beforeEach(async(() => {
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
