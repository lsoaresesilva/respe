import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiarioComponent } from './diario.component';

describe('DiarioComponent', () => {
  let component: DiarioComponent;
  let fixture: ComponentFixture<DiarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
