import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorPadraoComponent } from './editor-padrao.component';

describe('EditorPadraoComponent', () => {
  let component: EditorPadraoComponent;
  let fixture: ComponentFixture<EditorPadraoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorPadraoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorPadraoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
