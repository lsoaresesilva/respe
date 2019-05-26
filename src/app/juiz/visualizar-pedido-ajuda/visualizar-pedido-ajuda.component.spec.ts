import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarPedidoAjudaComponent } from './visualizar-pedido-ajuda.component';

describe('VisualizarPedidoAjudaComponent', () => {
  let component: VisualizarPedidoAjudaComponent;
  let fixture: ComponentFixture<VisualizarPedidoAjudaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarPedidoAjudaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarPedidoAjudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
