import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarVideoComponent } from './visualizar-video.component';

describe('VisualizarVideoComponent', () => {
  let component: VisualizarVideoComponent;
  let fixture: ComponentFixture<VisualizarVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
