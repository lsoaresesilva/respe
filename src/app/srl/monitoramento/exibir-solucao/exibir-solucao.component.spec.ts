import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExibirSolucaoComponent } from './exibir-solucao.component';

describe('ExibirSolucaoComponent', () => {
  let component: ExibirSolucaoComponent;
  let fixture: ComponentFixture<ExibirSolucaoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExibirSolucaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExibirSolucaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
