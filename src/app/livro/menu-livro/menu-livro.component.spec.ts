import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MenuLivroComponent } from './menu-livro.component';

describe('MenuLivroComponent', () => {
  let component: MenuLivroComponent;
  let fixture: ComponentFixture<MenuLivroComponent>;

  beforeEach(waitForAsync(() => {
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
