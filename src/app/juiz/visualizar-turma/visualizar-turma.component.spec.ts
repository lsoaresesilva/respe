import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarTurmaComponent } from './visualizar-turma.component';

describe('VisualizarTurmaComponent', () => {
  let component: VisualizarTurmaComponent;
  let fixture: ComponentFixture<VisualizarTurmaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarTurmaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarTurmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
