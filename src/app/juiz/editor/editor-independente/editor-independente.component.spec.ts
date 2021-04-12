import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorIndependenteComponent } from './editor-independente.component';

describe('EditorIndependenteComponent', () => {
  let component: EditorIndependenteComponent;
  let fixture: ComponentFixture<EditorIndependenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorIndependenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorIndependenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
