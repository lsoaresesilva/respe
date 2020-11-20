import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarAssuntoAdminComponent } from './visualizar-assunto-admin.component';

describe('VisualizarAssuntoAdminComponent', () => {
  let component: VisualizarAssuntoAdminComponent;
  let fixture: ComponentFixture<VisualizarAssuntoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarAssuntoAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarAssuntoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
