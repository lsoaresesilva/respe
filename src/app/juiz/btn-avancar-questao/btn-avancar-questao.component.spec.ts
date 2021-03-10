import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnAvancarQuestaoComponent } from './btn-avancar-questao.component';

describe('BtnAvancarQuestaoComponent', () => {
  let component: BtnAvancarQuestaoComponent;
  let fixture: ComponentFixture<BtnAvancarQuestaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnAvancarQuestaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnAvancarQuestaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
