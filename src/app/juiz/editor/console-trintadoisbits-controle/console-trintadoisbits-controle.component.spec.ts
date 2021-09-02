import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleTrintadoisbitsControleComponent } from './console-trintadoisbits-controle.component';

describe('ConsoleTrintadoisbitsControleComponent', () => {
  let component: ConsoleTrintadoisbitsControleComponent;
  let fixture: ComponentFixture<ConsoleTrintadoisbitsControleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleTrintadoisbitsControleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleTrintadoisbitsControleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
