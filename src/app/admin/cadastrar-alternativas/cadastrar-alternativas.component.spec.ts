import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CadastrarAlternativasComponent } from './cadastrar-alternativas.component';

describe('CadastrarAlternativasComponent', () => {
  let component: CadastrarAlternativasComponent;
  let fixture: ComponentFixture<CadastrarAlternativasComponent>;

  beforeEach(waitForAsync(() => {
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
