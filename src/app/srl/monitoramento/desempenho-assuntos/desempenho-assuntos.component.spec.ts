import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DesempenhoAssuntosComponent } from './desempenho-assuntos.component';

describe('DesempenhoAssuntosComponent', () => {
  let component: DesempenhoAssuntosComponent;
  let fixture: ComponentFixture<DesempenhoAssuntosComponent>;

  beforeEach(waitForAsync(() => {
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
