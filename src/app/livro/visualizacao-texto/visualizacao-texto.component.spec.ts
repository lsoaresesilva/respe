import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VisualizacaoTextoComponent } from './visualizacao-texto.component';

describe('VisualizacaoTextoComponent', () => {
  let component: VisualizacaoTextoComponent;
  let fixture: ComponentFixture<VisualizacaoTextoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizacaoTextoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizacaoTextoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
