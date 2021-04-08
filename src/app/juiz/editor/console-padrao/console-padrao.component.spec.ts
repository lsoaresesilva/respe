import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolePadraoComponent } from './console-padrao.component';

describe('ConsolePadraoComponent', () => {
  let component: ConsolePadraoComponent;
  let fixture: ComponentFixture<ConsolePadraoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsolePadraoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolePadraoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
