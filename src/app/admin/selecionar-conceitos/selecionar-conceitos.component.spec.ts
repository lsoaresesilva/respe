import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionarConceitosComponent } from './selecionar-conceitos.component';

describe('SelecionarConceitosComponent', () => {
  let component: SelecionarConceitosComponent;
  let fixture: ComponentFixture<SelecionarConceitosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelecionarConceitosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecionarConceitosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
