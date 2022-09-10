import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarConceitosComponent } from './cadastrar-conceitos.component';

describe('CadastrarConceitosComponent', () => {
  let component: CadastrarConceitosComponent;
  let fixture: ComponentFixture<CadastrarConceitosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarConceitosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarConceitosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
