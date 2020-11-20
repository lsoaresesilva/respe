import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressoProximoNivelComponent } from './progresso-proximo-nivel.component';

describe('ProgressoProximoNivelComponent', () => {
  let component: ProgressoProximoNivelComponent;
  let fixture: ComponentFixture<ProgressoProximoNivelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressoProximoNivelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressoProximoNivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
