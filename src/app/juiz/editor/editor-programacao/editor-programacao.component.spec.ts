import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditorProgramacaoComponent } from './editor-programacao.component';

describe('EditorProgramacaoComponent', () => {
  let component: EditorProgramacaoComponent;
  let fixture: ComponentFixture<EditorProgramacaoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorProgramacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorProgramacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
