import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuLivroComponent } from './menu-livro.component';

describe('MenuLivroComponent', () => {
  let component: MenuLivroComponent;
  let fixture: ComponentFixture<MenuLivroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuLivroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuLivroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
