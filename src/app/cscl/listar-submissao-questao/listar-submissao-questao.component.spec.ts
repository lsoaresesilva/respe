import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSubmissaoQuestaoComponent } from './listar-submissao-questao.component';

describe('ListarSubmissaoQuestaoComponent', () => {
  let component: ListarSubmissaoQuestaoComponent;
  let fixture: ComponentFixture<ListarSubmissaoQuestaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarSubmissaoQuestaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarSubmissaoQuestaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
