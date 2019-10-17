import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuProfessorComponent } from './menu-professor.component';

describe('MenuProfessorComponent', () => {
  let component: MenuProfessorComponent;
  let fixture: ComponentFixture<MenuProfessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuProfessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
