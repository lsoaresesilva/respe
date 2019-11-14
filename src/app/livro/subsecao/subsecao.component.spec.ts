import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsecaoComponent } from './subsecao.component';

describe('SubsecaoComponent', () => {
  let component: SubsecaoComponent;
  let fixture: ComponentFixture<SubsecaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubsecaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubsecaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
