import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfInstructionColetivoComponent } from './self-instruction-coletivo.component';

describe('SelfInstructionColetivoComponent', () => {
  let component: SelfInstructionColetivoComponent;
  let fixture: ComponentFixture<SelfInstructionColetivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfInstructionColetivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfInstructionColetivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
