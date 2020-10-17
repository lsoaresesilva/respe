import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorarAssuntoComponent } from './monitorar-assunto.component';

describe('MonitorarAssuntoComponent', () => {
  let component: MonitorarAssuntoComponent;
  let fixture: ComponentFixture<MonitorarAssuntoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitorarAssuntoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorarAssuntoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
