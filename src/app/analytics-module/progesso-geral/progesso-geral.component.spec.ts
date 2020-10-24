import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgessoGeralComponent } from './progesso-geral.component';

describe('ProgessoGeralComponent', () => {
  let component: ProgessoGeralComponent;
  let fixture: ComponentFixture<ProgessoGeralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgessoGeralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgessoGeralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
