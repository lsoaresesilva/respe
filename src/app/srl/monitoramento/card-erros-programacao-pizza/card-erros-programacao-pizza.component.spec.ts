import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CardErrosProgramacaoPizzaComponent } from './card-erros-programacao-pizza.component';

describe('CardErrosProgramacaoPizzaComponent', () => {
  let component: CardErrosProgramacaoPizzaComponent;
  let fixture: ComponentFixture<CardErrosProgramacaoPizzaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CardErrosProgramacaoPizzaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardErrosProgramacaoPizzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
