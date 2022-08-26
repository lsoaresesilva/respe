import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResponderQuestaoProgramacaoLiteComponent } from './responder-questao-programacao-lite.component';

describe('ResponderQuestaoProgramacaoLiteComponent', () => {
  let component: ResponderQuestaoProgramacaoLiteComponent;
  let fixture: ComponentFixture<ResponderQuestaoProgramacaoLiteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponderQuestaoProgramacaoLiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponderQuestaoProgramacaoLiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
