import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EnviarMaterialComponent } from './enviar-material.component';

describe('EnviarMaterialComponent', () => {
  let component: EnviarMaterialComponent;
  let fixture: ComponentFixture<EnviarMaterialComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EnviarMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviarMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
