import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarQuestoesSequenciaComponent } from './listar-questoes-sequencia.component';

describe('ListarQuestoesSequenciaComponent', () => {
  let component: ListarQuestoesSequenciaComponent;
  let fixture: ComponentFixture<ListarQuestoesSequenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarQuestoesSequenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarQuestoesSequenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
