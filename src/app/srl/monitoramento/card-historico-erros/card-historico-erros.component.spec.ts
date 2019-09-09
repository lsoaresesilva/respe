import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardHistoricoErrosComponent } from './card-historico-erros.component';

describe('CardHistoricoErrosComponent', () => {
  let component: CardHistoricoErrosComponent;
  let fixture: ComponentFixture<CardHistoricoErrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardHistoricoErrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardHistoricoErrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
