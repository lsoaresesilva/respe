import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListarMateriaisComponent } from './listar-materiais.component';

describe('ListarMateriaisComponent', () => {
  let component: ListarMateriaisComponent;
  let fixture: ComponentFixture<ListarMateriaisComponent>;

  beforeEach(waitForAsync(() => {
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
