import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DadosQuestaoComponent } from './dados-questao.component';

describe('DadosQuestaoComponent', () => {
  let component: DadosQuestaoComponent;
  let fixture: ComponentFixture<DadosQuestaoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DadosQuestaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosQuestaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
