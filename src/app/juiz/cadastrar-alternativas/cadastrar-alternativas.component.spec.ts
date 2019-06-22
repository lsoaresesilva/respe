import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarAlternativasComponent } from './cadastrar-alternativas.component';

describe('CadastrarAlternativasComponent', () => {
  let component: CadastrarAlternativasComponent;
  let fixture: ComponentFixture<CadastrarAlternativasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarAlternativasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarAlternativasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
