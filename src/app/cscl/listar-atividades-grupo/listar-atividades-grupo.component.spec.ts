import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAtividadesGrupoComponent } from './listar-atividades-grupo.component';

describe('ListarAtividadesGrupoComponent', () => {
  let component: ListarAtividadesGrupoComponent;
  let fixture: ComponentFixture<ListarAtividadesGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarAtividadesGrupoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarAtividadesGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
