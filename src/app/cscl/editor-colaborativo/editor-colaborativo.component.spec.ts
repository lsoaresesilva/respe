import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorColaborativoComponent } from './editor-colaborativo.component';

describe('EditorColaborativoComponent', () => {
  let component: EditorColaborativoComponent;
  let fixture: ComponentFixture<EditorColaborativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorColaborativoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorColaborativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
