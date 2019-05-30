import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPedidosAjudaComponent } from './listar-pedidos-ajuda.component';

describe('ListarPedidosAjudaComponent', () => {
  let component: ListarPedidosAjudaComponent;
  let fixture: ComponentFixture<ListarPedidosAjudaComponent>;

  beforeEach(async(() => {
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
