import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ApresentacaoEntradasTestcaseComponent } from './apresentacao-entradas-testcase.component';

describe('ApresentacaoEntradasTestcaseComponent', () => {
  let component: ApresentacaoEntradasTestcaseComponent;
  let fixture: ComponentFixture<ApresentacaoEntradasTestcaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ApresentacaoEntradasTestcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApresentacaoEntradasTestcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
