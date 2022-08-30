import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NavegadorSubsecaoComponent } from './navegador-subsecao.component';

describe('NavegadorSubsecaoComponent', () => {
  let component: NavegadorSubsecaoComponent;
  let fixture: ComponentFixture<NavegadorSubsecaoComponent>;

  beforeEach(waitForAsync(() => {
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
