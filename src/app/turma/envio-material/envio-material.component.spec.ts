import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EnvioMaterialComponent } from './envio-material.component';

describe('EnvioMaterialComponent', () => {
  let component: EnvioMaterialComponent;
  let fixture: ComponentFixture<EnvioMaterialComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvioMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvioMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
