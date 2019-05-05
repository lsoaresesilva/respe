import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarAssuntoComponent } from './cadastrar-assunto.component';

describe('CadastrarAssuntoComponent', () => {
  let component: CadastrarAssuntoComponent;
  let fixture: ComponentFixture<CadastrarAssuntoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarAssuntoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarAssuntoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
