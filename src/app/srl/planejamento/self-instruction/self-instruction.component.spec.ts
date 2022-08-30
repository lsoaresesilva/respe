import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SelfInstructionComponent } from './self-instruction.component';

describe('SelfInstructionComponent', () => {
  let component: SelfInstructionComponent;
  let fixture: ComponentFixture<SelfInstructionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfInstructionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
