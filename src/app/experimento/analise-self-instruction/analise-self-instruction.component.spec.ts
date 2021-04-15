import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaliseSelfInstructionComponent } from './analise-self-instruction.component';

describe('AnaliseSelfInstructionComponent', () => {
  let component: AnaliseSelfInstructionComponent;
  let fixture: ComponentFixture<AnaliseSelfInstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnaliseSelfInstructionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnaliseSelfInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
