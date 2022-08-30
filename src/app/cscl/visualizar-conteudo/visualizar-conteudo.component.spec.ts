import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VisualizarConteudoComponent } from './visualizar-conteudo.component';

describe('VisualizarConteudoComponent', () => {
  let component: VisualizarConteudoComponent;
  let fixture: ComponentFixture<VisualizarConteudoComponent>;

  beforeEach(waitForAsync(() => {
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
