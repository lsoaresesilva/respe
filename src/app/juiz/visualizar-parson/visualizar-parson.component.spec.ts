import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarParsonComponent } from './visualizar-parson.component';

describe('VisualizarParsonComponent', () => {
  let component: VisualizarParsonComponent;
  let fixture: ComponentFixture<VisualizarParsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarParsonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarParsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
