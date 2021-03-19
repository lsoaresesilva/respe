import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExibirSolucaoAlunosComponent } from './exibir-solucao-alunos.component';

describe('ExibirSolucaoAlunosComponent', () => {
  let component: ExibirSolucaoAlunosComponent;
  let fixture: ComponentFixture<ExibirSolucaoAlunosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExibirSolucaoAlunosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExibirSolucaoAlunosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
