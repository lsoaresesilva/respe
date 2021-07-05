import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarMslqComponent } from './visualizar-mslq.component';

describe('VisualizarMslqComponent', () => {
  let component: VisualizarMslqComponent;
  let fixture: ComponentFixture<VisualizarMslqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarMslqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarMslqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
