import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AcompanharDesempenhoComponent } from './acompanhar-desempenho.component';

describe('AcompanharDesempenhoComponent', () => {
  let component: AcompanharDesempenhoComponent;
  let fixture: ComponentFixture<AcompanharDesempenhoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AcompanharDesempenhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcompanharDesempenhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
