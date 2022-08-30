import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListarAssuntosComponent } from './listar-assuntos.component';

describe('ListarAssuntosComponent', () => {
  let component: ListarAssuntosComponent;
  let fixture: ComponentFixture<ListarAssuntosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarAssuntosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarAssuntosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
