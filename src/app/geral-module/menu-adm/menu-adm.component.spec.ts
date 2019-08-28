import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAdmComponent } from './menu-adm.component';

describe('MenuAdmComponent', () => {
  let component: MenuAdmComponent;
  let fixture: ComponentFixture<MenuAdmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuAdmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
