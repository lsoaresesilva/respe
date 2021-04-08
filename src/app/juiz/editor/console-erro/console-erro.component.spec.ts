import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleErroComponent } from './console-erro.component';

describe('ConsoleErroComponent', () => {
  let component: ConsoleErroComponent;
  let fixture: ComponentFixture<ConsoleErroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleErroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleErroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
