import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarProfessoresComponent } from './listar-professores.component';

describe('ListarProfessoresComponent', () => {
  let component: ListarProfessoresComponent;
  let fixture: ComponentFixture<ListarProfessoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarProfessoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarProfessoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
