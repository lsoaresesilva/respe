import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VisualizarQuestaoComponent } from './visualizar-questao.component';

describe('VisualizarQuestaoComponent', () => {
  let component: VisualizarQuestaoComponent;
  let fixture: ComponentFixture<VisualizarQuestaoComponent>;

  beforeEach(waitForAsync(() => {
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
