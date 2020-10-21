import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesempenhoObjetivosNotaComponent } from './desempenho-objetivos-nota.component';

describe('DesempenhoObjetivosNotaComponent', () => {
  let component: DesempenhoObjetivosNotaComponent;
  let fixture: ComponentFixture<DesempenhoObjetivosNotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesempenhoObjetivosNotaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesempenhoObjetivosNotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
