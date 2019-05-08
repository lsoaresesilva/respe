import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VizualizarExecucaoComponent } from './vizualizar-execucao.component';

describe('VizualizarExecucaoComponent', () => {
  let component: VizualizarExecucaoComponent;
  let fixture: ComponentFixture<VizualizarExecucaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VizualizarExecucaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VizualizarExecucaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
