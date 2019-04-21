import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarQuestoesComponent } from './listar-questoes.component';

describe('ListarQuestoesComponent', () => {
  let component: ListarQuestoesComponent;
  let fixture: ComponentFixture<ListarQuestoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarQuestoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarQuestoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
