import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarSubmissaoRecenteComponent } from './visualizar-submissao-recente.component';

describe('VisualizarSubmissaoRecenteComponent', () => {
  let component: VisualizarSubmissaoRecenteComponent;
  let fixture: ComponentFixture<VisualizarSubmissaoRecenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarSubmissaoRecenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarSubmissaoRecenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
