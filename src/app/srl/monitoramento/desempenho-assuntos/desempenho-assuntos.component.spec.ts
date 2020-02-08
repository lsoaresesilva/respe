import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesempenhoAssuntosComponent } from './desempenho-assuntos.component';

describe('DesempenhoAssuntosComponent', () => {
  let component: DesempenhoAssuntosComponent;
  let fixture: ComponentFixture<DesempenhoAssuntosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesempenhoAssuntosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesempenhoAssuntosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
