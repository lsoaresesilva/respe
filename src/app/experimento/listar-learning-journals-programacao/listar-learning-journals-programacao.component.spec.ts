import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarLearningJournalsProgramacaoComponent } from './listar-learning-journals-programacao.component';

describe('ListarLearningJournalsProgramacaoComponent', () => {
  let component: ListarLearningJournalsProgramacaoComponent;
  let fixture: ComponentFixture<ListarLearningJournalsProgramacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarLearningJournalsProgramacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarLearningJournalsProgramacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
