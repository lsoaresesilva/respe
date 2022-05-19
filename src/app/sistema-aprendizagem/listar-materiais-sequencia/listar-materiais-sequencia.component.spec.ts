import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarMateriaisSequenciaComponent } from './listar-materiais-sequencia.component';

describe('ListarMateriaisSequenciaComponent', () => {
  let component: ListarMateriaisSequenciaComponent;
  let fixture: ComponentFixture<ListarMateriaisSequenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarMateriaisSequenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarMateriaisSequenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
