import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscolherQuestaoComponent } from './escolher-questao.component';

describe('EscolherQuestaoComponent', () => {
  let component: EscolherQuestaoComponent;
  let fixture: ComponentFixture<EscolherQuestaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscolherQuestaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscolherQuestaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
