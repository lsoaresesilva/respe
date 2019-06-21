import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemTurmaComponent } from './listagem-turma.component';

describe('ListagemTurmaComponent', () => {
  let component: ListagemTurmaComponent;
  let fixture: ComponentFixture<ListagemTurmaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListagemTurmaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemTurmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
