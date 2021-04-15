import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorDocumentacaoProjetoComponent } from './editor-documentacao-projeto.component';

describe('EditorDocumentacaoProjetoComponent', () => {
  let component: EditorDocumentacaoProjetoComponent;
  let fixture: ComponentFixture<EditorDocumentacaoProjetoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorDocumentacaoProjetoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorDocumentacaoProjetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
