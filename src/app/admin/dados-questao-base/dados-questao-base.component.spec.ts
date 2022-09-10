import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosQuestaoBaseComponent } from './dados-questao-base.component';

describe('DadosQuestaoBaseComponent', () => {
  let component: DadosQuestaoBaseComponent;
  let fixture: ComponentFixture<DadosQuestaoBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DadosQuestaoBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosQuestaoBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
