import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalErrosComponent } from './total-erros.component';

describe('TotalErrosComponent', () => {
  let component: TotalErrosComponent;
  let fixture: ComponentFixture<TotalErrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalErrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalErrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
