import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPostagensComponent } from './listar-postagens.component';

describe('ListarPostagensComponent', () => {
  let component: ListarPostagensComponent;
  let fixture: ComponentFixture<ListarPostagensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarPostagensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPostagensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
