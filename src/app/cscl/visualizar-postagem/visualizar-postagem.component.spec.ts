import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarPostagemComponent } from './visualizar-postagem.component';

describe('VisualizarPostagemComponent', () => {
  let component: VisualizarPostagemComponent;
  let fixture: ComponentFixture<VisualizarPostagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarPostagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarPostagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
