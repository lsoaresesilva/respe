import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiscoEstudanteComponent } from './risco-estudante.component';

describe('RiscoEstudanteComponent', () => {
  let component: RiscoEstudanteComponent;
  let fixture: ComponentFixture<RiscoEstudanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiscoEstudanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiscoEstudanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
