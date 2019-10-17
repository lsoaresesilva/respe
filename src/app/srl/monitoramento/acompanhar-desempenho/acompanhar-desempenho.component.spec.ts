import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcompanharDesempenhoComponent } from './acompanhar-desempenho.component';

describe('AcompanharDesempenhoComponent', () => {
  let component: AcompanharDesempenhoComponent;
  let fixture: ComponentFixture<AcompanharDesempenhoComponent>;

  beforeEach(async(() => {
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
