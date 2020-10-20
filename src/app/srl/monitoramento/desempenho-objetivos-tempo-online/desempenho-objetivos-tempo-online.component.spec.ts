import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesempenhoObjetivosTempoOnlineComponent } from './desempenho-objetivos-tempo-online.component';

describe('DesempenhoObjetivosTempoOnlineComponent', () => {
  let component: DesempenhoObjetivosTempoOnlineComponent;
  let fixture: ComponentFixture<DesempenhoObjetivosTempoOnlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesempenhoObjetivosTempoOnlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesempenhoObjetivosTempoOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
