import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreTesteComponent } from './pre-teste.component';

describe('PreTesteComponent', () => {
  let component: PreTesteComponent;
  let fixture: ComponentFixture<PreTesteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreTesteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreTesteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
