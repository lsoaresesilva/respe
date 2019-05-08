import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTurmaComponent } from './listar-turma.component';

describe('ListarTurmaComponent', () => {
  let component: ListarTurmaComponent;
  let fixture: ComponentFixture<ListarTurmaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarTurmaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarTurmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
