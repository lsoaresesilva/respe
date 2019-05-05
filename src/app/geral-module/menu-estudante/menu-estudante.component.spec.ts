import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuEstudanteComponent } from './menu-estudante.component';

describe('MenuEstudanteComponent', () => {
  let component: MenuEstudanteComponent;
  let fixture: ComponentFixture<MenuEstudanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuEstudanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuEstudanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
