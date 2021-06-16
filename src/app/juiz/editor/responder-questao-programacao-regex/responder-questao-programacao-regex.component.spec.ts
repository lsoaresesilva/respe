import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponderQuestaoProgramacaoRegexComponent } from './responder-questao-programacao-regex.component';

describe('ResponderQuestaoProgramacaoRegexComponent', () => {
  let component: ResponderQuestaoProgramacaoRegexComponent;
  let fixture: ComponentFixture<ResponderQuestaoProgramacaoRegexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponderQuestaoProgramacaoRegexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponderQuestaoProgramacaoRegexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
