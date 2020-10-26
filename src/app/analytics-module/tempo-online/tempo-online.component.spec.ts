import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempoOnlineComponent } from './tempo-online.component';

describe('TempoOnlineComponent', () => {
  let component: TempoOnlineComponent;
  let fixture: ComponentFixture<TempoOnlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TempoOnlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TempoOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
