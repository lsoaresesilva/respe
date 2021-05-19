import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarFrequenciaComponent } from './criar-frequencia.component';

describe('CriarFrequenciaComponent', () => {
  let component: CriarFrequenciaComponent;
  let fixture: ComponentFixture<CriarFrequenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarFrequenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarFrequenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
