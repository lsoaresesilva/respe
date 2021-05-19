import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreencherFrequenciaComponent } from './preencher-frequencia.component';

describe('PreencherFrequenciaComponent', () => {
  let component: PreencherFrequenciaComponent;
  let fixture: ComponentFixture<PreencherFrequenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreencherFrequenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreencherFrequenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
