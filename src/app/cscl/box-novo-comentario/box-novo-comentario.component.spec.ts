import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BoxNovoComentarioComponent } from './box-novo-comentario.component';

describe('BoxNovoComentarioComponent', () => {
  let component: BoxNovoComentarioComponent;
  let fixture: ComponentFixture<BoxNovoComentarioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxNovoComentarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxNovoComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
