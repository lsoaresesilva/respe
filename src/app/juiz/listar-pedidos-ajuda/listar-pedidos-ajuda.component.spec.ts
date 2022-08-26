import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListarPedidosAjudaComponent } from './listar-pedidos-ajuda.component';

describe('ListarPedidosAjudaComponent', () => {
  let component: ListarPedidosAjudaComponent;
  let fixture: ComponentFixture<ListarPedidosAjudaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarPedidosAjudaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPedidosAjudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
