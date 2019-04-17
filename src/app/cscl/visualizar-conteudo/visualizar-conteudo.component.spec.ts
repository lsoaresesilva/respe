import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarConteudoComponent } from './visualizar-conteudo.component';

describe('VisualizarConteudoComponent', () => {
  let component: VisualizarConteudoComponent;
  let fixture: ComponentFixture<VisualizarConteudoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarConteudoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarConteudoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
