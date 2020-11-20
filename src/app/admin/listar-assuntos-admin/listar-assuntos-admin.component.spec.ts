import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAssuntosAdminComponent } from './listar-assuntos-admin.component';

describe('VisualizarAssuntosAdminComponent', () => {
  let component: ListarAssuntosAdminComponent;
  let fixture: ComponentFixture<ListarAssuntosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarAssuntosAdminComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarAssuntosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
