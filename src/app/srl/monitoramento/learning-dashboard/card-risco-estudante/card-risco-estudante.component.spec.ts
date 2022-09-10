import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RiscoEstudanteComponent } from './card-risco-estudante.component';

describe('RiscoEstudanteComponent', () => {
  let component: RiscoEstudanteComponent;
  let fixture: ComponentFixture<RiscoEstudanteComponent>;

  beforeEach(waitForAsync(() => {
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
