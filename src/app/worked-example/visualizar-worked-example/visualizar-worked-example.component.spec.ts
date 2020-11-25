import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarWorkedExampleComponent } from './visualizar-worked-example.component';

describe('VisualizarWorkedExampleComponent', () => {
  let component: VisualizarWorkedExampleComponent;
  let fixture: ComponentFixture<VisualizarWorkedExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarWorkedExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarWorkedExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
