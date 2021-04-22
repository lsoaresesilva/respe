import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerEditorProgramacaoComponent } from './container-editor-programacao.component';

describe('ContainerEditorProgramacaoComponent', () => {
  let component: ContainerEditorProgramacaoComponent;
  let fixture: ComponentFixture<ContainerEditorProgramacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerEditorProgramacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerEditorProgramacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
