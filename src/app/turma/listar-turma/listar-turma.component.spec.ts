import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListarTurmaComponent } from './listar-turma.component';

describe('ListarTurmaComponent', () => {
  let component: ListarTurmaComponent;
  let fixture: ComponentFixture<ListarTurmaComponent>;

  beforeEach(waitForAsync(() => {
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
