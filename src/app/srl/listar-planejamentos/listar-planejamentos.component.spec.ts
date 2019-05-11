import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPlanejamentosComponent } from './listar-planejamentos.component';

describe('ListarPlanejamentosComponent', () => {
  let component: ListarPlanejamentosComponent;
  let fixture: ComponentFixture<ListarPlanejamentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarPlanejamentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPlanejamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
