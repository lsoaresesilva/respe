import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbAssuntoComponent } from './breadcrumb-assunto.component';

describe('BreadcrumbAssuntoComponent', () => {
  let component: BreadcrumbAssuntoComponent;
  let fixture: ComponentFixture<BreadcrumbAssuntoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreadcrumbAssuntoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbAssuntoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
