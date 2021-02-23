import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizacaoDiarioComponent } from './visualizacao-diario.component';

describe('VisualizacaoDiarioComponent', () => {
  let component: VisualizacaoDiarioComponent;
  let fixture: ComponentFixture<VisualizacaoDiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizacaoDiarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizacaoDiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
