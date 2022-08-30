import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListarProfessoresComponent } from './listar-professores.component';

describe('ListarProfessoresComponent', () => {
  let component: ListarProfessoresComponent;
  let fixture: ComponentFixture<ListarProfessoresComponent>;

  beforeEach(waitForAsync(() => {
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
