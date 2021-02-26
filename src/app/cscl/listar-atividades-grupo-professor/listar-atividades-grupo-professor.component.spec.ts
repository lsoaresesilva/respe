import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAtividadesGrupoProfessorComponent } from './listar-atividades-grupo-professor.component';

describe('ListarAtividadesGrupoProfessorComponent', () => {
  let component: ListarAtividadesGrupoProfessorComponent;
  let fixture: ComponentFixture<ListarAtividadesGrupoProfessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarAtividadesGrupoProfessorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarAtividadesGrupoProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
