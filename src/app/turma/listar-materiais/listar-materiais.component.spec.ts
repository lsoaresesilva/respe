import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarMateriaisComponent } from './listar-materiais.component';

describe('ListarMateriaisComponent', () => {
  let component: ListarMateriaisComponent;
  let fixture: ComponentFixture<ListarMateriaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarMateriaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarMateriaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
