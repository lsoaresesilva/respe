import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarMaterialComponent } from './enviar-material.component';

describe('EnviarMaterialComponent', () => {
  let component: EnviarMaterialComponent;
  let fixture: ComponentFixture<EnviarMaterialComponent>;

  beforeEach(async(() => {
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
