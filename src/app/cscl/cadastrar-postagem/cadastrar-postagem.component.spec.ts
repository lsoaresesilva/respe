import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarPostagemComponent } from './cadastrar-postagem.component';

describe('CadastrarPostagemComponent', () => {
  let component: CadastrarPostagemComponent;
  let fixture: ComponentFixture<CadastrarPostagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarPostagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarPostagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
