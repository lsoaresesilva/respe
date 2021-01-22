import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisaoCodigoComponent } from './revisao-codigo.component';

describe('RevisaoCodigoComponent', () => {
  let component: RevisaoCodigoComponent;
  let fixture: ComponentFixture<RevisaoCodigoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisaoCodigoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisaoCodigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
