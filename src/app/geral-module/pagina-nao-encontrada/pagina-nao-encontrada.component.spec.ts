import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';

describe('PaginaNaoEncontradaComponent', () => {
  let component: PaginaNaoEncontradaComponent;
  let fixture: ComponentFixture<PaginaNaoEncontradaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaNaoEncontradaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaNaoEncontradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
