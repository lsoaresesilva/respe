import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarTextoComponent } from './visualizar-texto.component';

describe('VisualizarTextoComponent', () => {
  let component: VisualizarTextoComponent;
  let fixture: ComponentFixture<VisualizarTextoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarTextoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarTextoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
