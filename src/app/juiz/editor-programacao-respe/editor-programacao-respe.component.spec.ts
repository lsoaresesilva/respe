import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorProgramacaoRespeComponent } from './editor-programacao-respe.component';

describe('EditorProgramacaoRespeComponent', () => {
  let component: EditorProgramacaoRespeComponent;
  let fixture: ComponentFixture<EditorProgramacaoRespeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorProgramacaoRespeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorProgramacaoRespeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
