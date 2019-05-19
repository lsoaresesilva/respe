import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarQuestaoComponent } from './visualizar-questao.component';

describe('VisualizarQuestaoComponent', () => {
  let component: VisualizarQuestaoComponent;
  let fixture: ComponentFixture<VisualizarQuestaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarQuestaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarQuestaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
