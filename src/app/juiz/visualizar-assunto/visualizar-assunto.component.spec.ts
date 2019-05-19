import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarAssuntoComponent } from './visualizar-assunto.component';

describe('VisualizarAssuntoComponent', () => {
  let component: VisualizarAssuntoComponent;
  let fixture: ComponentFixture<VisualizarAssuntoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarAssuntoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarAssuntoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
