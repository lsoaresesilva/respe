import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarDiariosComponent } from './listar-diarios.component';

describe('ListarDiariosComponent', () => {
  let component: ListarDiariosComponent;
  let fixture: ComponentFixture<ListarDiariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarDiariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarDiariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
