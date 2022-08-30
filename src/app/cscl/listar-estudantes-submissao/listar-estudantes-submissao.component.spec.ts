import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListarEstudantesSubmissaoComponent } from './listar-estudantes-submissao.component';

describe('ListarEstudantesSubmissaoComponent', () => {
  let component: ListarEstudantesSubmissaoComponent;
  let fixture: ComponentFixture<ListarEstudantesSubmissaoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarEstudantesSubmissaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarEstudantesSubmissaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
