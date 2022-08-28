import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BoxComentarioComponent } from './box-comentario.component';

describe('BoxComentarioComponent', () => {
  let component: BoxComentarioComponent;
  let fixture: ComponentFixture<BoxComentarioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxComentarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
