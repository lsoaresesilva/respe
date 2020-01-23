import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApresentacaoEntradasTestcaseComponent } from './apresentacao-entradas-testcase.component';

describe('ApresentacaoEntradasTestcaseComponent', () => {
  let component: ApresentacaoEntradasTestcaseComponent;
  let fixture: ComponentFixture<ApresentacaoEntradasTestcaseComponent>;

  beforeEach(async(() => {
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
