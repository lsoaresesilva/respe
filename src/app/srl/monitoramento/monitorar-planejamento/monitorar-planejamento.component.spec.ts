import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorarPlanejamentoComponent } from './monitorar-planejamento.component';

describe('MonitorarPlanejamentoComponent', () => {
  let component: MonitorarPlanejamentoComponent;
  let fixture: ComponentFixture<MonitorarPlanejamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorarPlanejamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorarPlanejamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
