import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarTesteCaseComponent } from './cadastrar-teste-case.component';

describe('CadastrarTesteCaseComponent', () => {
  let component: CadastrarTesteCaseComponent;
  let fixture: ComponentFixture<CadastrarTesteCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarTesteCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarTesteCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
