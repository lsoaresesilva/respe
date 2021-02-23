import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemDiarioComponent } from './listagem-diario.component';

describe('ListagemDiarioComponent', () => {
  let component: ListagemDiarioComponent;
  let fixture: ComponentFixture<ListagemDiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemDiarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemDiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
