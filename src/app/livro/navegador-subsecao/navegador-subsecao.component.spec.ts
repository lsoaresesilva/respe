import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavegadorSubsecaoComponent } from './navegador-subsecao.component';

describe('NavegadorSubsecaoComponent', () => {
  let component: NavegadorSubsecaoComponent;
  let fixture: ComponentFixture<NavegadorSubsecaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavegadorSubsecaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavegadorSubsecaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
