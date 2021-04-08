import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorTrintadoisbitsComponent } from './editor-trintadoisbits.component';

describe('EditorTrintadoisbitsComponent', () => {
  let component: EditorTrintadoisbitsComponent;
  let fixture: ComponentFixture<EditorTrintadoisbitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorTrintadoisbitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorTrintadoisbitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
