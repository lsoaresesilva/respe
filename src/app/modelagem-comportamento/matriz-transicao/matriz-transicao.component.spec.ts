import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrizTransicaoComponent } from './matriz-transicao.component';

describe('MatrizTransicaoComponent', () => {
  let component: MatrizTransicaoComponent;
  let fixture: ComponentFixture<MatrizTransicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatrizTransicaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrizTransicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
